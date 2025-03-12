import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ISaveBillFM } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';

@Component({
  selector: 'otc-save-bill',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './save-bill.dialog.html',
  styleUrl: './save-bill.dialog.scss'
})
export class SaveBillDialog implements OnInit {
  form!: FormGroup<ISaveBillFM>;

  ngOnInit(): void {
    this.form = new FormGroup<ISaveBillFM>({
      draftName: new FormControl(undefined, { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] })
    });
  }
}
