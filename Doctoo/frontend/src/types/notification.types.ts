export type Notification = {
  id: number;
  type: string;
  appointment?: {
    doctor: {
      first_name: string;
      last_name: string;
      payrate?: number;
    };
    is_paid: boolean;
    is_visited: boolean;
    date_time: Date;
    id: number;
  };
  createdAt: Date;
};
