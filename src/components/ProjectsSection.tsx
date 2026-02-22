'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import FadeInSection from './FadeInSection';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ProjectsSectionProps = {
  onCatalogClick?: () => void;
};

const projects = [
  {
    id: 1,
    title: 'Гармония',
    description: 'Общая площадь 200 кв.м.',
    images: [
      { type: 'facade', src: '/images/garmony.png', alt: 'Фасад дома Гармония' },
      { type: 'plan', src: '/images/2.jpg', alt: 'Планировка 1 этажа' },
      { type: 'plan', src: '/images/3.jpg', alt: 'Планировка 2 этажа' }
    ],
    file: '/projects/garmony.pdf',
  },
  {
    id: 2,
    title: 'Горизонт',
    description: 'Общая площадь 360 кв.м.',
    images: [
      { type: 'facade', src: '/images/gorizont.png', alt: 'Фасад дома Горизонт' },
      { type: 'plan', src: '/images/22.jpg', alt: 'Планировка 1 этажа' },
      { type: 'plan', src: '/images/33.jpg', alt: 'Планировка 2 этажа' }
    ],
    file: '/projects/gorizont.pdf',
  },
  {
    id: 3,
    title: 'Европейский квартал',
    description: 'Общая площадь 120 кв.м.',
    images: [
      { type: 'facade', src: '/images/filimonov.png', alt: 'Фасад дома Европейский квартал' },
      { type: 'plan', src: '/images/333.jpg', alt: 'Планировка дома' }
    ],
    file: '/projects/filimonov.pdf',
  },
  {
    id: 4,
    title: 'Проект 12',
    description: 'Общая площадь 100 кв.м.',
    images: [
      { type: 'facade', src: '/images/moronchov.png', alt: 'Фасад дома Проект 12' },
      { type: 'plan', src: '/images/3333.jpg', alt: 'Планировка дома' }
    ],
    file: '/projects/moronchov.pdf',
  },
  {
    id: 5,
    title: 'Ранчо',
    description: 'Общая площадь 96 кв.м.',
    images: [
      { type: 'facade', src: '/images/rancho.png', alt: 'Фасад дома Ранчо' },
      { type: 'plan', src: '/images/111.jpg', alt: 'Планировка 1 этажа' },
      { type: 'plan', src: '/images/222.jpg', alt: 'Планировка 2 этажа' }
    ],
    file: '/projects/rancho.pdf',
  },
  {
    id: 6,
    title: 'Тихие Зори',
    description: 'Общая площадь 130 кв.м.',
    images: [
      { type: 'facade', src: '/images/zori.png', alt: 'Фасад дома Тихие Зори' },
      { type: 'plan', src: '/images/122.jpg', alt: 'Планировка дома' }
    ],
    file: '/projects/zori.pdf',
  },
  {
    id: 7,
    title: 'Уютное гнездышко',
    description: 'Общая площадь 98 кв.м.',
    images: [
      { type: 'facade', src: '/images/gnezdo.png', alt: 'Фасад дома Уютное гнездышко' },
      { type: 'plan', src: '/images/3333.jpg', alt: 'Планировка дома' }
    ],
    file: '/projects/gnezdo.pdf',
  },
  {
    id: 8,
    title: 'Аура',
    description: 'Общая площадь 73 кв.м.',
    images: [
      { type: 'facade', src: '/images/aura.png', alt: 'Фасад дома Аура' },
      { type: 'plan', src: '/images/444.jpg', alt: 'Планировка 1 этажа' },
      { type: 'plan', src: '/images/555.jpg', alt: 'Планировка 2 этажа' }
    ],
    file: '/projects/aura.pdf',
  },
  {
    id: 9,
    title: 'Надежда',
    description: 'Общая площадь 100 кв.м.',
    images: [
      { type: 'facade', src: '/images/nade.png', alt: 'Фасад дома Надежда' },
      { type: 'plan', src: '/images/666.jpg', alt: 'Планировка дома' }
    ],
    file: '/projects/nade.pdf',
  },
];

