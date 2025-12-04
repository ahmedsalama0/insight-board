import { Control } from 'react-hook-form';
export type LoginFormType = {
  email: string;
  password: string;
  fullname?: string;
};

export type FormRole = 'SignIn' | 'SignUp';

export interface IFormInputTexProps {
  name: string;
  id: string;
  label: string;
  placeholder?: string;
  isEmail?: boolean;
  control: any; //Control<LoginFormType, any, LoginFormType>;
}
