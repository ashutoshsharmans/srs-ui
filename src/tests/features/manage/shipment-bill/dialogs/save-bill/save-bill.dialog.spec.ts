import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MockDirective, MockModule } from 'ng-mocks';

import { SaveBillDialog } from '@otc/features/manage/shipment-bill/dialogs/save-bill/save-bill.dialog';

describe('Save Bill Component', () => {
  let component: SaveBillDialog;
  let fixture: ComponentFixture<SaveBillDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SaveBillDialog,
        MockModule(MatFormFieldModule),
        MockModule(MatInputModule),
        MockModule(ReactiveFormsModule),
        MockModule(FormsModule),
        MockModule(MatButtonModule),
        MockDirective(MatDialogTitle),
        MockDirective(MatDialogContent),
        MockDirective(MatDialogClose)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SaveBillDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
