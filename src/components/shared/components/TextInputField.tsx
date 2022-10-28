import React from 'react';

export type TextInputType = {
    label?: string
    name?: string;
    type?: string;
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    rest?: any;
}
const TextInputField = ({ label, name, type, placeholder, className, onChange, value, rest }: TextInputType) => {
    return (
        <div>
            <div className="form-control justify-around">
                {label &&
                    <label className="label">
                        <span className="label-text">{label}</span>
                    </label>
                }
                <input
                    {...rest}
                    onChange={onChange}
                    value={value}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className={`input input-bordered ${className}`}
                />
            </div>
        </div>
    );
};

export default TextInputField;