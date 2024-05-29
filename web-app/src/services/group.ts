import { GroupRequest, GroupResponse } from '@/models/Group';
import api from '@/shared/api';

const GroupService = {
  async search(query?: string) {
    let list: GroupResponse[] = [];
    if (!query) {
      const response = await api().get('/groups');
      const data = await response.json();
      list = data as GroupResponse[];
    } else {
      // TODO:
    }
    return list;
  },
  async findById(id: string) {
    const response = await api().get(`/groups/${id}`);
    return (await response.json()) as GroupResponse;
  },
  async create(data: GroupRequest) {
    const response = await api().post('/groups', {
      body: JSON.stringify(data),
    });
    return response.ok === true;
  },
  async deleteById(id: string) {
    const response = await api().delete(`/groups/${id}`);
    return response.ok === true;
  },
};

export default GroupService;
