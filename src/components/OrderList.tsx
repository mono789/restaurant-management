import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Input, Button } from '@mui/material';
import { OrderService } from '../services/orderService';
import { Order } from '../interfaces/order';
import OrderCard from './OrderCard';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchId, setSearchId] = useState<string>('');
  const [filteredOrder, setFilteredOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await OrderService.getOrders();
        setOrders(fetchedOrders);
        setError(null);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleSearch = async () => {
    const id = parseInt(searchId);
    if (!isNaN(id)) {
      try {
        const order = await OrderService.getOrderById(id);
        setFilteredOrder(order);
      } catch (err) {
        console.error('Error searching order:', err);
        setFilteredOrder(null);
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading orders...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Card for Search Form */}
      <div className="mb-6">
        <Card className="shadow-lg p-4 rounded-lg bg-white">
          <CardHeader title="Order List" />
          <CardContent>
            <div className="flex items-center space-x-4">
              <Input
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Search by order ID"
                className="flex-1 border p-2 rounded-lg border-gray-300"
              />
              <Button
                onClick={handleSearch}
                variant="contained"
                color="primary"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtered Order */}
      {filteredOrder && (
        <div className="mb-6">
          <Card className="shadow-lg p-4 rounded-lg bg-white">
            <CardHeader title="Filtered Order" />
            <CardContent>
              <OrderCard order={filteredOrder} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* All Orders */}
      <div>
        <Card className="shadow-lg p-4 rounded-lg bg-white">
          <CardHeader title="All Orders" />
          <CardContent>
            {orders.length === 0 ? (
              <div>No orders found</div>
            ) : (
              orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderList;
