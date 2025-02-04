import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../core/models/profile.model';
import { Pageble } from '../../core/models/pageble.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  me = signal<Profile | null>(null);

  baseApiUrl = 'https://icherniakov.ru/yt-course';

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}/account/me`).pipe(
      tap((me) => {
        this.me.set(me);
      })
    );
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}/account/${id}`);
  }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/account/test_accounts`);
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}/account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }
}
