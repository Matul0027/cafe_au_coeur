
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Banknote, Smartphone, Check } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { PAYMENT_METHODS } from '@/lib/constants';
import { toast } from '@/components/ui/sonner';

const PaymentPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  const totalPrice = getTotalPrice();
  const serviceFee = 1.50;
  const total = totalPrice + serviceFee;
  
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
  
  const handlePayment = () => {
    if (!selectedPayment) {
      toast.error("Veuillez sélectionner un mode de paiement");
      return;
    }
    
    setOrderProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setOrderProcessing(false);
      setOrderSuccess(true);
      
      // Clear cart and redirect after success
      setTimeout(() => {
        clearCart();
        navigate('/');
        toast.success("Votre commande a été passée avec succès!");
      }, 2000);
    }, 2000);
  };
  
  if (orderSuccess) {
    return (
      <div className="min-h-screen pt-16 pb-20 bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-card max-w-md w-full animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-serif font-semibold text-cafe-charcoal mb-4">
            Commande confirmée!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Votre commande a été traitée avec succès. Vous recevrez une confirmation par email.
          </p>
          
          <p className="text-cafe-gold font-medium mb-6">
            Merci d'avoir choisi Café au Coéur!
          </p>
          
          <AnimatedButton
            variant="primary"
            className="w-full"
            onClick={() => navigate('/')}
          >
            Retour à l'Accueil
          </AnimatedButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate('/cart')}
              className="text-cafe-brown font-medium flex items-center hover:text-cafe-gold transition-colors mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Retour au panier
            </button>
            
            <h1 className="text-3xl font-serif font-semibold text-cafe-charcoal">
              Paiement
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
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
              
              {selectedPayment.includes('card') && (
                <div className="bg-white rounded-lg shadow-card overflow-hidden p-6 animate-fade-in">
                  <h2 className="text-xl font-serif font-medium text-cafe-charcoal mb-6">
                    Détails de la Carte
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                        Numéro de Carte
                      </label>
                      <input
                        type="text"
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                          Date d'Expiration
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom sur la Carte
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-card overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-serif font-medium text-cafe-charcoal mb-4">
                    Résumé de la Commande
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.menuItem.id} className="flex justify-between">
                        <span className="text-gray-600">
                          {item.quantity} × {item.menuItem.name}
                        </span>
                        <span className="font-medium">
                          {(item.menuItem.price * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="h-px bg-gray-200 my-4"></div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sous-total</span>
                      <span className="font-medium">{totalPrice.toFixed(2)}€</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frais de service</span>
                      <span className="font-medium">{serviceFee.toFixed(2)}€</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-gray-200 my-4"></div>
                  
                  <div className="flex justify-between mb-6">
                    <span className="text-lg font-medium text-cafe-charcoal">Total</span>
                    <span className="text-lg font-medium text-cafe-gold">{total.toFixed(2)}€</span>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50">
                  <AnimatedButton
                    variant="primary"
                    className="w-full"
                    onClick={handlePayment}
                    disabled={orderProcessing || !selectedPayment}
                  >
                    {orderProcessing ? 'Traitement...' : 'Payer Maintenant'}
                  </AnimatedButton>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    En cliquant sur "Payer Maintenant", vous acceptez nos conditions générales de vente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