// Компонент внутреннего слайдера для каждого проекта
const ProjectImageSlider = ({ project }: { project: typeof projects[0] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const currentImage = project.images[currentImageIndex];
  const isFloorPlan = currentImage.type === 'floorplan';
  
  return (
    <div className="relative h-80 rounded-xl overflow-hidden group">
      {/* Фон для планировок */}
      {isFloorPlan && (
        <div className="absolute inset-0 bg-white z-0"></div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10"></div>
      
      {/* Текущее изображение */}
      <Image
        src={currentImage.src}
        alt={currentImage.alt}
        fill
        className={`transition-transform duration-500 group-hover:scale-105 ${
          isFloorPlan 
            ? 'object-contain p-4' 
            : 'object-cover'
        }`}
        unoptimized={true}
      />

      {/* Навигация по изображениям */}
      {project.images.length > 1 && (
        <>
          <button
            onClick={handlePreviousImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all duration-300"
            aria-label="Предыдущее изображение"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all duration-300"
            aria-label="Следующее изображение"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Индикаторы изображений */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Изображение ${index + 1}`}
              />
            ))}
          </div>

          {/* Тип изображения */}
          <div className="absolute top-3 left-3 z-20">
            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              {currentImage.type === 'facade' ? '🏠 Фасад' : '📐 Планировка'}
            </span>
          </div>
        </>
      )}

      {/* Декоративные элементы */}
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-xl"></div>
    </div>
  );
};

const ProjectsSection = ({ onCatalogClick }: ProjectsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Количество проектов для показа на разных экранах
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg и больше
      if (window.innerWidth >= 768) return 2;  // md
      return 1; // sm
    }
    return 3; // по умолчанию
  };

  const [itemsPerView, setItemsPerView] = useState(3);

  // Обновляем количество элементов при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      setCurrentIndex(0); // Сбрасываем индекс при изменении размера
    };

    // Устанавливаем начальное значение
    setItemsPerView(getItemsPerView());
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Общее количество слайдов (групп проектов)
  const totalSlides = Math.ceil(projects.length / itemsPerView);
  
  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(totalSlides - 1, prev + 1));
  };

  // Получаем проекты для текущего слайда
  const startIndex = currentIndex * itemsPerView;
  const visibleProjects = projects.slice(startIndex, startIndex + itemsPerView);

  return (
    <section id="projects" className="relative py-20 bg-gradient-to-tr from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Архитектурный фон */}
      <div className="absolute inset-0 opacity-30">
        {/* Квадраты как окна */}
        <div className="absolute top-16 left-16 w-20 h-20 border-2 border-blue-400 opacity-25"></div>
        <div className="absolute top-32 right-24 w-16 h-16 border-2 border-indigo-400 opacity-30"></div>
        <div className="absolute bottom-24 left-1/3 w-12 h-12 border-2 border-cyan-400 opacity-35"></div>
        
        {/* Ромбы */}
        <div className="absolute top-1/3 left-1/4 w-14 h-14 bg-blue-300 transform rotate-45 opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-10 h-10 bg-indigo-400 transform rotate-45 opacity-25"></div>
        
        {/* Сетка */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-200 to-transparent opacity-30"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent opacity-25"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Заголовок секции */}
        <FadeInSection as="div" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent mb-4">
            Каталог проектов
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>
        
        {/* Карусель */}
        <div className="relative">
          {/* Навигационные кнопки */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
            aria-label="Предыдущий слайд"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800 group-hover:text-blue-600" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
            aria-label="Следующий слайд"
          >
            <ChevronRight className="w-6 h-6 text-gray-800 group-hover:text-blue-600" />
          </button>

          {/* Контейнер проектов */}
          <div className="px-8 py-4">
            <div 
              className="grid transition-transform duration-300 ease-in-out gap-8"
              style={{
                gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
              }}
            >
              {visibleProjects.map((project, index) => (
                <FadeInSection 
                  key={`${project.id}-${currentIndex}`} 
                  as="div" 
                  className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                  delay={0.1 * index}
                >
                  {/* Фон */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Слайдер изображений */}
                    <ProjectImageSlider project={project} />
                    
                    {/* Информация о проекте */}
                    <div className="mt-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {project.description}
                      </p>
                      
                      {/* Дополнительная информация */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Доступен для строительства</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>📐</span>
                          <span>{project.images.length - 1} планировки</span>
                        </span>
                      </div>
                    </div>

                    {/* Декоративный элемент */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>

        {/* Индикаторы */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>

        {/* Призыв к действию */}
        <FadeInSection as="div" delay={0.6} className="text-center mt-16">
          <button
            onClick={onCatalogClick}
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-300 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 cursor-pointer group hover:from-blue-500/30 hover:to-purple-500/30"
          >
            <span className="text-gray-800 font-medium text-lg">Получить полный каталог проектов</span>
            <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
          </button>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ProjectsSection; 