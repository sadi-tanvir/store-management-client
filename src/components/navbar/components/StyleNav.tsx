import { ActiveStyleType, LinkType } from "../../../types/navbar.types";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks/hooks'

export const ActiveNavProps = ({ isActive }: LinkType) => {
    const { darkMode } = useAppSelector(state => state.globalReducer);
    return isActive ?
        {
            ...activeStyle,
            color: `${darkMode ? '#cbd5e1' : '#fff'}`,
            backgroundColor: `${darkMode ? '#475569' : '#37cdbe'}`
        }
        : {
            ...nonActiveStyle,
            color: `${darkMode ? '#cbd5e1' : '#64748b'}`,
        }
}
export const ActiveMobileNavProps = ({ isActive }: LinkType) => {
    const { darkMode } = useAppSelector(state => state.globalReducer);
    return isActive ?
        {
            ...activeStyleMobile,
            color: `${darkMode ? '#cbd5e1' : '#fff'}`,
            backgroundColor: `${darkMode ? '#475569' : '#37cdbe'}`
        } : {
            ...nonActiveStyleMobile,
            color: `${darkMode ? '#cbd5e1' : '#64748b'}`,
        }
};



export let activeStyle: ActiveStyleType = {
    color: 'red',
    fontWeight: 'bold',
    margin: '0px 10px',
    backgroundColor: '#fee2e2',
    padding: '5px 30px',
    borderRadius: '5px',
    boxShadow: '0px 0px 6px -5px black',
    transition: 'all .07s ease'
};

export let nonActiveStyle: ActiveStyleType = {
    color: '#475569',
    fontWeight: 'bold',
    margin: '0px 0px',
    padding: '5px 20px',
    transition: 'all .07s ease'
}

export let activeStyleMobile: ActiveStyleType = {
    color: 'red',
    fontWeight: 'bold',
    margin: '0px 0px',
    backgroundColor: '#fee2e2',
    padding: '8px 15px',
    borderRadius: '5px',
    boxShadow: '0px 0px 6px -5px black',
    transition: 'all .07s ease'
};

export let nonActiveStyleMobile: ActiveStyleType = {
    color: '#475569',
    fontWeight: 'bold',
    margin: '0px 0px',
    padding: '8px 15px',
    transition: 'all .07s ease'
}