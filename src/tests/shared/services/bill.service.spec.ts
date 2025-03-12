import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OtcUrlConstants } from '@otc/configs/url.constants';
import { IShipmentBill } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { IShipmentOrder, IShipmentSearch } from '@otc/features/shipment-orders/models/shipment-order.interface';
import { ISpecialEndorsement } from '@otc/shared/models/special-endorsement.interface';
import { ISTCCDetail } from '@otc/shared/models/state.interface';
import { IStccQualifier } from '@otc/shared/models/stcc.interface';
import { BillService } from '@otc/shared/services/bill.service';

describe('Bill Service', () => {
  let service: BillService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        BillService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BillService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get Submitted Requests to MF', () => {
    const mockShipmentOrders: Array<IShipmentOrder> = [];
    service.getSubmittedRequestsToMF().subscribe(shipmentOrders => {
      expect(shipmentOrders).toEqual(mockShipmentOrders);
    });
    const req: TestRequest = httpTestingController.expectOne(OtcUrlConstants.submittedRequestsUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockShipmentOrders);
  });

  it('should get Updated Waybills to MF', () => {
    const mockUpdatedWaybills: Array<IShipmentOrder> = [];
    service.getUpdatedWaybillsMF().subscribe(updatedWaybills => {
      expect(updatedWaybills).toEqual(mockUpdatedWaybills);
    });
    const req: TestRequest = httpTestingController.expectOne(OtcUrlConstants.updatedWaybillsUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUpdatedWaybills);
  });

  it('should submit shipment request', () => {
    const mockUpdatedWaybills = {};
    const wo = '12345';
    service.submitShipmentRequest({}, wo).subscribe(updatedWaybills => {
      expect(updatedWaybills).toEqual(mockUpdatedWaybills);
    });
    const req: TestRequest = httpTestingController.expectOne(`${OtcUrlConstants.submitUrl}?wo=${wo}`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockUpdatedWaybills);
  });

  it('should get qualifiers', () => {
    const mockQualifiers: Array<IStccQualifier> = [];
    service.getQualifiers().subscribe(qualifiers => {
      expect(qualifiers).toEqual(mockQualifiers);
    });
    const req: TestRequest = httpTestingController.expectOne(OtcUrlConstants.qualifiersUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockQualifiers);
  });

  it('should get patterns', () => {
    const mockPatterns: Array<IShipmentOrder> = [];
    service.getPatterns().subscribe(patterns => {
      expect(patterns).toEqual(mockPatterns);
    });
    const req: TestRequest = httpTestingController.expectOne(OtcUrlConstants.submittedRequestsUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPatterns);
  });

  it('should get Filtered Shipment Requests', () => {
    const input: IShipmentSearch = { waybillSerial: '12345' } as IShipmentSearch;
    const mockFilteredShipmentOrders: Array<IShipmentOrder> = [];
    service.getFilteredShipmentOrders(input).subscribe(filteredShipmentOrders => {
      expect(filteredShipmentOrders).toEqual(mockFilteredShipmentOrders);
    });
    const req: TestRequest = httpTestingController.expectOne(`${OtcUrlConstants.submittedRequestsUrl}?id=${input.waybillSerial}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockFilteredShipmentOrders);
  });

  it('should get Filtered Shipment Requests for no input', () => {
    const mockShipmentOrders: Array<IShipmentOrder> = [];
    service.getFilteredShipmentOrders().subscribe(shipmentOrders => {
      expect(shipmentOrders).toEqual(mockShipmentOrders);
    });
    const req: TestRequest = httpTestingController.expectOne(`${OtcUrlConstants.submittedRequestsUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockShipmentOrders);
  });

  it('should get Submitted Requests', () => {
    const mockSubmittedRequests: Array<IShipmentOrder> = [];
    service.getSubmittedRequests().subscribe(submittedRequests => {
      expect(submittedRequests).toEqual(mockSubmittedRequests);
    });
    const req: TestRequest = httpTestingController.expectOne(`${OtcUrlConstants.submittedRequestsUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockSubmittedRequests);
  });

  it('should get drafts', () => {
    const mockDrafts: Array<IShipmentOrder> = [];
    service.getDrafts().subscribe(drafts => {
      expect(drafts).toEqual(mockDrafts);
    });
    const req: TestRequest = httpTestingController.expectOne(`${OtcUrlConstants.draftsUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockDrafts);
  });

  it('should get pattern', () => {
    const mockPattern: IShipmentBill = {} as IShipmentBill;
    service.getPattern().subscribe(pattern => {
      expect(pattern).toEqual(mockPattern);
    });
    const req: TestRequest = httpTestingController.expectOne(`${OtcUrlConstants.patternUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPattern);
  });

  it('should get draft', () => {
    const mockDraft: IShipmentBill = {} as IShipmentBill;
    service.getDraft().subscribe(draft => {
      expect(draft).toEqual(mockDraft);
    });
    const req: TestRequest = httpTestingController.expectOne(`${OtcUrlConstants.draftUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockDraft);
  });

  it('should get Stccs', () => {
    const mockStccDetails: Array<ISTCCDetail> = [];
    service.getStccs().subscribe(stccDetails => {
      expect(stccDetails).toEqual(mockStccDetails);
    });
    const req: TestRequest = httpTestingController.expectOne(`${OtcUrlConstants.stccsUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockStccDetails);
  });

  it('should get Stccs with with query params', () => {
    const mockStccDetails: Array<ISTCCDetail> = [];
    const query = 'FAK';
    service.getStccs(query).subscribe(stccDetails => {
      expect(stccDetails).toEqual(mockStccDetails);
    });
    const req: TestRequest = httpTestingController.expectOne(`${OtcUrlConstants.stccsUrl}?query=${query}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockStccDetails);
  });

  it('should get Brim Customer Names', () => {
    const mockBrimCustomersName: Array<object> = [];
    service.getBrimCustomerNames().subscribe(brimCustomersName => {
      expect(brimCustomersName).toEqual(mockBrimCustomersName);
    });
    const req: TestRequest = httpTestingController.expectOne(`${OtcUrlConstants.brimCustomerNamesUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockBrimCustomersName);
  });

  it('should get Special Endorsements', () => {
    const mockSpecialEndorsements: Array<ISpecialEndorsement> = [];
    service.getSpecialEndorsements().subscribe(specialEndorsements => {
      expect(specialEndorsements).toEqual(mockSpecialEndorsements);
    });
    const req: TestRequest = httpTestingController.expectOne(`${OtcUrlConstants.specialEndorsementsUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockSpecialEndorsements);
  });
});
