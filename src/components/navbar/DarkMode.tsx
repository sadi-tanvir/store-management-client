import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks'
import { useQuery, useLazyQuery } from '@apollo/client';
import { SET_DARK_MODE } from '../../gql/queries/userAuthQueries';
import { DarkModeMoonIcon, DarkModeSunIcon } from '../shared/icons/icons';

const DarkMode = () => {
    // redux
    const dispatch = useAppDispatch()
    const { darkMode } = useAppSelector(state => state.globalReducer);

    // gql
    const [getDog, { loading, error, data, refetch }] = useLazyQuery(SET_DARK_MODE);

    // handle dark mode
    const HandleDarkMode = () => {
        getDog()
        refetch()
    }

    useEffect(() => {
        if (data) {
            localStorage.setItem('darkMode', JSON.stringify(data?.darkMode))
            dispatch({ type: 'setDarkMode', payload: JSON.parse(localStorage.getItem('darkMode') || 'false') });
        }
    }, [data, darkMode, dispatch])

    return (
        <>
            <label className="swap swap-rotate">
                <input onClick={HandleDarkMode} type="checkbox" />
                {
                    darkMode ?
                        <>
                            <DarkModeSunIcon />
                            <DarkModeMoonIcon />
                        </>
                        :
                        <>
                            <DarkModeMoonIcon />
                            <DarkModeSunIcon />
                        </>
                }


            </label>
        </>
    );
};

export default DarkMode;