export class OtcHazardousConstants {
  static isHazardous(stcc?: string): boolean {
    return OtcHazardousConstants.fakStccs.includes(stcc || '');
  }

  static isWasteHaz(stcc?: string): boolean {
    return OtcHazardousConstants.wasteFakStccs.includes(stcc || '');
  }

  static fakStccs: Array<string> = [
    '4950166',
    '4950163',
    '4950164',
    '4950165',
    '4950160',
    '4950170',
    '4950155',
    '4950150',
    '4950140',
    '4950120',
    '4950130',
    '4950110'
  ];

  static wasteFakStccs: Array<string> = [
    '4850155',
    '4850150',
    '4850140',
    '4850130',
    '4850120',
    '4850110'
  ];

  static prohibitedHazStccs: Array<string> = [
    '4907423',
    '4909276',
    '4921204',
    '4921699',
    '4921791',
    '4921792',
    '4921793',
    '4921794',
    '4921795',
    '4921796',
    '4921797',
    '4923111',
    '4932379'
  ];

  static prohibitedHazRageStccs: Array<{ max: number; min: number }> = [
    { min: 4829001, max: 4829999 },
    { min: 4929001, max: 4929999 },
    { min: 4820101, max: 4820899 },
    { min: 4920101, max: 4920899 },
    { min: 4827001, max: 4827999 },
    { min: 4927001, max: 4927999 }
  ];
}
