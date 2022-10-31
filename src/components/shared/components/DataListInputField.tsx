import React from 'react';

export type TextInputType = {
    label?: string
    name?: string;
    type?: string;
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    dataListId: string;
    dataList?: { value: string; name?: string; }[];
    rest?: any;
}
const DataListInputField = ({ label, name, type, placeholder, className, onChange, value, rest, dataListId, dataList }: TextInputType) => {
    return (
        <>
            <div className="form-control justify-around w-full">
                {label &&
                    <label className="label">
                        <span className="label-text">{label}</span>
                    </label>
                }
                <input
                    list={dataListId}
                    {...rest}
                    onChange={onChange}
                    value={value}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className={`input input-bordered ${className}`}
                />
                <datalist id={dataListId}>
                    {dataList?.map((item: { name?: string; value: string; }, index: number) => (
                        <option key={index} value={item.value}>
                            {item.name}
                        </option>
                    ))}
                </datalist>
            </div>
        </>
    );
};

export default DataListInputField;