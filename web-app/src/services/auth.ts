import { AuthResponse } from '@/models/Auth';
import api from '@/shared/api';

const AuthService = {
  async authenticate(username: string, password: string) {
    const response = await api().post('/authenticate', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    console.log('response', response);
    const { token } = (await response.json()) as AuthResponse;
    return token;
  },
};

export default AuthService;
