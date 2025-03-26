
import React from 'react';
import { useCart } from '@/context/CartContext';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { SERVICE_FEE } from '@/lib/constants';
import { DeliveryAddress } from '../delivery/DeliveryModule';

interface OrderSummaryProps {
  onPayment: () => void;
  isProcessing: boolean;
  selectedPayment: string;
  deliveryFee: number;
  deliveryOption: 'delivery' | 'pickup';
  deliveryAddress: DeliveryAddress | null;
}

const OrderSummary = ({
  onPayment,
  isProcessing,
  selectedPayment,
  deliveryFee,
  deliveryOption,
  deliveryAddress
}: OrderSummaryProps) => {
  const { cartItems, getTotalPrice } = useCart();
  
  const subtotal = getTotalPrice();
  const serviceFee = SERVICE_FEE;
  const total = subtotal + serviceFee + deliveryFee;
  
  const isPaymentDisabled = !selectedPayment || !deliveryAddress || isProcessing;
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6 sticky top-20">
      <h2 className="text-xl font-serif font-medium text-cafe-charcoal mb-6">
        Order Summary
      </h2>
      
      {cartItems.length > 0 ? (
        <>
          <div className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-sm text-gray-700">
                  {item.quantity}× {item.name}
                </span>
                <span className="text-sm font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-sm">₹{subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Service fee</span>
              <span className="text-sm">₹{serviceFee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                {deliveryOption === 'delivery' ? 'Delivery fee' : 'Pickup fee'}
              </span>
              <span className="text-sm">
                {deliveryFee > 0 ? `₹${deliveryFee.toFixed(2)}` : 'Free'}
              </span>
            </div>
            
            <div className="flex justify-between pt-3 border-t border-gray-200 mt-2">
              <span className="font-medium">Total</span>
              <span className="font-semibold text-cafe-gold">₹{total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <AnimatedButton
              variant="primary"
              className="w-full"
              onClick={onPayment}
              disabled={isPaymentDisabled}
            >
              {isProcessing ? 'Processing...' : 'Complete Payment'}
            </AnimatedButton>
            
            {!selectedPayment && (
              <p className="text-xs text-red-500 mt-2 text-center">
                Please select a payment method
              </p>
            )}
            
            {!deliveryAddress && (
              <p className="text-xs text-red-500 mt-2 text-center">
                Please provide delivery or pickup details
              </p>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      )}
    </div>
  );
};

export default OrderSummary;
