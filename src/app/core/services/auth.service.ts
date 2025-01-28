import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { TokenResponse } from '../models/auth.model';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';
  accessToken: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('access_token');
      this.refreshToken = this.cookieService.get('refresh_token');
    }

    return !!this.accessToken;
  }

  login(payload: { username: string; password: string }) {
    const formData = new FormData();

    formData.append('username', payload.username);
    formData.append('password', payload.password);

    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}token`, formData)
      .pipe(tap((response) => this.saveTokens(response)));
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((response) => this.saveTokens(response)),
        catchError((error) => {
          this.logout();
          return throwError(error);
        })
      );
  }

  logout() {
    this.cookieService.deleteAll();
    this.accessToken = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  saveTokens(response: TokenResponse) {
    this.accessToken = response.access_token;
    this.refreshToken = response.refresh_token;

    this.cookieService.set('access_token', this.accessToken);
    this.cookieService.set('refresh_token', this.refreshToken);
  }
}
