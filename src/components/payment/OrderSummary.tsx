
import React from 'react';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/lib/types';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { SERVICE_FEE } from '@/lib/constants';

interface OrderSummaryProps {
  onPayment: () => void;
  isProcessing: boolean;
  selectedPayment: string;
}

const OrderSummary = ({ onPayment, isProcessing, selectedPayment }: OrderSummaryProps) => {
  const { items, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const serviceFee = SERVICE_FEE;
  const total = totalPrice + serviceFee;
  
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-serif font-medium text-cafe-charcoal mb-4">
          Order Summary
        </h2>
        
        <div className="space-y-3 mb-6">
          {items.map((item: CartItem) => (
            <div key={item.menuItem.id} className="flex justify-between">
              <span className="text-gray-600">
                {item.quantity} × {item.menuItem.name}
              </span>
              <span className="font-medium">
                ₹{(item.menuItem.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        
        <div className="h-px bg-gray-200 my-4"></div>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Service fee</span>
            <span className="font-medium">₹{serviceFee.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="h-px bg-gray-200 my-4"></div>
        
        <div className="flex justify-between mb-6">
          <span className="text-lg font-medium text-cafe-charcoal">Total</span>
          <span className="text-lg font-medium text-cafe-gold">₹{total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="p-6 bg-gray-50">
        <AnimatedButton
          variant="primary"
          className="w-full"
          onClick={onPayment}
          disabled={isProcessing || !selectedPayment}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </AnimatedButton>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          By clicking "Pay Now", you agree to our terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
