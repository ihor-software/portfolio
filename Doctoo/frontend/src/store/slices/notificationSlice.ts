import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Notification } from 'src/types/notification.types';
import { fetchData } from '../services/fetchDataUtils';

type NotificationStateType = {
  notifications: Notification[];
  loading: boolean;
};

async function createNotifications(id: number): Promise<Notification[]> {
  const notificationsData = await fetchData('/api/v1/notifications/patient/' + id);

  const notifications: Notification[] = notificationsData.map((notification: any) => {
    return {
      id: notification.id,
      type: notification.type,
      createdAt: new Date(notification.createdAt),
      updatedAt: new Date(notification.updatedAt),
      appointment: {
        id: notification.appointment_id,
        date_time: new Date(notification.appointments.date_time),
        status: notification.appointments.status_cd,
        isNotifiedTime: notification.appointments.is_notified_time,
        isNotifiedPay: notification.appointments.is_notified_pay,
        doctor: {
          id: 1,
          first_name: notification.appointments.doctor.user.first_name,
          last_name: notification.appointments.doctor.user.last_name,
          specialty: notification.appointments.doctor.specialty.specialty,
          hospital: notification.appointments.doctor.hospital.name,
          isAvailable: notification.appointments.doctor.available,
          rating: 0,
          reviews: [],
          appointmentsSlots: [],
          payrate: notification.appointments.doctor.payrate,
        },
        is_paid: notification.appointments.is_paid,
      },
    };
  });

  return notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async (id: number) => {
    const notifications = await createNotifications(id);
    return notifications;
  },
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notifications: [], loading: true } as NotificationStateType,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications = [...state.notifications, action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
    });
  },
});

export const notificationSliceActions = notificationSlice.actions;

export const notificationAsyncActions = { fetchNotifications };

export default notificationSlice.reducer;
