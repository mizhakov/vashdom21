"use client";
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import WorkExamplesSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

import HouseCalculatorModal from '@/components/HouseCalculatorModal';
import CatalogRequestModal from '@/components/CatalogRequestModal';
import ExcursionModal from '@/components/ExcursionModal';
import FadeInSection from '@/components/FadeInSection';
import Preloader from '@/components/Preloader';

export default function Home() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isExcursionModalOpen, setIsExcursionModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hidePreloader, setHidePreloader] = useState(false);
  
  // Form states
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setHidePreloader(true), 600); // для плавного исчезновения
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11) return false;
    if (!(digits.startsWith('7') || digits.startsWith('8'))) return false;
    if (/^(7|8)0{10}$/.test(digits)) return false;
    return true;
  };

  const validateName = (value: string) => {
    return /^[А-Яа-яA-Za-zЁё\s\-]{2,}$/.test(value.trim());
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateName(name)) {
      setError('Пожалуйста, укажите корректное имя (только буквы, не менее 2 символов)');
      return;
    }
    
    if (!validatePhone(phone)) {
      setError('Пожалуйста, укажите корректный российский номер телефона');
      return;
    }
    
    // Просто открываем калькулятор без отправки
    setIsCalculatorOpen(true);
  };

  return (
    <main className="min-h-screen">
      {!hidePreloader && (
        <div className={`fixed inset-0 z-[9999] transition-opacity duration-500 ${isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <Preloader />
        </div>
      )}
      <Header />
      <HouseCalculatorModal 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
        userName={name}
        userPhone={phone}
      />
      <CatalogRequestModal isOpen={isCatalogModalOpen} onClose={() => setIsCatalogModalOpen(false)} />
      <ExcursionModal isOpen={isExcursionModalOpen} onClose={() => setIsExcursionModalOpen(false)} />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen pt-16 sm:pt-20 pb-12 sm:pb-16 flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/stanica.png')"
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Content */}
                         <FadeInSection as="div" className="flex-1 text-white text-center lg:text-left" delay={0.2}>
              
              {/* Блок с локацией */}
              <div className="mb-6 sm:mb-8 text-center lg:text-left">
                <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2.5 border border-white/30">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white text-sm font-medium leading-none">В республике Чувашия</span>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                 СТРОИТЕЛЬСТВО КАМЕННЫХ<br />
                 И КАРКАСНЫХ ДОМОВ<br />
                 С ФИКСАЦИЕЙ ЦЕНЫ
               </h1>
               
               <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12">
                 Построим технологичный дом за 90 дней
               </p>
               
               {/* Stats Section */}
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg">
                   <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">+100</div>
                   <div className="text-white/80 text-xs sm:text-sm font-medium">Реализованных объектов</div>
                 </div>
                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg">
                   <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">5</div>
                   <div className="text-white/80 text-xs sm:text-sm font-medium">Лет гарантии</div>
                 </div>
                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg">
                   <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">90%</div>
                   <div className="text-white/80 text-xs sm:text-sm font-medium">Клиентов рекомендуют нас</div>
                 </div>
               </div>
            </FadeInSection>
            
            {/* Right Form */}
            <FadeInSection as="div" className="w-full max-w-md lg:w-96" delay={0.4}>
              <div className="group relative p-4 sm:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 shadow-2xl">
                {/* Фон */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-4 sm:mb-6 text-center">
                    Получите расчет стоимости
                  </h3>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                    <input
                      type="tel"
                      placeholder="Ваш телефон"
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                        setPhone(val);
                      }}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
                    />
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
                    />
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 sm:py-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-base sm:text-lg font-semibold flex items-center justify-center group hover:scale-105 shadow-lg"
                    >
                      Обсудить проект
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                    
                    {error && (
                      <div className="bg-red-500/20 border border-red-500/30 text-red-300 text-center py-2 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm backdrop-blur-sm">
                        {error}
                      </div>
                    )}
                  </form>
                  
                  <p className="text-xs text-gray-400 mt-3 sm:mt-4 text-center">
                    Нажимая кнопку &quot;Обсудить проект&quot;, вы соглашаетесь с{' '}
                    <a href="#" className="underline hover:text-blue-400 transition-colors duration-300">
                      Политикой конфиденциальности
                    </a>
                  </p>
                </div>

                {/* Декоративный элемент */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>



      <AboutSection />
      <ProjectsSection onCatalogClick={() => setIsCatalogModalOpen(true)} />
      <WhyChooseUsSection />
      <WorkExamplesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
