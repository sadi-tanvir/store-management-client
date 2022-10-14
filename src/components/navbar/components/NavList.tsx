import { NavListType } from "../../../types/navbar.types";


export const AuthorizedNavList: NavListType[] = [
    {
        key: 1,
        title: 'Home',
        path: '/'
    },
    {
        key: 2,
        title: 'About',
        path: '/about'
    }
    ,
    {
        key: 3,
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