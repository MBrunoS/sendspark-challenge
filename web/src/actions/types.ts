export type LoginRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  companyName: string;
  jobTitle?: string;
  email: string;
  password: string;
};

export type AuthResponseSuccess = {
  ok: true;
  access_token: string;
};

export type AuthResponseError = {
  ok: false;
  error: string;
};

export type AuthResponse = AuthResponseSuccess | AuthResponseError;
