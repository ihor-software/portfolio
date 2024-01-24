import axios from 'axios';

const updateAvatar = (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);
  return axios.post<string>(`/api/v1/files/upload-avatar/`, formData);
};

const deleteFile = (filePath: string) => {
  return axios.delete<void>(`/api/v1/files/`, { params: { filePath } });
};

export { updateAvatar, deleteFile };
