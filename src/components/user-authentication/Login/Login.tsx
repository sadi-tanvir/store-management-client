import React from 'react';

const Login = () => {
    return (
        <>
            {/* <div className="w-full min-h-screen bg-base-200"> */}
            <div className="min-h-[90vh] bg-base-200" style={{ backgroundImage: `url(/login-bg.jpg)`, backgroundSize: 'cover' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 px-5 sm:px-0">
                    <div className="card w-full max-w-sm shadow-2xl bg-base-100 mt-16 sm:mt-40 sm:ml-20">
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-primary">Login</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" className="input input-bordered" />
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Don't have an account?</a>
                                    </label>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary text-[#0f766e] font-bold">Login</button>
                            </div>
                        </div>
                    </div>
                    <div className="text-center hidden sm:block">
                        {/* <h1 className="text-5xl font-bold">Login now!</h1> */}
                        {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;