// src/services/orderService.ts
import { Order, Customer } from '../interfaces/order';
//import axios from 'axios';

// Base URL for backend API (to be replaced with actual backend endpoint)
const API_BASE_URL = 'http://localhost:8080/api/orders';
// const API_BASE_URL = 'https://your-production-backend.com/api/orders';

export const OrderService = {
  async getOrders(): Promise<Order[]> {
    try {
      // Uncomment for actual backend integration
      // const response = await axios.get(API_BASE_URL);
      // return response.data;

      // Temporary mock data
      return [
        {
          id: 1,
          description: 'Pizza Margherita',
          total: 15.99,
          dateOrder: new Date().toISOString(),
          state: 'Pending',
          customer: {
            name: 'John Doe',
            phone: '123-456-7890',
            address: '123 Main St'
          }
        },
        {
            id: 2,
            description: 'Pizza Margherita',
            total: 15.99,
            dateOrder: new Date().toISOString(),
            state: 'Pending',
            customer: {
              name: 'John Doe',
              phone: '123-456-7890',
              address: '123 Main St'
            }
          },
          {
            id: 3,
            description: 'Pizza Margherita',
            total: 15.99,
            dateOrder: new Date().toISOString(),
            state: 'Pending',
            customer: {
              name: 'John Doe',
              phone: '123-456-7890',
              address: '123 Main St'
            }
          }
      ];
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  async getOrderById(id: number): Promise<Order | null> {
    try {
      // Uncomment for actual backend integration
      // const response = await axios.get(`${API_BASE_URL}/${id}`);
      // return response.data;

      // Temporary mock data
      const orders = await this.getOrders();
      return orders.find(order => order.id === id) || null;
    } catch (error) {
      console.error(`Error fetching order with id ${id}:`, error);
      throw error;
    }
  },

  async createOrder(order: Order): Promise<Order> {
    try {
      // Uncomment for actual backend integration
      // const response = await axios.post(API_BASE_URL, order);
      // return response.data;

      // Temporary mock data
      console.log('Creating order:', order);
      return { ...order, id: Date.now() };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
};