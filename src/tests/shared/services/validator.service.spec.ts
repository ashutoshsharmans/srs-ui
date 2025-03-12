import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OtcUrlConstants } from '@otc/configs/url.constants';
import { IEquipmentValidationState } from '@otc/shared/models/state.interface';
import { ValidatorService } from '@otc/shared/services/validator.service';

describe('Validation Service', () => {
  let service: ValidatorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        ValidatorService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ValidatorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should validate equipment when equipment detail provided', () => {
    const initial = 'NS';
    const number = '1';
    const mockResponse: IEquipmentValidationState = {
      initial,
      number,
      loading: false,
      valid: true,
      equipmentId: `${initial} ${number}`,
      notInUmber: true
    };

    service.checkValidEquipment({ initial, number }).subscribe((equipment: IEquipmentValidationState) => {
      expect(equipment).toEqual(mockResponse);
    });

    const req: TestRequest = httpTestingController.expectOne(`${OtcUrlConstants.equipmentValidateUrl}?initial=${initial}&number=${number}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should validate equipment with empty value when no value is provided', () => {
    const initial = '';
    const number = '';
    const mockResponse: IEquipmentValidationState = {
      initial,
      number,
      loading: false,
      valid: true,
      equipmentId: '',
      notInUmber: true
    };

    service.checkValidEquipment({ initial, number }).subscribe((equipment: IEquipmentValidationState) => {
      expect(equipment).toEqual(mockResponse);
    });

    const req: TestRequest = httpTestingController.expectOne(`${OtcUrlConstants.equipmentValidateUrl}?initial=${initial}&number=${number}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });
});
