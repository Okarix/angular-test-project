import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TokenResponse } from '../models/auth.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';
  accessToken: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('access_token');
    }

    return !!this.accessToken;
  }

  login(payload: { username: string; password: string }) {
    const formData = new FormData();

    formData.append('username', payload.username);
    formData.append('password', payload.password);

    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}token`, formData)
      .pipe(
        tap((response) => {
          this.accessToken = response.access_token;
          this.refreshToken = response.refresh_token;

          this.cookieService.set('access_token', this.accessToken);
          this.cookieService.set('refresh_token', this.refreshToken);
        })
      );
  }
}
