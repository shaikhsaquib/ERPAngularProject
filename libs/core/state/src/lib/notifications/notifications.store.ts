import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import type { AppNotification } from './notification.interface';
import { initialNotificationsState } from './notification.interface';

export const NotificationsStore = signalStore(
  { providedIn: 'root' },
  withState(initialNotificationsState),
  withComputed(({ items }) => ({
    unreadCount: computed(() => items().filter((item) => !item.read).length),
  })),
  withMethods((store) => ({
    push(notification: Omit<AppNotification, 'id' | 'read' | 'createdAt'>): void {
      const entry: AppNotification = {
        ...notification,
        id: crypto.randomUUID(),
        read: false,
        createdAt: new Date().toISOString(),
      };
      patchState(store, { items: [entry, ...store.items()] });
    },
    markRead(id: string): void {
      patchState(store, {
        items: store.items().map((item) => (item.id === id ? { ...item, read: true } : item)),
      });
    },
    markAllRead(): void {
      patchState(store, { items: store.items().map((item) => ({ ...item, read: true })) });
    },
    clear(): void {
      patchState(store, initialNotificationsState);
    },
  })),
);
