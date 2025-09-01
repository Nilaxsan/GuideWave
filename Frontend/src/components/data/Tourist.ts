export interface TouristsDto {
  userId: number;
  fullName: string;
  email: string;
  password?: string; // optional (not needed on update)
  role: string;
  phoneNumber: string;
  country: string;
  profile: string;
}

export interface CreateTouristsDto {
  fullName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  location: string;
  profile: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
