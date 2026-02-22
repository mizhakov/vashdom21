'use client';

import Link from 'next/link';
import { Menu, Phone } from 'lucide-react';
import { useState } from 'react';
import CallbackModal from './CallbackModal';
import HouseCalculatorModal from './HouseCalculatorModal';
import MobileMenu from './MobileMenu';
import FadeInOnMount from './FadeInOnMount';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <>
      <FadeInOnMount as="header" className={`fixed w-full z-50 bg-gray-900/95 backdrop-blur-sm py-3 sm:py-4 shadow-lg`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 py-1">
              <div className="bg-blue-600 p-1.5 sm:p-2 rounded">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 12L12 2L22 12V22H16V16H8V22H2V12Z"/>
                </svg>
              </div>
              <div className="text-white">
                <div className="text-lg sm:text-xl font-bold">Ваш Дом</div>
              </div>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              <Link href="#about" className="text-white hover:text-blue-400 transition-colors font-medium">
                О нас
              </Link>
              <Link href="#projects" className="text-white hover:text-blue-400 transition-colors font-medium">
                Проекты
              </Link>
              <Link href="#additional-services" className="text-white hover:text-blue-400 transition-colors font-medium">
                Услуги
              </Link>
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="text-white hover:text-blue-400 transition-colors font-medium"
              >
                Калькулятор
              </button>
              <Link href="#contact" className="text-white hover:text-blue-400 transition-colors font-medium">
                Контакты
              </Link>
            </nav>
            
            {/* Contact Info & CTA */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-shrink-0">
              <div className="text-right">
                <div className="space-y-1">
                  <a 
                    href="tel:+79530132423" 
                    className="block text-white hover:text-blue-400 transition-colors group text-xs lg:text-sm font-semibold whitespace-nowrap"
                  >
                    +7 953 013 24 23
                  </a>
                  <a 
                    href="tel:+79264112280" 
                    className="block text-white hover:text-blue-400 transition-colors group text-xs lg:text-sm font-semibold whitespace-nowrap"
                  >
                    +7 926 411 22 80
                  </a>
                </div>
                <div className="text-xs text-gray-300 mt-1">Пн - Вс с 8:00 до 20:00</div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 lg:px-8 py-2.5 lg:py-3.5 rounded-lg font-bold text-sm lg:text-base flex-shrink-0 flex items-center space-x-2 group overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse hover:animate-none"
              >
                {/* Светящийся фон */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Анимированная граница */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-75 blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="absolute inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg"></div>
                
                {/* Контент кнопки */}
                <div className="relative z-10 flex items-center space-x-2">
                <Phone className="w-4 lg:w-5 h-4 lg:h-5 group-hover:animate-bounce" />
                  <span className="relative">
                    Оставить заявку
                    {/* Подчеркивание */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </div>
                
                {/* Блик */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>

            {/* Кнопка для мобильных устройств */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <div className="text-center">
                  <div>+7 953 013 24 23</div>
                  <div>+7 926 411 22 80</div>
                </div>
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-lg"
                aria-label="Открыть меню"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </FadeInOnMount>

      <CallbackModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onCallbackClick={() => setIsModalOpen(true)}
      />

      <HouseCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </>
  );
};

export default Header; 