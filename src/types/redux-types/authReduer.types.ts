export interface AuthReducerStateType {
    isLoading?: boolean,
    isAuthenticate?: boolean,
    role?: string,
    isAdmin?: boolean,
    isManager?: boolean,
    isUser?: boolean;
    accessToken?: string;
    accountStatus: string;
    userInfo: {
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