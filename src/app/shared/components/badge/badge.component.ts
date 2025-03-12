import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, InputSignal, Signal } from '@angular/core';

import { EStatus } from '@otc/shared/enums/status.enums';

@Component({
  selector: 'otc-badge',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  value: InputSignal<EStatus | string> = input.required<EStatus | string>();
  detail: Signal<{ color: string; label: string }> = computed(() => {
    let value: { color: string; label: string };
    switch (this.value()) {
      case EStatus.DONE:
      case EStatus.VALID:
        value = { color: 'bg-secondary', label: 'Done' };
        break;
      case EStatus.IN_PROGRESS:
        value = { color: 'bg-warning', label: 'In Progress' };
        break;
      case EStatus.PENDING:
        value = { color: 'bg-light', label: 'Validating' };
        break;
      case EStatus.INVALID:
        value = { color: 'bg-danger', label: 'Invalid' };
        break;
      case EStatus.REQUIRE:
        value = { color: 'bg-danger', label: 'Required' };
        break;
      default:
        value = { color: '', label: '' };
    }
    return value;
  });
}
