export interface AuthReducerStateType {
    isLoading?: boolean,
    isAuthenticate?: boolean,
    isAdmin?: boolean,
    isManager?: boolean,
    isUser?: boolean;
    accessToken?: string;
    accountStatus: string;
    userInfo: {
        _id: string;
        name: string;
        email: string;
        phone?: string;
        image?: string;
    };
}

export interface AuthReducerUserType {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    image?: string;
}