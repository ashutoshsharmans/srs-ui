import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'otc-mask',
  standalone: true,
  imports: [
    OverlayModule,
    MatProgressSpinner
  ],
  templateUrl: './mask.component.html',
  styleUrl: './mask.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaskComponent {
  value: InputSignal<boolean> = input.required<boolean>();
}
