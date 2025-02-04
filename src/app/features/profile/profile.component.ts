import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../shared/components/profile-header/profile-header.component';
import { ProfileService } from './profile.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '../../shared/components/svg-icon.component';
import { RouterLink } from '@angular/router';
import { ImgUrlPipe } from '../../shared/pipes/img-url.pipe';

@Component({
  selector: 'app-profile',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    ImgUrlPipe,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  me$ = toObservable(this.profileService.me);
  subscriber$ = this.profileService.getSubscribersShortList(5);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );
}
