import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateOrder from 'src/components/CreateOrder';
import OrderList from 'src/components/OrderList';


function App() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Restaurant Order Management</h1>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <OrderList />
        <CreateOrder />
      </div>
    </div>
  );
}

export default App;
