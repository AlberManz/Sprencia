export interface User {
  id?: number;
  name: string,
  surname: string,
  email: string;
  password: string,
  city: string,
  birth_date: string,
  register_date: string,
  role?: string,
  avatar: string,
  activity_id_booked: number,
  activity_id_done: number
}

