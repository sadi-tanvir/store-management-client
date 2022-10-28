import axios from 'axios';
import React, { useState } from 'react';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { ApiBaseUrl } from '../../utilities/ApiBaseUrl';

const ProfilePicture = ({ refetch, profileImage }: { refetch: any; profileImage: any; }) => {
    // redux
    const { accessToken } = useAppSelector(state => state.authReducer);

    const handleImageUpload = async (event: any) => {
        const formData = new FormData()
        formData.append('profile_photo', event.target.files[0])

        const res = await axios.put(`${ApiBaseUrl}/api/user/profile-pic-upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: accessToken
            }
        })

        if (res.data.status) {
            refetch()
        }
    }



    return (
        <>
            <div className="image overflow-hidden">
                <div className="py-3 center mx-auto">
                    <div className="bg-white px-4 py-5 rounded-lg text-center w-48">
                        <div className="mb-4">
                            {/* <img
                                className="shadow-lg w-auto mx-auto rounded-lg object-cover object-center"
                                src={`${ApiBaseUrl}/profile-pic/${profileImage}`}
                                alt="Avatar Upload"
                            /> */}
                            <div className="avatar">
                                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={`${ApiBaseUrl}/profile-pic/${profileImage}`} />
                                </div>
                            </div>
                        </div>
                        <label className="cursor-pointer mt-6">
                            <span className="mt-2 text-base leading-normal px-4 py-2 bg-primary text-white text-sm rounded-full" >Upload Profile</span>
                            <input
                                onChange={handleImageUpload}
                                type='file'
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePicture;