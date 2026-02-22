'use client';

import Image from 'next/image';
import { useState } from 'react';
import FadeInSection from './FadeInSection';
import CallbackModal from './CallbackModal';
import { Droplets, Zap, Thermometer, Wrench, Drill, Shield, Home, Cable } from 'lucide-react';

const workExamples = [
  {
    id: 1,
    title: 'Дом из керамзитобетона',
    description: 'Московская область, г. Люберцы, дом из керамзит бетона',
    image: '/images/dom1.jpeg',
    area: '100 кв.м',
    material: 'Керамзитобетон',
  },
  {
    id: 2,
    title: 'Дом из пенобетонных блоков',
    description: 'г. Чебоксары, Альгешево, дом 75 м2 из пенобетонных блоков',
    image: '/images/dom2.jpg',
    area: '75 кв.м',
    material: 'Пенобетонные блоки',
  },
  {
    id: 3,
    title: 'Кирпичный дом',
    description: 'г. Чебоксары, ул. Гражданская, дом 120 м2 из кирпича',
    image: '/images/dom3.jpg',
    area: '120 кв.м',
    material: 'Кирпич',
  },
  {
    id: 4,
    title: 'Дом из керамзитбетонных блоков',
    description: 'пос. Кугеси, дом 175 м2 из керамзитбетонных блоков',
    image: '/images/dom4.jpg',
    area: '175 кв.м',
    material: 'Керамзитбетонные блоки',
  },
  {
    id: 5,
    title: 'Дом из керамзитбетонных блоков',
    description: 'г. Чебоксары, ул. Лунная, дом 110 м2 из керамзитбетонных блоков',
    image: '/images/dom5.jpg',
    area: '110 кв.м',
    material: 'Керамзитбетонные блоки',
  },
  {
    id: 6,
    title: '2х этажный каркасный дом',
    description: 'г. Чебоксары, Южный поселок, 2х этажный каркасный дом',
    image: '/images/dom6.jpeg',
    area: '110 кв.м',
    material: 'Каркасная технология',
  },
  {
    id: 7,
    title: 'Монтаж фундамента',
    description: 'г. Чебоксары, мкр Садовый, монтаж фундамента многоквартирного дома',
    image: '/images/dom11.jpeg',
    area: '-',
    material: 'Фундаментные работы',
  },
  {
    id: 8,
    title: 'Монтаж систем отопления',
    description: 'Город Чебоксары, пр. Г.Айги, д. 15-1, монтаж систем отопления',
    image: '/images/dom22.jpeg',
    area: '-',
    material: 'Отопительные системы',
  },
  {
    id: 9,
    title: 'Деревянный каркасный дом',
    description: 'Г.Чебоксары п. Альгешево, 100 м2',
    image: '/images/dom33.jpg',
    area: '100 кв.м',
    material: 'Каркасная технология',
  },
  {
    id: 10,
    title: 'Деревянный каркасный дом',
    description: 'г. Мариинский Посад, 80 м2',
    image: '/images/dom44.jpg',
    area: '80 кв.м',
    material: 'Каркасная технология',
  },
  {
    id: 11,
    title: 'Деревянный каркасный дом',
    description: 'г. Цивильск, 80 м2',
    image: '/images/dom55.jpg',
    area: '80 кв.м',
    material: 'Каркасная технология',
  },
  {
    id: 12,
    title: 'Деревянный каркасный дом',
    description: 'с. Комсомольское, 78 м2',
    image: '/images/dom66.jpg',
    area: '78 кв.м',
    material: 'Каркасная технология',
  },
  {
    id: 13,
    title: 'Деревянный каркасный дом',
    description: 'Сосновка, 92 м2',
    image: '/images/dom77.jpg',
    area: '92 кв.м',
    material: 'Каркасная технология',
  },
  {
    id: 14,
    title: 'Деревянный каркасный дом',
    description: 'пос. Кугеси 110 м2',
    image: '/images/dom88.webp',
    area: '110 кв.м',
    material: 'Каркасная технология',
  },
  {
    id: 15,
    title: 'Дом из керамзитбетонных блоков',
    description: 'пос. Кугеси, дом 78 м2 из керамзитбетонных блоков',
    image: '/images/dom99.jpg',
    area: '78 кв.м',
    material: 'Керамзитбетонные блоки',
  },
];

const additionalServices = [
  {
    id: 1,
    icon: Droplets,
    title: 'Монтаж водоснабжения',
    description: 'Проектирование и установка систем водоснабжения с использованием качественных материалов',
    features: ['Холодное и горячее водоснабжение', 'Установка счетчиков', 'Гарантия на работы'],
    image: '/images/voda.jpeg'
  },
  {
    id: 2,
    icon: Wrench,
    title: 'Монтаж канализации',
    description: 'Полный комплекс работ по устройству канализационных систем',
    features: ['Внутренняя канализация', 'Наружные сети', 'Септики и очистные сооружения'],
    image: '/images/kanal.jpg'
  },
  {
    id: 3,
    icon: Zap,
    title: 'Монтаж электрики',
    description: 'Электромонтажные работы любой сложности с соблюдением всех норм безопасности',
    features: ['Внутренняя проводка', 'Электрощиты', 'Освещение и розетки'],
    image: '/images/electro.jpg'
  },
  {
    id: 4,
    icon: Thermometer,
    title: 'Монтаж отопления',
    description: 'Установка современных систем отопления для комфортного проживания',
    features: ['Радиаторное отопление', 'Теплые полы', 'Котельное оборудование'],
    image: '/images/otop.jpg'
  },
  {
    id: 5,
    icon: Drill,
    title: 'Бурение технологических отверстий',
    description: 'в стене, фундаменте, перекрытии',
    features: ['Отверстия под вентиляцию и клапаны', 'Сверление в фундаменте под отдушины и сети', 'Отверстия под отопление, канализацию и воду'],
    image: '/images/drilling.jpg'
  },
  {
    id: 6,
    icon: Shield,
    title: 'Гидроизоляция и теплоизоляция',
    description: 'Комплексная защита конструкций',
    features: ['Ванные, санузлы и фундаменты', 'Теплоизоляция труб и фасадов', 'Паро- и звукоизоляция перегородок'],
    image: '/images/insulation.jpg'
  },
  {
    id: 7,
    icon: Home,
    title: 'Умный дом и инженерная автоматика',
    description: 'Современные технологии управления домом',
    features: ['Датчики и термостаты, удалённый доступ', 'Реле и сценарии, интеграция с щитами', 'Настройка уведомлений и журналов'],
    image: '/images/smart-home.jpg'
  },
  {
    id: 8,
    icon: Cable,
    title: 'Слаботочные системы',
    description: 'Современные системы связи и безопасности',
    features: ['Видеонаблюдение, домофоны, СКУД, интернет', 'Слаботочные щиты и стояки, СКС', 'Аудио/видеокабели и коммутация'],
    image: '/images/low-current.jpg'
  },
];

