import React from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks'




const Home = () => {

    const { value } = useAppSelector(state => state.counterReducer);
    const dispatch = useAppDispatch()


    return (
        <div className="w-full mx-auto text-center dark:bg-darkPrimary">
            <h1 className='text-2xl text-primary dark:text-deepDark font-bold block'>
                afsfsdafsfsdfs
            </h1>
            <h1 className='text-2xl text-primary dark:text-lightDark font-bold block'>
                asdfasdfsadfsdfsd
            </h1>
            <button onClick={() => dispatch({ type: 'increment' })} className="btn btn-primary">increment</button>
            <button onClick={() => dispatch({ type: 'decrement' })} className="btn btn-secondary">decrement</button>
        </div>
    );
};

export default Home;