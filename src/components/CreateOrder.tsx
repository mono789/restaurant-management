import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, SelectChangeEvent } from '@mui/material';
import { OrderService } from '../services/orderService';
import { Order } from '../interfaces/order';

const CreateOrder: React.FC = () => {
  const [order, setOrder] = useState<Order>({
    description: '',
    total: 0,
    dateOrder: new Date().toISOString(),
    state: 'Pending',
    customer: {
      name: '',
      phone: '',
      address: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validation function
  const validateOrder = (order: Order): boolean => {
    return !!(
      order.description.trim() && 
      order.total > 0 && 
      order.customer.name.trim() && 
      order.customer.phone.trim() && 
      order.customer.address.trim()
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate order data before submission
      if (!validateOrder(order)) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const createdOrder = await OrderService.createOrder(order);
      alert(`Order created successfully! Order ID: ${createdOrder.id}`);
      
      // Reset form
      setOrder({
        description: '',
        total: 0,
        dateOrder: new Date().toISOString(),
        state: 'Pending',
        customer: {
          name: '',
          phone: '',
          address: ''
        }
      });
    } catch (err) {
      console.error('Error creating order:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to create order. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for text and number inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('customer.')) {
      setOrder(prev => ({
        ...prev,
        customer: {
          ...prev.customer,
          [name.split('.')[1]]: value
        }
      }));
    } else {
      setOrder(prev => ({
        ...prev,
        [name]: name === 'total' ? parseFloat(value) : value
      }));
    }
  };

  // Handle change for select input
  const handleStateChange = (e: SelectChangeEvent<"Pending" | "Preparing" | "Delivered" | "Cancelled">) => {
    setOrder(prev => ({
      ...prev,
      state: e.target.value as "Pending" | "Preparing" | "Delivered" | "Cancelled"
    }));
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 600 }}>
      <CardHeader
        title="Create New Order"
        titleTypographyProps={{ variant: 'h5' }}
      />
      <CardContent>
        {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <TextField
              label="Description"
              name="description"
              value={order.description}
              onChange={handleInputChange}
              fullWidth
              required
              disabled={loading}
              margin="normal"
            />
          </div>
          <div>
            <TextField
              label="Total"
              type="number"
              name="total"
              value={order.total}
              onChange={handleInputChange}
              fullWidth
              required
              disabled={loading}
              margin="normal"
            />
          </div>
          <div>
            <FormControl fullWidth required margin="normal" disabled={loading}>
              <InputLabel>State</InputLabel>
              <Select
                name="state"
                value={order.state}
                onChange={handleStateChange}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Preparing">Preparing</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
              <FormHelperText>Order State</FormHelperText>
            </FormControl>
          </div>
          
          <div style={{ borderTop: '1px solid #ccc', paddingTop: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Customer Details
            </Typography>
            <div>
              <TextField
                label="Name"
                name="customer.name"
                value={order.customer.name}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={loading}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                label="Phone"
                name="customer.phone"
                value={order.customer.phone}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={loading}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                label="Address"
                name="customer.address"
                value={order.customer.address}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={loading}
                margin="normal"
              />
            </div>
          </div>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginTop: '16px' }}
          >
            {loading ? 'Creating Order...' : 'Create Order'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateOrder;