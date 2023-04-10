export interface ICategoryRequest {
    title: string;
    path: string;
    imgPath: string;
}

export interface ICategoryResponse extends ICategoryRequest {
    id: number | string;
}