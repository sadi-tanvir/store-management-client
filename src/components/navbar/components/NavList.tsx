import { NavListType } from "../../../types/navbar.types";


export const AuthorizedNavList: NavListType[] = [
    {
        key: 1,
        title: 'Dashboard',
        path: '/dashboard'
    },
    {
        key: 2,
        title: 'Home',
        path: '/'
    },
    {
        key: 3,
        title: 'About',
        path: '/about'
    }
    ,
    {
        key: 4,
        title: 'Stocks',
        path: '/stocks'
    }
]



export const UnauthorizedNavList: NavListType[] = [
    {
        key: 1,
        title: 'Login',
        path: '/login'
    },
    {
        key: 2,
        title: 'Register',
        path: '/register'
    }
]