import React from 'react';
import { FacebookIcon, GithubIcon, InstagramIcon, TwitterIcon } from '../../components/shared/icons/icons';

const Footer = () => {
    return (
        <>
            <footer className="absolute bottom-0 z-50 opacity-90 footer bg-slate-100 text-base-content dark:bg-gray-800">
                <div className="w-full p-4 py-6 mx-auto  md:p-8 lg:py-8">
                    <div className="w-11/12 mx-auto grid grid-cols-2 gap-5 md:grid-cols-5 lg:grid-cols-5">
                        <div>
                            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h3>
                            <ul className="text-gray-500 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="#" className=" hover:underline">About</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Careers</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Brand Center</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Blog</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help center</h3>
                            <ul className="text-gray-500 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Discord Server</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Twitter</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Facebook</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h3>
                            <ul className="text-gray-500 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Licensing</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Terms</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h3>
                            <ul className="text-gray-500 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="#" className=" hover:underline">About</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Careers</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Brand Center</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Blog</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h3>
                            <ul className="text-gray-500 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">iOS</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Android</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Windows</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">MacOS</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <div className="text-center mx-auto">
                        <a href="#" className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img src="/Logo.png" className="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
                            Store Management
                        </a>
                        <span className="block text-sm text-center text-gray-500 dark:text-gray-400">© 2022-2023  All Rights Reserved.
                        </span>
                        <ul className="flex justify-center mt-5 space-x-5">
                            <li>
                                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                                    <FacebookIcon />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                                    <InstagramIcon />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                                    <TwitterIcon />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                                    <GithubIcon />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;