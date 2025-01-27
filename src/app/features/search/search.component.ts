import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { Profile } from '../../core/models/profile.model';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-search',
  imports: [ProfileCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  profileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((profiles) => {
      this.profiles = profiles;
    });
  }
}
