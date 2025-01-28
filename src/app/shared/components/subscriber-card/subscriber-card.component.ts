import { Component, Input } from '@angular/core';
import { Profile } from '../../../core/models/profile.model';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';

@Component({
  selector: 'app-subscriber-card',
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
