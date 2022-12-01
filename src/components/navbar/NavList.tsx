import { NavListType } from "../../types/navbar.types";


export const AuthorizedNavList: NavListType[] = [
    // {
    //     key: 1,
    //     title: 'Home',
    //     path: '/'
    // },
    {
        key: 1,
        title: 'Dashboard',
        path: '/dashboard'
    }

    // {
    //     key: 2,
    //     title: 'About',
    //     path: '/about'
    // }
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