const WorkExamplesSection = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-tl from-indigo-50 via-white to-blue-50 overflow-hidden">
      {/* Технический фон */}
      <div className="absolute inset-0 opacity-25">
        {/* Инструменты стилизованные */}
        <div className="absolute top-12 left-12 w-4 sm:w-6 h-4 sm:h-6 border-2 border-blue-400 transform rotate-45 opacity-30"></div>
        <div className="absolute top-1/4 right-16 w-6 sm:w-8 h-1 sm:h-2 bg-indigo-400 rounded opacity-35"></div>
        <div className="absolute bottom-20 left-1/5 w-1 sm:w-2 h-6 sm:h-8 bg-cyan-400 rounded opacity-40"></div>
        
        {/* Гайки и болты */}
        <div className="absolute top-1/3 left-1/3 w-3 sm:w-4 h-3 sm:h-4 border border-blue-500 rounded-full opacity-25"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 sm:w-3 h-2 sm:h-3 bg-indigo-500 rounded-sm opacity-30"></div>
        
        {/* Технические линии */}
        <div className="absolute top-0 left-1/4 w-px h-1/2 bg-gradient-to-b from-blue-300 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 right-1/3 w-px h-1/3 bg-gradient-to-t from-indigo-300 to-transparent opacity-25"></div>
        <div className="absolute top-1/3 left-0 w-1/3 h-px bg-gradient-to-r from-cyan-300 to-transparent opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Заголовок секции */}
        <FadeInSection as="div" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent mb-4">
            Примеры работ
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>

        <FadeInSection as="p" className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto" delay={0.2}>
          Реальные проекты, которые мы успешно реализовали для наших клиентов
        </FadeInSection>

        {/* Карточки примеров работ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {workExamples.map((example, index) => (
            <FadeInSection 
              key={example.id} 
              as="div" 
              className="group relative rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden"
              delay={0.3 + (index * 0.1)}
            >
              {/* Фон */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Изображение */}
                <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-t-2xl">
                  <Image
                    src={example.image}
                    alt={example.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={true}
                  />
                  {/* Градиент поверх изображения */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                  
                  {/* Бейдж с материалом */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium">
                    {example.material}
                  </div>
                </div>
                
                {/* Контент */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-all duration-300">
                    {example.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 sm:mb-4 leading-relaxed">
                    {example.description}
                  </p>
                  
                  {/* Характеристики */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-500 text-xs sm:text-sm">Площадь:</span>
                      <span className="text-gray-800 text-xs sm:text-sm font-medium">{example.area}</span>
                    </div>
                    <div className="px-2 sm:px-3 py-1 bg-green-100 rounded-full text-green-600 text-xs font-medium">
                      Завершен
                    </div>
                  </div>
                </div>
              </div>

              {/* Декоративный элемент */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            </FadeInSection>
          ))}
        </div>

        {/* Дополнительные услуги */}
        <div id="additional-services">
        <FadeInSection as="div" className="mb-16" delay={0.8}>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent mb-4">
              Дополнительные услуги
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {additionalServices.map((service, index) => (
              <FadeInSection 
                key={service.id} 
                as="div" 
                className="group relative rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden"
                delay={0.9 + (index * 0.1)}
              >
                {/* Фон */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Изображение */}
                  <div className="relative h-32 sm:h-40 w-full overflow-hidden rounded-t-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      unoptimized={true}
                    />
                    {/* Градиент поверх изображения */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                    
                    {/* Иконка поверх изображения */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Контент */}
                  <div className="p-4 sm:p-6 text-center">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h4>
                    
                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2 sm:space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-gray-500">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 sm:mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Декоративный элемент */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              </FadeInSection>
            ))}
          </div>
        </FadeInSection>
        </div>

        {/* Призыв к действию */}
        <FadeInSection as="div" delay={1.2} className="text-center mt-16">
          <button
            onClick={() => setIsCallbackModalOpen(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-300 backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer hover:from-blue-500/30 hover:to-purple-500/30"
          >
            <span className="text-gray-800 font-medium">Помощь в подборе земельного участка, юридическое сопровождение</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </button>
        </FadeInSection>
      </div>

      {/* Модальное окно */}
      <CallbackModal 
        isOpen={isCallbackModalOpen} 
        onClose={() => setIsCallbackModalOpen(false)} 
      />
    </section>
  );
};

export default WorkExamplesSection; 