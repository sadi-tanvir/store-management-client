import React, { ChangeEvent } from 'react';

export type SelectInputType = {
    label?: string
    name?: string;
    options?: string;
    className?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void | undefined;
}

const SelectInput = ({ label, name, options, className, value, onChange }: SelectInputType) => {
    return (
        <>
            <div className="form-control w-full">
                {label &&
                    <label className="label">
                        <span className="label-text">{label}</span>
                    </label>
                }
                <select onChange={onChange} value={value} name={name} className={`select select-bordered ${className}`}>
                    {
                        options?.split(" ").map((option, index) => <option value={option} key={index}>{option}</option>)
                    }
                </select>
            </div>
        </>
    );
};

export default SelectInput;