import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OtcUrlConstants } from '@otc/configs/url.constants';
import { IShipmentBill } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { IShipmentOrder, IShipmentSearch } from '@otc/features/shipment-orders/models/shipment-order.interface';
import { ISpecialEndorsement } from '@otc/shared/models/special-endorsement.interface';
import { ISTCCDetail } from '@otc/shared/models/state.interface';
import { IStccQualifier } from '@otc/shared/models/stcc.interface';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  http: HttpClient = inject(HttpClient);

  getSubmittedRequestsToMF(): Observable<Array<IShipmentOrder> | never> {
    return this.http.get(`${OtcUrlConstants.submittedRequestsUrl}`).pipe(map(response => response as Array<IShipmentOrder>));
  }

  getUpdatedWaybillsMF(): Observable<Array<IShipmentOrder> | never> {
    debugger;
    return this.http.get(`${OtcUrlConstants.updatedWaybillsUrl}`).pipe(map(response => response as Array<IShipmentOrder>));
  }

  submitShipmentRequest(shipmentRequest: object, wo: string): Observable<object | never> {
    return this.http.post(`${OtcUrlConstants.submitUrl}`, shipmentRequest, { params: { wo } }).pipe(map(response => response as object));
  }

  getQualifiers(): Observable<Array<IStccQualifier | never>> {
    return this.http.get(`${OtcUrlConstants.qualifiersUrl}`).pipe(map(response => response as Array<IStccQualifier>));
  }

  getPatterns(): Observable<Array<IShipmentOrder>> {
    return this.http.get(`${OtcUrlConstants.submittedRequestsUrl}`).pipe(map(response => response as Array<IShipmentOrder>));
  }

  getFilteredShipmentOrders(input?: IShipmentSearch): Observable<Array<IShipmentOrder>> {
    const params = input?.waybillSerial ? { params: { id: input.waybillSerial } } : undefined;
    return this.http.get(`${OtcUrlConstants.submittedRequestsUrl}`, params).pipe(map(response => response as Array<IShipmentOrder>));
  }

  getSubmittedRequests(): Observable<Array<IShipmentOrder>> {
    return this.http.get(`${OtcUrlConstants.submittedRequestsUrl}`).pipe(map(response => response as Array<IShipmentOrder>));
  }

  getDrafts(): Observable<Array<IShipmentOrder>> {
    return this.http.get(`${OtcUrlConstants.draftsUrl}`).pipe(map(response => response as Array<IShipmentOrder>));
  }

  getPattern(): Observable<IShipmentBill | never> {
    return this.http.get(OtcUrlConstants.patternUrl).pipe(map(response => response as IShipmentBill));
  }

  getDraft(): Observable<IShipmentBill | never> {
    return this.http.get(OtcUrlConstants.draftUrl).pipe(map(response => response as IShipmentBill));
  }

  getStccs(query?: string): Observable<Array<ISTCCDetail> | never> {
    const params = query ? { params: { query } } : {};
    return this.http.get(OtcUrlConstants.stccsUrl, params).pipe(map(response => response as Array<ISTCCDetail>));
  }

  getBrimCustomerNames(): Observable<Array<string | never>> {
    return this.http.get(`${OtcUrlConstants.brimCustomerNamesUrl}`).pipe(map(response => response as Array<string>));
  }

  getSpecialEndorsements(): Observable<Array<ISpecialEndorsement | never>> {
    return this.http.get(OtcUrlConstants.specialEndorsementsUrl).pipe(map(response => response as Array<ISpecialEndorsement>));
  }

  deleteDraft(): Observable<string | never> {
    return this.http.get(`${OtcUrlConstants.draftsUrl}`).pipe(map(response => response as string));
  }

  deletePattern(): Observable<string | never> {
    return this.http.get(`${OtcUrlConstants.draftsUrl}`).pipe(map(response => response as string));
  }
}
