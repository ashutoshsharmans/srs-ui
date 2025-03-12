import { MediaMatcher } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { debounceTime, merge, Observable, Subject, Subscription, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { OtcShipmentBillFormConstants } from '@otc/configs/shipment-bill-form.constants';
import { OtcShipmentBillConstants } from '@otc/configs/shipment-bill.constants';
import { BillNavbarComponent } from '@otc/features/manage/shipment-bill/bill-navbar/bill-navbar.component';
import { SaveBillDialog } from '@otc/features/manage/shipment-bill/dialogs/save-bill/save-bill.dialog';
import {
  IAdditionalSectionInfo,
  IBillSection,
  IBillSectionStatus,
  ICommodityFG,
  ICustomsCargoManifestFG,
  IEmptyReverseFG,
  IGeneralSetupFG,
  ILocationFG,
  IOrderSetup,
  IOrderSetupFG,
  IOtmaLoadUpFG,
  IPieceOfEquipmentSubGroup,
  IProtectiveServiceFG,
  IRatingFG,
  IRouteFG,
  IShipmentBill,
  IShipmentBillFG,
  IShipmentPartiesFG,
  IShipmentReferenceFG,
  IUpdateSectionVisibility,
  IVinFG
} from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { ShipmentBillFacade } from '@otc/features/manage/shipment-bill/store/facades/shipment-bill.facade';
import { CommodityComponent } from '@otc/features/manage/shipment-bill/subsections/commodity/commodity.component';
import { CommodityLadingComponent } from '@otc/features/manage/shipment-bill/subsections/commodity-lading/commodity-lading.component';
import { CustomsCargoManifestComponent } from '@otc/features/manage/shipment-bill/subsections/customs-cargo-manifest/customs-cargo-manifest.component';
import { EmptyReverseComponent } from '@otc/features/manage/shipment-bill/subsections/empty-reverse/empty-reverse.component';
import { GeneralSetupComponent } from '@otc/features/manage/shipment-bill/subsections/general-setup/general-setup.component';
import { HazardousComponent } from '@otc/features/manage/shipment-bill/subsections/hazardous/hazardous.component';
import { OrderSetupComponent } from '@otc/features/manage/shipment-bill/subsections/order-setup/order-setup.component';
import { OtmaLoadUpComponent } from '@otc/features/manage/shipment-bill/subsections/otma-load-up/otma-load-up.component';
import { ProtectiveServiceComponent } from '@otc/features/manage/shipment-bill/subsections/protective-service/protective-service.component';
import { RatingComponent } from '@otc/features/manage/shipment-bill/subsections/rating/rating.component';
import { RouteComponent } from '@otc/features/manage/shipment-bill/subsections/route/route.component';
import { ShipmentPartiesComponent } from '@otc/features/manage/shipment-bill/subsections/shipment-parties/shipment-parties.component';
import { ShipmentReferencesComponent } from '@otc/features/manage/shipment-bill/subsections/shipment-references/shipment-references.component';
import { VinComponent } from '@otc/features/manage/shipment-bill/subsections/vin/vin.component';
import { MaskComponent } from '@otc/shared/components/mask/mask.component';
import { EBillSection, EBillType } from '@otc/shared/enums/bill.enums';
import { ELoadAction } from '@otc/shared/enums/load-action.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { ILoadAction } from '@otc/shared/models/load.interface';
import { IShipmentBillState, IUserState } from '@otc/shared/models/state.interface';
import { IUser } from '@otc/shared/models/user.interface';
import { OtcAsyncValidators } from '@otc/shared/validators/common-async.validators';

@Component({
  selector: 'otc-shipment-bill',
  standalone: true,
  imports: [
    BillNavbarComponent,
    MatCard,
    MatCardContent,
    MatAccordion,
    OrderSetupComponent,
    MatButton,
    AsyncPipe,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon,
    MatCardHeader,
    FormsModule,
    ReactiveFormsModule,
    MaskComponent,
    CommodityComponent,
    ShipmentPartiesComponent,
    RouteComponent,
    EmptyReverseComponent,
    VinComponent,
    ShipmentReferencesComponent,
    RatingComponent,
    CustomsCargoManifestComponent,
    ProtectiveServiceComponent,
    GeneralSetupComponent,
    CommodityLadingComponent,
    HazardousComponent,
    OtmaLoadUpComponent
  ],
  templateUrl: './shipment-bill.component.html',
  styleUrl: './shipment-bill.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipmentBillComponent implements OnInit, OnDestroy {
  readonly dialog: MatDialog = inject(MatDialog);
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  shipmentBillFacade: ShipmentBillFacade = inject(ShipmentBillFacade);
  validators: OtcAsyncValidators = inject(OtcAsyncValidators);
  media: MediaMatcher = inject(MediaMatcher);

  store$:
    | Observable<{
        bill: IShipmentBillState;
        billType?: string | Array<string>;
        user: IUserState;
        webOwner?: string | Array<string>;
      }>
    | undefined;
  billSections: Array<IBillSection> = [];
  mobileQuery!: MediaQueryList;
  user?: IUser;
  viewOnly = false;
  panelExpanded = true;
  billType: EBillType = EBillType.BOL;
  expandAll: Subject<boolean> = new Subject();
  update: Subject<void> = new Subject();
  clear: Subject<void> = new Subject();
  data?: IShipmentBill;
  state?: IShipmentBill;
  form!: FormGroup<IShipmentBillFG>;
  sectionStatus: IBillSectionStatus = OtcShipmentBillConstants.sectionStatus;
  statusSubscription!: Subscription;

  ngOnInit(): void {
    this.setupResponsiveBehavior();
    this.store$ = this.shipmentBillFacade.shipmentBillWithUserInfo.pipe(
      debounceTime(1),
      tap((value: { bill: IShipmentBillState; billType?: string | Array<string>; user: IUserState; webOwner?: string | Array<string> }) => {
        const billType: EBillType = OtcShipmentBillConstants.getShipmentType(value.billType);
        if (value.user.permission !== this.user?.permission || (billType && this.billType !== billType)) {
          this.user = value.user;
          this.billType = billType;
          this.viewOnly = this.billType === EBillType.SUBMITTED_SHIPMENT_REQUESTS;
          this.setup();
        }
        if (this.billType === EBillType.BOL_WITH_PATTERN && this.data !== value.bill.pattern) {
          this.data = value.bill.pattern;
          this.updateAndSetFormData(value.bill.pattern);
        }
        if (this.billType === EBillType.BOL_WITH_DRAFT && this.data !== value.bill.draft) {
          this.data = value.bill.draft;
          this.updateAndSetFormData(value.bill.draft);
        }
      })
    );
  }

  setupResponsiveBehavior(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 850px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  setup(): void {
    this.setupForm();
    this.setupSection();
    this.setupSectionStatus();
    this.setupSectionStatusObservables();
    this.fetchFormData();
  }

  setupForm(): void {
    switch (this.billType) {
      case EBillType.MISC:
      case EBillType.MISC_WITH_DRAFT:
      case EBillType.MISC_WITH_PATTERN:
        this.form = OtcShipmentBillFormConstants.getMiscellaneousBillForm(this.viewOnly, this.validators, this.user?.permission);
        break;
      case EBillType.WAYBILL_WITH_PATTERN:
      case EBillType.WAYBILL_WITH_DRAFT:
      case EBillType.WAYBILL:
        this.form = OtcShipmentBillFormConstants.getWaybillForm(this.viewOnly, this.validators, this.user?.permission);
        break;
      default:
        this.form = OtcShipmentBillFormConstants.getBOLForm(this.viewOnly, this.validators, this.user?.permission);
    }
  }

  setupSection(): void {
    const sectionsExpand = true;
    this.expandAll.next(sectionsExpand);
    this.billSections = OtcShipmentBillConstants.setupBillSections(this.form, sectionsExpand);
  }

  setupSectionStatus(): void {
    const controls: IShipmentBillFG = this.form.controls;
    this.sectionStatus.generalSetup = OtcShipmentBillConstants.getStatus(controls?.generalSetup);
    this.sectionStatus.orderSetup = OtcShipmentBillConstants.getStatus(controls?.orderSetup);
    this.sectionStatus.commodityLading = OtcShipmentBillConstants.getStatus(controls?.commodityLading);
    this.sectionStatus.shipmentParties = OtcShipmentBillConstants.getStatus(controls?.shipmentParties);
    this.sectionStatus.route = OtcShipmentBillConstants.getStatus(controls?.route);
    this.sectionStatus.emptyReverse = OtcShipmentBillConstants.getStatus(controls?.emptyReverse);
    this.sectionStatus.commodity = OtcShipmentBillConstants.getStatus(controls?.commodity);
    this.sectionStatus.vin = OtcShipmentBillConstants.getStatus(controls?.vin);
    this.sectionStatus.shipmentReferences = OtcShipmentBillConstants.getStatus(controls?.shipmentReferences);
    this.sectionStatus.rating = OtcShipmentBillConstants.getStatus(controls?.rating);
    this.sectionStatus.customs = OtcShipmentBillConstants.getStatus(controls?.customs);
    this.sectionStatus.protectiveService = OtcShipmentBillConstants.getStatus(controls?.protectiveService);
    this.sectionStatus.location = OtcShipmentBillConstants.getStatus(controls?.protectiveService);
  }

  setupSectionStatusObservables(): void {
    const observables: Array<Observable<{ form: FormGroup; section: EBillSection }>> = [];
    const controls: IShipmentBillFG = this.form.controls;

    const generalSetup: FormGroup<IGeneralSetupFG> | undefined = controls.generalSetup;
    const orderSetup: FormGroup<IOrderSetupFG> | undefined = controls.orderSetup;
    const shipmentParties: FormGroup<IShipmentPartiesFG> | undefined = controls.shipmentParties;
    const route: FormGroup<IRouteFG> | undefined = controls.route;
    const emptyReverse: FormGroup<IEmptyReverseFG> | undefined = controls.emptyReverse;
    const commodity: FormGroup<ICommodityFG> | undefined = controls.commodity;
    const vin: FormGroup<IVinFG> | undefined = controls.vin;
    const shipmentReferences: FormGroup<IShipmentReferenceFG> | undefined = controls.shipmentReferences;
    const rating: FormGroup<IRatingFG> | undefined = controls.rating;
    const customs: FormGroup<ICustomsCargoManifestFG> | undefined = controls.customs;
    const protectiveService: FormGroup<IProtectiveServiceFG> | undefined = controls.protectiveService;
    const location: FormGroup<ILocationFG> | undefined = controls.location;
    const otma: FormGroup<IOtmaLoadUpFG> | undefined = controls.otmaLoadUp;

    if (generalSetup) observables.push(generalSetup.statusChanges.pipe(map(() => ({ section: EBillSection.GENERAL, form: generalSetup }))));
    if (orderSetup) observables.push(orderSetup.statusChanges.pipe(map(() => ({ section: EBillSection.ORDER_SETUP, form: orderSetup }))));
    if (shipmentParties) observables.push(shipmentParties.statusChanges.pipe(map(() => ({ section: EBillSection.SHIPMENT_PARTIES, form: shipmentParties }))));
    if (route) observables.push(route.statusChanges.pipe(map(() => ({ section: EBillSection.ROUTE, form: route }))));
    if (emptyReverse) observables.push(emptyReverse.statusChanges.pipe(map(() => ({ section: EBillSection.EMPTY_REVERSE, form: emptyReverse }))));
    if (commodity) observables.push(commodity.statusChanges.pipe(map(() => ({ section: EBillSection.COMMODITY, form: commodity }))));
    if (vin) observables.push(vin.statusChanges.pipe(map(() => ({ section: EBillSection.VIN, form: vin }))));
    if (shipmentReferences) observables.push(shipmentReferences.statusChanges.pipe(map(() => ({ section: EBillSection.SHIPMENT_REFERENCES, form: shipmentReferences }))));
    if (rating) observables.push(rating.statusChanges.pipe(map(() => ({ section: EBillSection.RATING, form: rating }))));
    if (customs) observables.push(customs.statusChanges.pipe(map(() => ({ section: EBillSection.CUSTOMS, form: customs }))));
    if (protectiveService) observables.push(protectiveService.statusChanges.pipe(map(() => ({ section: EBillSection.PROTECTIVE_SERVICE, form: protectiveService }))));
    if (location) observables.push(location.statusChanges.pipe(map(() => ({ section: EBillSection.LOCATION, form: location }))));
    if (otma) observables.push(otma.statusChanges.pipe(map(() => ({ section: EBillSection.OTMA_LOAD_UP, form: otma }))));

    this.statusSubscription = merge(...observables).subscribe((data: { form: FormGroup; section: EBillSection }) => this.updateSectionStatus(data.section, data.form));
  }

  updateSectionStatus(source: EBillSection, form: FormGroup): void {
    const section: IBillSection | undefined = this.billSections.find(sec => sec.key === source);
    const status: EStatus = OtcShipmentBillConstants.getStatus(form);
    if (section) section.status = OtcShipmentBillConstants.getStatus(form);
    this.billSections = [...this.billSections];
    this.sectionStatus[source] = status;
  }

  mobileQueryListener(): void {}

  fetchFormData(): void {
    this.shipmentBillFacade.loadShipmentRequestData({});
    switch (this.billType) {
      case EBillType.BOL_WITH_PATTERN:
        this.shipmentBillFacade.loadPattern();
        break;
      case EBillType.BOL_WITH_DRAFT:
        this.shipmentBillFacade.loadDraftBill();
        break;
    }
  }

  updateAndSetFormData(data?: IShipmentBill): void {
    if (data) {
      if (data.orderSetup) {
        const orderSetup: IOrderSetup = data.orderSetup;
        if (orderSetup.piecesOfEquipment && orderSetup.piecesOfEquipment.length > 0) {
          const pOEs: FormArray<FormGroup<IPieceOfEquipmentSubGroup>> | undefined = this.form.controls.orderSetup?.controls.piecesOfEquipment;
          const numberOfPOEs = pOEs?.length || 0;
          if (data.orderSetup.piecesOfEquipment && numberOfPOEs !== data.orderSetup.piecesOfEquipment.length) {
            const difference = data.orderSetup.piecesOfEquipment.length - numberOfPOEs;
            for (let i = 0; i < Math.abs(difference); i++) {
              pOEs?.push(OtcShipmentBillFormConstants.getNewEquipmentForm(this.viewOnly, this.validators));
            }
          }
        }
      }
      this.form.patchValue(data);
      this.update.next();
      this.changeDetectorRef.detectChanges();
    }
  }

  togglePanels(): void {
    const someExpanded = !!this.billSections.find((sec: IBillSection) => sec.expanded);
    this.panelExpanded = !someExpanded;
    this.expandAll.next(!someExpanded);
  }

  updateExpandState($event: IBillSection): void {
    const found: IBillSection | undefined = this.billSections.find((sec: IBillSection): boolean => sec.key === $event.key);
    if (found) {
      found.expanded = $event.expanded;
    }
    this.panelExpanded = !!this.billSections.find((sec: IBillSection) => sec.expanded);
  }

  loadAction($event: ILoadAction): void {
    switch ($event.action) {
      case ELoadAction.LOAD_STCC:
        this.shipmentBillFacade.loadStccs($event.param.stcc);
        break;
    }
  }

  updateSectionsVisibility($event: Array<IUpdateSectionVisibility>): void {
    this.updateFormAndSections($event);
    this.updateValidators();
    this.sortSectionOrder();
    this.setupSectionStatus();
    this.setupSectionStatusObservables();
  }

  updateValidators(): void {
    this.form.controls.commodity?.controls.stcc.controls.stcc.updateValueAndValidity();
  }

  updateFormAndSections(sections: Array<IUpdateSectionVisibility>): void {
    sections.forEach((section: IUpdateSectionVisibility) => (section.add ? this.addFormAndSection(section) : this.removeFormAndSection(section.section)));
  }

  addFormAndSection(detail: IUpdateSectionVisibility): void {
    const section: EBillSection = detail.section;
    switch (section) {
      case EBillSection.PROTECTIVE_SERVICE:
        if (!this.form.controls[section]) {
          this.form.addControl(section, OtcShipmentBillFormConstants.getProtectiveServiceForm(this.viewOnly));
          this.addSection(section, this.form.controls.protectiveService);
        }
        break;
      case EBillSection.EMPTY_REVERSE:
        if (!this.form.controls[section]) {
          this.form.addControl(section, OtcShipmentBillFormConstants.getEmptyReverseForm(this.viewOnly));
          this.addSection(section, this.form.controls.emptyReverse);
        }
        break;
      case EBillSection.CUSTOMS:
        if (!this.form.controls[section]) {
          this.form.addControl(section, OtcShipmentBillFormConstants.getCustomCargoManifestForm(this.viewOnly));
          this.addSection(section, this.form.controls.emptyReverse);
        }
        break;
      case EBillSection.VIN:
        if (!this.form.controls[section]) {
          this.form.addControl(section, OtcShipmentBillFormConstants.getVinForm(this.viewOnly));
          this.addSection(section, this.form.controls.vin);
        }
        break;
      case EBillSection.OTMA_LOAD_UP:
        if (!this.form.controls[section]) {
          this.form.addControl(section, OtcShipmentBillFormConstants.getOtmaLoadUpForm(this.viewOnly));
          this.addSection(section, this.form.controls.otmaLoadUp);
        }
        break;
      case EBillSection.HAZARDOUS:
        if (this.form.controls[section]) this.removeFormAndSection(section);
        if (detail.additionalInfo?.radioActiveWaste) {
          this.form.addControl(section, OtcShipmentBillFormConstants.getRadioActiveWasteHazardousForm(this.viewOnly));
        } else {
          this.form.addControl(section, OtcShipmentBillFormConstants.getDefaultHazardousForm(this.viewOnly));
        }
        this.addSection(section, this.form.controls.hazardous, detail.additionalInfo);
        break;
    }
  }

  addSection(section: EBillSection, form?: FormGroup, additionalInfo?: IAdditionalSectionInfo): void {
    if (form) {
      this.billSections.splice(this.getAddToIndex(EBillSection.COMMODITY), 0, OtcShipmentBillConstants.billSectionValue(section, form, true, additionalInfo));
    }
  }

  removeFormAndSection(section: EBillSection): void {
    this.removeForm(section);
    this.removeSection(section);
  }

  removeForm(section: EBillSection): void {
    switch (section) {
      case EBillSection.PROTECTIVE_SERVICE:
        if (this.form.controls.protectiveService) this.form.removeControl('protectiveService');
        break;
      case EBillSection.EMPTY_REVERSE:
        if (this.form.controls.emptyReverse) this.form.removeControl('emptyReverse');
        break;
      case EBillSection.CUSTOMS:
        if (this.form.controls.customs) this.form.removeControl('customs');
        break;
      case EBillSection.VIN:
        if (this.form.controls.vin) this.form.removeControl('vin');
        break;
      case EBillSection.OTMA_LOAD_UP:
        if (this.form.controls.otmaLoadUp) this.form.removeControl('otmaLoadUp');
        break;
      case EBillSection.HAZARDOUS:
        if (this.form.controls.hazardous) this.form.removeControl('hazardous');
    }
  }

  removeSection(section: EBillSection): void {
    const index = this.billSections.findIndex((sec: IBillSection) => sec.key === section);
    if (index > -1) this.billSections.splice(index, 1);
  }

  getAddToIndex(addAfter: EBillSection): number {
    return this.billSections.findIndex((sec: IBillSection) => sec.key === addAfter) + 1;
  }

  sortSectionOrder(): void {
    this.billSections.sort((a: IBillSection, b: IBillSection) => {
      const indexA = OtcShipmentBillConstants.sectionOrder.indexOf(a.key);
      const indexB = OtcShipmentBillConstants.sectionOrder.indexOf(b.key);
      if (indexA < indexB) return -1;
      if (indexA > indexB) return 1;
      return 0;
    });
  }

  delete(): void {
    this.shipmentBillFacade.deleteBill({});
  }

  submit(): void {
    this.shipmentBillFacade.submitRequest(this.form.getRawValue());
  }

  save(): void {
    this.dialog.open(SaveBillDialog, {});
  }

  ngOnDestroy(): void {
    this.shipmentBillFacade.resetDraft();
    this.shipmentBillFacade.resetPattern();
    this.statusSubscription.unsubscribe();
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
