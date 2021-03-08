export interface Order {
  _id: string;

    name: string;
    email: string;
    adress: any;
    city: string;
    state: string;
    zipCode: string;

 
    shipping: string;
    payment: string;
    total: string;
    status?: string;
    date?: Date;
 
  products: [{
    product: string;
    quantity: number;
  }];
  orderNotes: string;
  orderNumber: number;
}
