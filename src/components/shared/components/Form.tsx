import React from 'react';
import { Link } from 'react-router-dom';
import { FormPropsType } from '../../../types/userAuth.types';



const Form = ({ title, nameField, forgotPassword, doesHaveAccount, onChange, handleSubmit, phoneField }: FormPropsType) => {

    return (
        <>
            <div className="min-h-[90vh] bg-base-200" style={{ backgroundImage: `url(/login-bg.jpg)`, backgroundSize: 'cover' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 px-5 sm:px-0">
                    <div className={`card w-full max-w-sm shadow-2xl bg-base-100 ${nameField ? 'sm:mt-20 mt-5 mb-10' : 'sm:mt-40 mt-16'} sm:ml-20`}>
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-primary">{title}</h1>
                            <form onSubmit={handleSubmit}>
                                {
                                    nameField &&
                                    <>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">First Name</span>
                                            </label>
                                            <input
                                                onChange={onChange}
                                                name='firstName'
                                                type="text"
                                                placeholder="First Name"
                                                className="input input-bordered"
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Last Name</span>
                                            </label>
                                            <input
                                                onChange={onChange}
                                                name='lastName'
                                                type="text"
                                                placeholder="Last Name"
                                                className="input input-bordered"
                                            />
                                        </div>
                                    </>
                                }

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        onChange={onChange}
                                        name='email'
                                        type="email"
                                        placeholder="email@example.com"
                                        className="input input-bordered"
                                    />
                                </div>

                                {
                                    phoneField && <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Phone</span>
                                        </label>
                                        <input
                                            onChange={onChange}
                                            name='phone'
                                            type="text"
                                            placeholder="Phone"
                                            className="input input-bordered"
                                        />
                                    </div>
                                }

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        onChange={onChange}
                                        name='password'
                                        type="text"
                                        placeholder="password"
                                        className="input input-bordered"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                    {forgotPassword && <label className="label">
                                        <Link to="/forget-password" className="label-text-alt link link-hover">
                                            Forgot password?
                                        </Link>
                                    </label>}
                                    <label className="label">
                                        <Link to={doesHaveAccount.path} className="label-text-alt link link-hover">
                                            {doesHaveAccount.label}
                                        </Link>
                                    </label>
                                </div>

                                <div className="form-control mt-6">
                                    <button type='submit' className="btn btn-primary text-[#0f766e] font-bold">{title}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="text-center hidden sm:block"></div>
                </div>
            </div>
        </>
    );
};

export default Form;