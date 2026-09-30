import type { User } from '@timescapenu/shared-models';

export function buildUser(overrides: Partial<User> = {}): User {
  return {
    id: 'user-1',
    employeeCode: 'E10001',
    displayName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    avatarUrl: null,
    jobTitle: 'Senior Analyst',
    department: 'Finance',
    managerId: null,
    roles: ['employee'],
    ...overrides,
  };
}
