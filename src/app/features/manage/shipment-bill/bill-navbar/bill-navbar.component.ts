import { ChangeDetectionStrategy, Component, input, InputSignal, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { IBillSection } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { BadgeComponent } from '@otc/shared/components/badge/badge.component';
import { EBillSection } from '@otc/shared/enums/bill.enums';

@Component({
  selector: 'otc-bill-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCard,
    BadgeComponent
  ],
  templateUrl: './bill-navbar.component.html',
  styleUrl: './bill-navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillNavbarComponent {
  billSections: InputSignal<Array<IBillSection>> = input.required<Array<IBillSection>>();
  open: InputSignal<boolean> = input.required<boolean>();
  close = output<void>();

  scrollTo($event: EBillSection | string): void {
    const section = document.querySelector(`.${$event}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
