import { Address } from "../address";

export interface fieldProps {
    lable?: string;
    type?: string;
    select?: boolean;
    name: string;
    value: string;
    error?: boolean;
    helperText?: string;
};

export interface UserFormStateProps {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    password: string;
    confirmPassword?: string;
};