import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { PagesName } from '../../shared/enums/pages-name';

@Component({
  standalone: true,
  imports: [
    FooterComponent,
    CommonModule,
    RouterModule,
    ButtonModule],
  selector: 'odd-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  pageNameEnum: typeof PagesName = PagesName;
}
