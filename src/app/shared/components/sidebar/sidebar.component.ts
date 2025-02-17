import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon.component';
import { SubscriberCardComponent } from '../subscriber-card/subscriber-card.component';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../../features/profile/profile.service';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
      id: 1,
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
      id: 2,
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
      id: 3,
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
