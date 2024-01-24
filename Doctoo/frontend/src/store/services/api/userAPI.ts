import axiosInstance, { baseRequest } from '.';

export const userAPI = {
  async getUserSettings(userId: number) {
    return baseRequest(() => axiosInstance.get(`settings/${userId}`));
  },

  async verifyOtp(otp: string, id?: number) {
    return baseRequest(() => axiosInstance.post('authentication/2fa/verify', { otp, id }));
  },

  async sendOtp(email: string, password: string) {
    return baseRequest(() =>
      axiosInstance.post('authentication/2fa/generate', { email, password }),
    );
  },

  async toggle2fa(twoFACode: string) {
    return baseRequest(() => axiosInstance.post('authentication/2fa', { twoFACode }));
  },

  async chargeUser(amount: number) {
    return baseRequest(() => axiosInstance.post('payment/charge', { amount }));
  },

  async getCardList() {
    return baseRequest(() => axiosInstance.get('payment'));
  },

  async addCard(paymentMethodId: string) {
    return baseRequest(() => axiosInstance.post('payment/credit-card', { paymentMethodId }));
  },

  async deleteCard(paymentMethodId: string) {
    return baseRequest(() => axiosInstance.delete(`payment/${paymentMethodId}`));
  },

  async retrieveAppointment(id: number) {
    return baseRequest(() => axiosInstance.get(`appointments/${id}`));
  },

  async updateAppointment(id: number, data: any) {
    return baseRequest(() => axiosInstance.patch(`appointments/${id}`, data));
  },
};
