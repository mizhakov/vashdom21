'use client';

import Image from 'next/image';
import FadeInSection from './FadeInSection';

const reviews = [
  {
    id: 1,
    name: 'Александр Петров',
    position: 'Владелец дома',
    text: 'Очень доволен качеством строительства. Команда профессионалов, все работы выполнены в срок и с соблюдением всех норм.',
    rating: 5,
    image: '/images/Sasha.jpg',
    project: 'Коттедж 150 м²',
    date: 'Сентябрь 2024',
  },
  {
    id: 2,
    name: 'Елена Смирнова',
    position: 'Владелица дома',
    text: 'Спасибо за отличную работу! Дом построен качественно, все пожелания были учтены. Рекомендую всем!',
    rating: 5,
    image: '/images/Elena.jpg',
    project: 'Дом 120 м²',
    date: 'Август 2024',
  },
  {
    id: 3,
    name: 'Дмитрий Иванов',
    position: 'Владелец дома',
    text: 'Профессиональный подход к делу. Все этапы строительства контролировались, результат превзошел ожидания.',
    rating: 5,
    image: '/images/Dmitry.jpg',
    project: 'Коттедж 180 м²',
    date: 'Июль 2024',
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="relative py-20 bg-gradient-to-br from-gray-5 via-white to-gray-100 overflow-hidden">
      {/* Статичный фон */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок секции */}
        <FadeInSection as="div" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent mb-4">
            Отзывы клиентов
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>

        {/* Карточки отзывов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <FadeInSection 
              key={review.id} 
              as="div" 
              className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              delay={0.2 * index}
            >
              {/* Фон */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                    {/* Декоративная рамка */}
                    <div className="absolute inset-0 rounded-full border border-gray-200 group-hover:border-blue-300 transition-colors duration-300"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-500">{review.position}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <blockquote className="text-gray-600 leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Объект:</span> {review.project}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Дата:</span> {review.date}
                  </p>
                </div>
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

export default ReviewsSection; 