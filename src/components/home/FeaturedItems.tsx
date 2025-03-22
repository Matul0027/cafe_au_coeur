
import React, { useRef, useEffect } from 'react';
import { useMenu } from '@/context/MenuContext';
import { useCart } from '@/context/CartContext';
import { ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedButton from '@/components/ui/AnimatedButton';

const FeaturedItems = () => {
  const { getFeaturedItems } = useMenu();
  const { addToCart } = useCart();
  const featuredItems = getFeaturedItems();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-enter');
          }
        });
      },
      { threshold: 0.1 }
    );

    const itemElements = document.querySelectorAll('.menu-item');
    itemElements.forEach((el) => observer.observe(el));

    return () => {
      itemElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-cafe-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-cafe-charcoal">
            Nos Spécialités
          </h2>
          <p className="text-cafe-brown max-w-2xl mx-auto text-lg">
            Découvrez nos créations les plus populaires, préparées avec soin et passion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="menu-item bg-white rounded-lg shadow-card overflow-hidden transform opacity-0 transition-all duration-500"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <button 
                  onClick={() => addToCart(item)}
                  className="absolute bottom-4 right-4 bg-cafe-gold text-white p-2 rounded-full shadow-md hover:bg-cafe-brown transition-colors duration-300"
                  aria-label={`Add ${item.name} to cart`}
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-medium text-cafe-charcoal">{item.name}</h3>
                  <span className="font-medium text-cafe-gold">{item.price.toFixed(2)}€</span>
                </div>
                <p className="text-gray-600 mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm px-3 py-1 bg-cafe-cream text-cafe-brown rounded-full">
                    {(() => {
                      const category = item.category;
                      switch(category) {
                        case 'coffee': return 'Café';
                        case 'pastries': return 'Pâtisserie';
                        case 'breakfast': return 'Petit Déj';
                        case 'lunch': return 'Déjeuner';
                        default: return category;
                      }
                    })()}
                  </span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="text-cafe-brown font-medium text-sm hover:text-cafe-gold transition-colors"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/menu">
            <AnimatedButton
              variant="outline"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Voir Tout Le Menu
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
