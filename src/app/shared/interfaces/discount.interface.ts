export interface IDiscountRequest {
    title: string;
    desc: string;
    imgPath: string;
}

export interface IDiscountResponse extends IDiscountRequest {
    id: number | string;
}