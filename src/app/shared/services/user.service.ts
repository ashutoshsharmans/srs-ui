import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OtcUrlConstants } from '@otc/configs/url.constants';
import { IUserRaw } from '@otc/shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http: HttpClient = inject(HttpClient);

  getUserInfo(): Observable<IUserRaw | never> {
    return this.http.get(OtcUrlConstants.securityUserInfoUrl).pipe(map(response => response as IUserRaw));
  }
}
