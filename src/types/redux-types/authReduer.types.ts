export interface AuthReducerStateType {
    isLoading?: boolean,
    isAuthenticate?: boolean,
    role?: string,
    isAdmin?: boolean,
    isManager?: boolean,
    isUser?: boolean;
    accessToken?: string;
    accountStatus: string;
    ownerInfo: {
        _id: string;
        firstName?: string;
        lastName?: string;
        email: string;
        phone?: string;
        image?: string;
        gender?: string;
        currentAddress?: string;
        permanentAddress?: string;
        dateOfBirth?: string;
        createdAt?: string;
        updatedAt?: string;
    };
}

export interface AuthReducerUserType {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    image?: string;
    gender?: string;
    currentAddress?: string;
    permanentAddress?: string;
    dateOfBirth?: string;
    accountStatus: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

export type UserEditReducerType = {
    _id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    image?: string;
    gender?: string;
    role?: string;
    accountStatus?: string;
    currentAddress?: string;
    permanentAddress?: string;
    dateOfBirth?: string;
}