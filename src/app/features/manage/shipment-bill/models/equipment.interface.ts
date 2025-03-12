export interface IEquipment {
  initial?: string;
  number?: string;
}

export interface IEquipmentDetail extends IEquipment {
  overwrite?: boolean;
}
