export interface AuthResponseData {
  id: string;
  token: string;
  email: string;
  password: string;
  refreshToken: string;
  expiresIn: string;
  history: string[];
  categories: string[];
  favorites: string[];
  isAdmin: boolean;
  message?: string;
}

export interface NewUserDto {
  username: string;
  email: string;
  password: string;
}

export interface AuthUserInfoDto {
  id: string;
  token: string;
  email: string;
  password: string;
  refreshToken?: string;
  expiresIn?: string;
  history: string[];
  categories: string[];
  favorites: string[];
  isAdmin: boolean;
}

// export interface UpdateUser {
//     email: string,
//     password: string,
//     id: string,
//     token: string,
//     history: string[],
//     categories: string[],
//     favorites: string[]
// }

//!
export interface Logout {
  email: string;
  password: string;
  id: string;
  history: string[];
  categories: string[];
  favorites: string[];
  token: string;
  isAdmin: boolean;
  _tokenExpirationDate: string;
}

export interface AutoLogout {
  email: string;
  password: string;
  id: string;
  history: string[];
  categories: string[];
  favorites: string[];
  _token: string;
  _tokenExpirationDate: string;
  isAdmin: boolean;
}
//!