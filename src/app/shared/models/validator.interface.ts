export interface IStccValidator {
  forbidUpdateBillHazToNonHaz?: boolean;
  forbidUpdateBillNonHazToHaz?: boolean;
  invalidEmptyNonRevenue?: boolean;
  invalidOrderOption?: boolean;
  invalidStcc?: boolean;
}
