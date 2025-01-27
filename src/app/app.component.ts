import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from './shared/components/profile-card/profile-card.component';
import { ProfileService } from './features/profile/profile.service';
import { Profile } from './core/models/profile.model';

@Component({
  selector: 'app-root',
  imports: [ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  profileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((profiles) => {
      this.profiles = profiles;
    });
  }
}
