
import React from 'react';
import { CreditCard, Banknote, Smartphone } from 'lucide-react';
import { PAYMENT_METHODS } from '@/lib/constants';

interface PaymentMethodsProps {
  selectedPayment: string;
  setSelectedPayment: (id: string) => void;
}

const PaymentMethods = ({ selectedPayment, setSelectedPayment }: PaymentMethodsProps) => {
  const getPaymentIcon = (icon: string) => {
    switch (icon) {
      case 'credit-card':
        return <CreditCard className="w-5 h-5" />;
      case 'banknote':
        return <Banknote className="w-5 h-5" />;
      case 'smartphone':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden p-6 mb-8">
      <h2 className="text-xl font-serif font-medium text-cafe-charcoal mb-6">
        Méthodes de Paiement
      </h2>
      
      <div className="space-y-4">
        {PAYMENT_METHODS.map((method) => (
          <div 
            key={method.id}
            onClick={() => setSelectedPayment(method.id)}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
              selectedPayment === method.id 
                ? 'border-cafe-gold bg-cafe-cream/30' 
                : 'border-gray-200 hover:border-cafe-brown/30'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
              selectedPayment === method.id 
                ? 'bg-cafe-gold text-white' 
                : 'bg-gray-100 text-gray-500'
            }`}>
              {getPaymentIcon(method.icon)}
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-cafe-charcoal">{method.name}</h3>
              <p className="text-sm text-gray-500">
                {method.type === 'card' 
                  ? 'Paiement sécurisé par carte' 
                  : method.type === 'cash' 
                    ? 'Payer à la livraison' 
                    : 'Paiement via application mobile'}
              </p>
            </div>
            
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedPayment === method.id 
                ? 'border-cafe-gold' 
                : 'border-gray-300'
            }`}>
              {selectedPayment === method.id && (
                <div className="w-3 h-3 rounded-full bg-cafe-gold"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
