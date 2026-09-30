export type AttendanceStatus = 'present' | 'absent' | 'leave' | 'holiday';

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  date: string;
  status: AttendanceStatus;
  hoursWorked: number;
}
