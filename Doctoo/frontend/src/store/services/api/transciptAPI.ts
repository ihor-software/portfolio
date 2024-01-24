import axios from 'axios';
import { baseRequest } from '.';

const baseInstance = axios.create({
  baseURL: 'https://api.sonix.ai/v1/',
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': true,
    Authorization: 'Bearer VvE54BmHA8ilZbLekXzr0gtt',
  },
});

export const transcriptApi = {
  async submitMedia(filename: string, file: File, userId: number) {
    const folder = await findFolder(userId);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', 'en');
    formData.append('video', 'true');
    formData.append('name', filename);
    formData.append('language', 'en');
    formData.append('folder_id', folder.id);

    return baseRequest(() =>
      baseInstance.post(`media`, formData, { headers: { 'Content-type': 'multipart/form-data' } }),
    );
  },

  async getMediaList(page?: number, folder_id?: string) {
    return baseRequest(() => baseInstance.get(`media`, { params: { page, folder_id } }));
  },

  async getMediaById(id: string) {
    return baseRequest(() => baseInstance.get(`media/${id}`));
  },

  async getTranscript(mediaId: string) {
    return baseRequest(() => baseInstance.get(`media/${mediaId}/transcript`));
  },

  async createFolder(userId: number) {
    return baseRequest(() => baseInstance.post('folders', { name: `user_${userId}` }));
  },

  async retrieveFoldersList() {
    return baseRequest(() => baseInstance.get('folders'));
  },

  async userMedia(userId: number) {
    const userFolder = await findFolder(userId);
    if (userFolder) {
      return await this.getMediaList(0, userFolder.id);
    } else {
      return await this.createFolder(userId);
    }
  },
};

const findFolder = async (userId: number) => {
  const { data } = await transcriptApi.retrieveFoldersList();
  return data.folders.find((el: any) => el.name === `user_${userId}`);
};
