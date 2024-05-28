type BearerTokenResponse = {
  type: 'Bearer';
  token: string;
};

export const TokenResponse = {
  json(token: string): BearerTokenResponse {
    return {
      type: 'Bearer',
      token,
    };
  },
};
