// Employee model
export interface Employee {
  name: string;
  designation: string;
  id: number;
  email: string;
  phone: number;
  isRootNode?: boolean;
  rm_id?: number | null;
}
