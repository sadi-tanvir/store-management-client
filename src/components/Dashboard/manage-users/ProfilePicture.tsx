import axios from 'axios';
import React, { useState } from 'react';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { ApiBaseUrl } from '../../utilities/ApiBaseUrl';

const ProfilePicture = ({ profileImage }: { profileImage: string; }) => {
    return (
        <>
            <div className="image overflow-hidden">
                <div className="py-3 center mx-auto">
                    <div className="bg-white px-4 py-5 rounded-lg text-center w-48">
                        <div className="mb-0">
                            {/* <img
                                className="shadow-lg w-auto mx-auto rounded-full object-cover object-center"
                                src={`${ApiBaseUrl}/profile-pic/${profileImage}`}
                                alt="Avatar Upload"
                            /> */}
                            <div className="avatar">
                                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={`${ApiBaseUrl}/profile-pic/${profileImage}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePicture;