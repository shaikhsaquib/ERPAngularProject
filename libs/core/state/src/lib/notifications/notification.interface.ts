export type NotificationSeverity = 'info' | 'success' | 'warning' | 'danger';

export interface AppNotification {
  id: string;
  severity: NotificationSeverity;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationsState {
  items: readonly AppNotification[];
}

export const initialNotificationsState: NotificationsState = {
  items: [],
};
