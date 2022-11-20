
const ProductButton = ({ children, label, modalId }: { children: any; label: string; modalId: string; }) => {
    return (
        <>
            <label htmlFor={modalId} className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-darkSecondary dark:border-gray-700 px-3 flex items-center py-2 cursor-pointer">
                <div>
                    {children}
                </div>
                <div className="ml-2">{label}</div>
            </label>
        </>
    );
};

export default ProductButton;