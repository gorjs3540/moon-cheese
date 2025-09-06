import { http } from '@/utils/http';

type GetUserResponse = User;

export const getUser = async () => {
  return await http.get<GetUserResponse>('/api/me');
};
