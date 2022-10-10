export interface FormPropsType {
    title: string;
    nameField?: boolean;
    forgotPassword?: boolean;
    dontHaveAccount: {
        path: string;
        label: string;
    };
}