import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { notificationAsyncActions } from 'src/store/slices/notificationSlice';
import { currentBackendHost } from 'src/utils/hostUtil';

export const useNotificationSocket = (id: number) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io(currentBackendHost() as string);
    socket.on('connect', () => {
      console.log('Connected to server');
      dispatch(notificationAsyncActions.fetchNotifications(id));
    });
    socket.on('newNotification', () => {
      dispatch(notificationAsyncActions.fetchNotifications(id));
    });
    return () => {
      socket.disconnect();
    };
  }, []);
};
