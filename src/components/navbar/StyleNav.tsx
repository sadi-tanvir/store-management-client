import { ActiveStyleType, LinkType } from "../../types/navbar.types";
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks'

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

export const ActiveStockNavProps = ({ isActive }: LinkType) => {
    const { darkMode } = useAppSelector(state => state.globalReducer);
    return isActive ?
        {
            ...activeStockStyle,
            color: `${darkMode ? '#cbd5e1' : '#fff'}`,
            backgroundColor: `${darkMode ? '#475569' : '#37cdbe'}`
        }
        : {
            ...nonActiveStyle,
            color: `${darkMode ? '#cbd5e1' : '#64748b'}`,
        }
}

export const SidebarActiveProps = ({ isActive }: LinkType) => {
    const { darkMode } = useAppSelector(state => state.globalReducer);
    return isActive ?
        {
            ...sidebarActiveStyle,
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
    fontWeight: 'bold',
    margin: '0px 10px',
    padding: '5px 30px',
    borderRadius: '5px',
    boxShadow: '0px 0px 6px -5px black',
    transition: 'all .07s ease',
    textAline: 'start'
};

export let activeStockStyle: ActiveStyleType = {
    fontWeight: 'bold',
    margin: '0px 10px',
    padding: '5px 10px',
    borderRadius: '5px',
    boxShadow: '0px 0px 6px -5px black',
    transition: 'all .07s ease',
    textAline: 'start'
};

export let nonActiveStyle: ActiveStyleType = {
    fontWeight: 'bold',
    margin: '0px 0px',
    padding: '5px 15px',
    transition: 'all .07s ease'
}

export let activeStyleMobile: ActiveStyleType = {
    fontWeight: 'bold',
    margin: '0px 0px',
    padding: '8px 15px',
    borderRadius: '5px',
    boxShadow: '0px 0px 6px -5px black',
    transition: 'all .07s ease'
};

export let nonActiveStyleMobile: ActiveStyleType = {
    fontWeight: 'bold',
    margin: '0px 0px',
    padding: '8px 15px',
    transition: 'all .07s ease'
}

export let sidebarActiveStyle: ActiveStyleType = {
    fontWeight: 'bold',
    margin: '0px 0px',
    padding: '5px 15px',
    borderRadius: '5px',
    boxShadow: '0px 0px 6px -5px black',
    transition: 'all .07s ease',
    textAline: 'start'
};