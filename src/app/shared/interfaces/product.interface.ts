import { ICategoryResponse } from "./category.interface";

export interface IProductRequest {
    category: ICategoryResponse;
    title: string;
    path: string;
    desc: string;
    price: number;
    weight: string;
    imgPath: string;
    count: number;
}

export interface IProductResponse extends IProductRequest {
    id: number | string;
}