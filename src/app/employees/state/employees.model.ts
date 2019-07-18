import { ID } from '@datorama/akita';

export interface Employee {
  id: ID;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  street: string;
  department: string;
}
