import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks/hooks';

const CheckAuth = ({ children }: any) => {
    // router
    let navigate = useNavigate();
    let location: any = useLocation();
    let from = location.state?.from?.pathname || "/";

    const { isAuthenticate } = useAppSelector(state => state.authReducer);



    useEffect(() => {
        if (isAuthenticate) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticate, from, navigate])


    return children;
}


export default CheckAuth