export type PayslipStatus = 'generated' | 'released' | 'acknowledged';

export interface Payslip {
  id: string;
  period: string;
  grossPay: number;
  netPay: number;
  currencyCode: string;
  status: PayslipStatus;
}
