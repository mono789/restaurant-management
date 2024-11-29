// src/interfaces/order.ts
export interface Customer {
    id?: number;
    name: string;
    phone: string;
    address: string;
    orders?: Order[];
  }
  
  export interface Order {
    id?: number;
    description: string;
    total: number;
    dateOrder: string;
    state: 'Pending' | 'Preparing' | 'Delivered' | 'Cancelled';
    customer: Customer;
  }