export interface User {
  address: string | null;
  componay_name: string | null;
  country_id: number | null;
  created_at: string;
  deleted_at: string | null;
  email: string;
  email_verified_at: string;
  firstname: string | null;
  id: number;
  lastname: string | null;
  name: string | null;
  phone: string | null;
  photo: string | null;
  photo_file_id: number | null;
  profession: string | null;
  region_id: string | null;
  role: string;
  status: string;
  territory: string | null;
  updated_at: string | null;
  username: string | null;
  photo_id: number;
}

export interface FullUserData {
  data: User;
  message: string;
  success: boolean;
}
