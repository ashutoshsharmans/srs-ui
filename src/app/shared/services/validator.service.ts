import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OtcUrlConstants } from '@otc/configs/url.constants';
import { IEquipment } from '@otc/features/manage/shipment-bill/models/equipment.interface';
import { IEquipmentValidationState } from '@otc/shared/models/state.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  http: HttpClient = inject(HttpClient);

  checkValidEquipment(equipment: IEquipment): Observable<IEquipmentValidationState | never> {
    const params = { initial: equipment.initial || '', number: equipment.number || '' };
    return this.http.get(OtcUrlConstants.equipmentValidateUrl, { params }).pipe(map(response => response as IEquipmentValidationState));
  }
}
