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
                        <div className="mb-4">
                            <img
                                className="shadow-lg w-auto mx-auto rounded-full object-cover object-center"
                                src={`${ApiBaseUrl}/profile-pic/${profileImage}`}
                                alt="Avatar Upload"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePicture;