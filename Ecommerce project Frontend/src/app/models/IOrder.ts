import cart from './ICart';
export interface order {
  _id?: string;
  items: cart[];
  paymentType: string;
  address: any;
  date: Date;
  totalAmount: number;
  status?: string;
}
