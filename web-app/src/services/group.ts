import { GroupRequest, GroupResponse } from '@/models/Group';
import fetch from '@/shared/api';

const GroupService = {
  async search(query?: string) {
    let list: GroupResponse[] = [];
    if (!query) {
      const response = (await fetch.get('groups').json()) as GroupResponse[];
      list = response;
    } else {
      // TODO:
    }
    return list;
  },
  async findById(id: string) {
    const response = await fetch.get(`groups/${id}`).json();
    return response as GroupResponse;
  },
  async create(data: GroupRequest) {
    const response = await fetch.post('groups', { json: data });
    return response.ok === true;
  },
  async deleteById(id: string) {
    const response = await fetch.delete(`groups/${id}`);
    return response.ok === true;
  },
};

export default GroupService;
