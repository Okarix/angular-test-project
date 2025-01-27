import { Component, Input } from '@angular/core';
import { Profile } from '../../../../core/models/profile.model';
import { ImgUrlPipe } from '../../../../shared/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
