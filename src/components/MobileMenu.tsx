'use client';

import Link from 'next/link';
import { X, Phone } from 'lucide-react';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCallbackClick?: () => void;
}

const MobileMenu = ({ isOpen, onClose, onCallbackClick }: MobileMenuProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 animate-fadeIn">
      <div className="container mx-auto px-4 py-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center space-x-3">
                         <div className="bg-blue-600 p-2 rounded">
               <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M2 12L12 2L22 12V22H16V16H8V22H2V12Z"/>
               </svg>
             </div>
            <div className="text-white">
              <div className="text-xl font-bold">Ваш Дом</div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Закрыть меню"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col space-y-6">
          <Link 
            href="#additional-services" 
            className="text-xl text-white hover:text-blue-400 transition-colors py-2"
            onClick={onClose}
          >
            Услуги
          </Link>
          <Link 
            href="#about" 
            className="text-xl text-white hover:text-blue-400 transition-colors py-2"
            onClick={onClose}
          >
            О нас
          </Link>
          <Link 
            href="#projects" 
            className="text-xl text-white hover:text-blue-400 transition-colors py-2"
            onClick={onClose}
          >
            Каталог домов
          </Link>
          <Link 
            href="#additional-services" 
            className="text-xl text-white hover:text-blue-400 transition-colors py-2"
            onClick={onClose}
          >
            Доп услуги
          </Link>
          <Link 
            href="#contacts" 
            className="text-xl text-white hover:text-blue-400 transition-colors py-2"
            onClick={onClose}
          >
            Контакты
          </Link>
        </nav>

        <div className="mt-auto pb-8">
          <div className="space-y-2 mb-4">
          <a 
              href="tel:+79530132423" 
              className="flex items-center text-white hover:text-blue-400 transition-colors group"
          >
            <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold">+7 953 013 24 23</span>
            </a>
            <a 
              href="tel:+79264112280" 
              className="flex items-center text-white hover:text-blue-400 transition-colors group ml-7"
            >
              <span className="text-lg font-semibold">+7 926 411 22 80</span>
          </a>
          </div>
          <div className="text-sm text-gray-300 mb-4">Пн - Вс с 8:00 до 20:00</div>
          <div className="mb-6">
            <a 
              href="mailto:Vashdom121@mail.ru" 
              className="flex items-center text-white hover:text-blue-400 transition-colors group"
            >
              <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Vashdom121@mail.ru</span>
            </a>
          </div>
          <button 
            onClick={() => {
              onCallbackClick?.();
              onClose();
            }}
            className="w-full bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors hover:shadow-lg font-semibold"
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu; 