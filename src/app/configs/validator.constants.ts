import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { IPieceOfEquipmentSubGroup } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';

export interface IEquipmentAbstractControl extends AbstractControl {
  controls: Array<FormGroup<IPieceOfEquipmentSubGroup>>;
}

export class OtcValidatorConstants {
  static minValidator: ValidatorFn = Validators.min(100);

  static duplicateEquipment(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const piecesOfEquipments = control as IEquipmentAbstractControl;
      const map = new Map<string, boolean>();
      let duplicate = false;
      let count = 0;
      piecesOfEquipments.controls.forEach((control: FormGroup<IPieceOfEquipmentSubGroup>) => {
        const initial = control.controls.equipmentId.controls.initial;
        const number = control.controls.equipmentId.controls.number;
        if (initial?.value && number?.value) {
          const equipment = `${initial.value} ${number.value}`;
          if (map.has(equipment)) {
            duplicate = true;
            count++;
          } else {
            map.set(equipment, true);
          }
        }
      });
      return duplicate ? { duplicateEquipment: count } : {};
    };
  }
}
