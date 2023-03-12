import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PagesName } from '../../shared/enums/pages-name';

@Component({
  selector: 'odd-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  pageNameEnum: typeof PagesName = PagesName;
}
