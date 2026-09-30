export interface User {
  id: string;
  employeeCode: string;
  displayName: string;
  email: string;
  avatarUrl: string | null;
  jobTitle: string;
  department: string;
  managerId: string | null;
  roles: readonly string[];
}
