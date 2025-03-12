import { TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { IEquipmentSubGroup, IOrderSetupFG, IPieceOfEquipmentSubGroup, IShipmentBillFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { ShipmentBillFacade } from '@otc/features/manage/shipment-bill/store/facades/shipment-bill.facade';
import { EOrderOption } from '@otc/shared/enums/order-setup.enums';
import { IShipmentBillState } from '@otc/shared/models/state.interface';
import { OtcAsyncValidators } from '@otc/shared/validators/common-async.validators';

describe('OtcAsyncValidators', () => {
  let service: OtcAsyncValidators;
  let mockShipmentBillFacade: {
    getShipmentBillState: jest.Mock;
    shipmentBill: Observable<IShipmentBillState>;
    validateEquipment: jest.Mock;
  };

  beforeEach(() => {
    mockShipmentBillFacade = {
      shipmentBill: of({
        validEquipments: {},
        stccs: []
      } as unknown as IShipmentBillState),
      getShipmentBillState: jest.fn().mockReturnValue({ validEquipments: {} }),
      validateEquipment: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        OtcAsyncValidators,
        { provide: ShipmentBillFacade, useValue: mockShipmentBillFacade }]
    });
    service = TestBed.inject(OtcAsyncValidators);
  });

  describe('validEquipment', () => {
    let control: FormGroup<IEquipmentSubGroup>;
    let poeForm: FormGroup<IPieceOfEquipmentSubGroup>;
    let orderSetupForm: FormGroup<IOrderSetupFG>;
    let parentForm: FormGroup<IShipmentBillFG>;

    beforeEach(() => {
      control = new FormGroup(
        {
          initial: new FormControl('NS', { nonNullable: true }),
          number: new FormControl('123455', { nonNullable: true })
        } as IEquipmentSubGroup,
        { asyncValidators: [service.validEquipment()] }
      ) as unknown as FormGroup<IEquipmentSubGroup>;

      poeForm = new FormGroup({
        equipmentId: control
      } as IPieceOfEquipmentSubGroup) as unknown as FormGroup<IPieceOfEquipmentSubGroup>;

      orderSetupForm = new FormGroup({
        overwriteAllPOEs: new FormControl(false, { nonNullable: true }),
        orderOption: new FormControl(EOrderOption.RESHIP),
        piecesOfEquipment: new FormArray<FormGroup<IPieceOfEquipmentSubGroup>>([poeForm])
      } as IOrderSetupFG) as unknown as FormGroup<IOrderSetupFG>;

      parentForm = new FormGroup({
        orderSetup: orderSetupForm
      } as IShipmentBillFG) as unknown as FormGroup<IShipmentBillFG>;
    });

    it('should create', () => {
      expect(parentForm).toBeTruthy();
    });

    // it('should return null if overwriteAll is true', done => {
    //   orderSetupForm.controls.overwriteAllPOEs.setValue(true);
    //   control.markAsTouched();
    //
    //   control.controls.initial.setValue('NS');
    //   control.controls.number.setValue('12345');
    //
    //   poeForm.statusChanges.pipe(take(1)).subscribe(status => {
    //     expect(status).toBe('VALID');
    //     expect(poeForm.errors).toBeNull();
    //     done();
    //   });
    // });
  });
});
