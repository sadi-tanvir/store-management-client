import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks/hooks';

const RequireAuth = ({ children }: any) => {
    const { isAuthenticate } = useAppSelector(state => state.authReducer);

    let navigate: any = useNavigate();
    let location: any = useLocation();
    let from = location.state?.from?.pathname || "/login";


    useEffect((): any => {
        if (!isAuthenticate) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticate, navigate, from])

    return children;
}


export default RequireAuth