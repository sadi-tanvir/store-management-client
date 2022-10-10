import React from 'react';
import { Link } from 'react-router-dom';
import { FormPropsType } from '../types/userAuth.types';



const Form = ({ title, nameField, forgotPassword, dontHaveAccount }: FormPropsType) => {
    return (
        <>
            <div className="min-h-[90vh] bg-base-200" style={{ backgroundImage: `url(/login-bg.jpg)`, backgroundSize: 'cover' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 px-5 sm:px-0">
                    <div className={`card w-full max-w-sm shadow-2xl bg-base-100 mt-16 ${nameField ? 'sm:mt-28' : 'sm:mt-40'} sm:ml-20`}>
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-primary">{title}</h1>
                            {
                                nameField && <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Name" className="input input-bordered" />
                                </div>
                            }

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email@example.com" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" className="input input-bordered" />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                {forgotPassword && <label className="label">
                                    <Link to="/forget-password" className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>}
                                <label className="label">
                                    <Link to={dontHaveAccount.path} className="label-text-alt link link-hover">{dontHaveAccount.label}</Link>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary text-[#0f766e] font-bold">Login</button>
                            </div>
                        </div>
                    </div>
                    <div className="text-center hidden sm:block"></div>
                </div>
            </div>
        </>
    );
};

export default Form;