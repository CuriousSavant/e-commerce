import { User } from "@prisma/client";

export type TUsersTableRow = {
    user?: User;
    loading?: boolean;
}

export type TUsersTable = {
    users?: User[];
    loading?: boolean;
}