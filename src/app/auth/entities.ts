export interface AuthResponseData {
  token: string;
  email: string;
  password: string;
  refreshToken: string;
  expiresIn: string;
  id: string;
  history: string[];
  categories: string[];
  favorites: string[];
}

export interface NewUserDto {
  username: string;
  email: string;
  password: string;
}

export interface AuthUserInfoDto {
  email: string;
  password: string;
  id: string;
  token: string;
  expiresIn?: string;
  history: string[];
  categories: string[];
  favorites: string[];
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
}
//!