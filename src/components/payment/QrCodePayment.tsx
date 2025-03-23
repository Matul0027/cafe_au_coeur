
import React from 'react';
import { UPI_DETAILS } from '@/lib/constants';
import { QrCode } from 'lucide-react';

interface QrCodePaymentProps {
  amount: number;
}

const QrCodePayment = ({ amount }: QrCodePaymentProps) => {
  return (
    <div className="bg-white rounded-lg shadow-card p-6 mb-8">
      <h2 className="text-xl font-serif font-medium text-cafe-charcoal mb-6">
        Scan QR Code
      </h2>
      
      <div className="flex flex-col items-center">
        <p className="text-cafe-charcoal mb-4">Scan this QR code with your UPI app to pay ₹{amount.toFixed(2)}</p>
        
        <div className="border border-gray-200 p-4 rounded-lg mb-4">
          <img 
            src={UPI_DETAILS.qrCodeImage} 
            alt="UPI QR Code" 
            className="max-w-full h-auto w-64 mx-auto"
          />
        </div>
        
        <p className="text-sm text-gray-500">
          After payment, please wait for confirmation.
        </p>
      </div>
    </div>
  );
};

export default QrCodePayment;
