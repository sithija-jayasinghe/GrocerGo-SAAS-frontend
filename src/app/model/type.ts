export interface CustomerModel {
    id: string;
    title: string;
    name: string;
    dob: Object;
    salary: number;
    address: string;
    city: string;
    province: string;
    postalcode: string;
}

export interface ItemModel {
    code: string;
    description: string;
    packSize: string;
    unitPrice: number;
    qtyOnHand: number;
}
