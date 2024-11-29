// src/components/OrderCard.tsx
import React from 'react';
import { Card } from '@mui/material';
import { Order } from '../interfaces/order';

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <Card className="p-4 mb-2">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p><strong>ID:</strong> {order.id}</p>
          <p><strong>Description:</strong> {order.description}</p>
          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
        </div>
        <div>
          <p><strong>Date:</strong> {new Date(order.dateOrder).toLocaleString()}</p>
          <p><strong>State:</strong> {order.state}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-2 border-t">
        <h4 className="font-bold mb-2">Customer Details</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p><strong>Name:</strong> {order.customer.name}</p>
            <p><strong>Phone:</strong> {order.customer.phone}</p>
          </div>
          <div>
            <p><strong>Address:</strong> {order.customer.address}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;