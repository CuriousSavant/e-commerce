export interface fieldProps {
    lable?: string;
    type?: string;
    select?: boolean;
    name: string;
    value: string;
    error?: boolean;
    helperText?: string;
};

export interface CreateUserStateProps {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    birthday: string;
    role: string;
    password: string;
    confirmPassword: string;
};