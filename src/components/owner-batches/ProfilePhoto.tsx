import React from 'react';

const ProfilePhoto = () => {
    return (
        <>
            <div className="avatar">
                <div className="w-24 md:w-20 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                    <img src="https://placeimg.com/192/192/people" />
                </div>
            </div>
        </>
    );
};

export default ProfilePhoto;