'use client';

import { Shield, FileText, Clock, Users } from 'lucide-react';
import FadeInSection from './FadeInSection';

const features = [
  {
    icon: Shield,
    title: 'Аккредитованный застройщик',
    description: 'Ведущими банками для оформления безопасной и выгодной сделки',
  },
  {
    icon: FileText,
    title: 'Открытые и честные сметы',
    description: 'Договор с фиксацией цены, стоимость не изменится на протяжении всего строительства',
  },
  {
    icon: Clock,
    title: 'Гарантия 5 лет',
    description: 'Гарантия качества дома',
  },
  {
    icon: Users,
    title: 'Профессиональная команда',
    description: 'Опытные специалисты с многолетним стажем в строительстве',
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-bl from-blue-50 via-white to-slate-50 overflow-hidden">
      {/* Минималистичный фон */}
      <div className="absolute inset-0 opacity-35">
        {/* Точки */}
        <div className="absolute top-20 left-20 w-2 sm:w-3 h-2 sm:h-3 bg-blue-500 rounded-full opacity-40"></div>
        <div className="absolute top-40 right-32 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-indigo-500 rounded-full opacity-50"></div>
        <div className="absolute bottom-32 left-1/4 w-3 sm:w-4 h-3 sm:h-4 bg-cyan-500 rounded-full opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-400 rounded-full opacity-45"></div>
        
        {/* Тонкие линии */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-25"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-20"></div>
        
        {/* Угловые элементы */}
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 border-t-2 border-r-2 border-blue-300 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-18 sm:w-24 h-18 sm:h-24 border-b-2 border-l-2 border-indigo-300 opacity-25"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Заголовок секции */}
        <FadeInSection as="div" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent mb-4">
            Почему выбирают нас?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>

        {/* Карточки преимуществ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <FadeInSection 
              key={index} 
              as="div" 
              className="group relative p-4 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              delay={0.2 * index}
            >
              {/* Фон */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <feature.icon className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600 mb-3 sm:mb-4 group-hover:text-blue-700 group-hover:scale-110 transition-all duration-300" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>

              {/* Декоративный элемент */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection; 