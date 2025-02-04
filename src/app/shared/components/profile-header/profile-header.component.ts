import { Component, input } from '@angular/core';
import { Profile } from '../../../core/models/profile.model';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';

@Component({
  selector: 'app-profile-header',
  imports: [ImgUrlPipe],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
