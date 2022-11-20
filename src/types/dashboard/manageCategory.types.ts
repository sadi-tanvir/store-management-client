export type ManageCategoryType = {
    _id: string;
    name: string;
    description: string;
}

export type UpdateCategoryModalPropsType = {
    modalId: string;
    header: string;
    currentCategory: ManageCategoryType;
}

export type CategoryModalPropsType = {
    modalId: string;
    category: ManageCategoryType;
}