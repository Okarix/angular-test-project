import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.accessToken;

  if (!accessToken) return next(req);

  const addToken = (req: HttpRequest<any>, accessToken: string) => {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const refreshAndProceed = (
    authService: AuthService,
    req: HttpRequest<any>,
    next: HttpHandlerFn
  ) => {
    if (!isRefreshing) {
      isRefreshing = true;

      return authService
        .refreshAuthToken()
        .pipe(
          switchMap((res) => {
            isRefreshing = false;
            return next(addToken(req, res.access_token));
          })
        )
        .subscribe((res) => console.log('token refreshed'));
    }

    return next(addToken(req, authService.accessToken!));
  };

  if (isRefreshing) {
    refreshAndProceed(authService, req, next);
  }

  return next(addToken(req, accessToken)).pipe(
    catchError((error) => {
      if (error.status === 403) {
        refreshAndProceed(authService, req, next);
      }
      return throwError(error);
    })
  );
};
