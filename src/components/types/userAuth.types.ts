export interface FormPropsType {
    title: string;
    nameField?: boolean;
    forgotPassword?: boolean;
    doesHaveAccount: {
        path: string;
        label: string;
    };
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}