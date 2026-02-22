'use client';

import { useState } from 'react';
import FadeInSection from './FadeInSection';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11) return false;
    if (!(digits.startsWith('7') || digits.startsWith('8'))) return false;
    if (/^(7|8)0{10}$/.test(digits)) return false;
    return true;
  };

  const validateName = (value: string) => {
    return /^[А-Яа-яA-Za-zЁё\-]{2,}$/.test(value.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateName(name)) return setError('Пожалуйста, укажите корректное имя (только буквы, не менее 2 символов)');
    if (!validatePhone(phone)) return setError('Пожалуйста, укажите корректный российский номер телефона');
    setLoading(true);
    try {
      const res = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, material: 'Контакты', area: '-', finish: '-', finance: '-', message }),
      });
      if (res.ok) {
        setSuccess(true);
        setName('');
        setPhone('');
        setMessage('');
      } else {
        setError('Ошибка отправки. Попробуйте позже.');
      }
    } catch {
      setError('Ошибка отправки. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-tr from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Современный фон */}
      <div className="absolute inset-0 opacity-30">
        {/* Геометрические фигуры */}
        <div className="absolute top-16 left-16 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-blue-500 rounded-full opacity-20"></div>
        <div className="absolute top-32 right-24 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-indigo-600 transform rotate-45 opacity-25"></div>
        <div className="absolute bottom-24 left-1/4 w-10 sm:w-14 lg:w-18 h-10 sm:h-14 lg:h-18 bg-cyan-500 rounded-full opacity-30"></div>
        
        {/* Соединительные линии */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-25"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-20"></div>
        
        {/* Вертикальные линии */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-300 to-transparent opacity-20"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-300 to-transparent opacity-15"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Заголовок секции */}
        <FadeInSection as="div" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent mb-4">
            Наши контакты
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Контактная информация */}
          <FadeInSection 
            as="div" 
            className="group relative p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500"
            delay={0.2}
          >
            {/* Фон */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 group-hover:text-blue-600 transition-all duration-300">
                Свяжитесь с нами
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm sm:text-base mb-1">Телефоны</p>
                    <div className="space-y-1">
                      <a href="tel:+79530132423" className="block text-lg sm:text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                      +7 953 013 24 23
                    </a>
                      <a href="tel:+79264112280" className="block text-lg sm:text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                        +7 926 411 22 80
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors duration-300">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm sm:text-base mb-1">WhatsApp</p>
                    <div className="space-y-1">
                      <a href="https://wa.me/79530132423" className="block text-lg sm:text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors duration-300">
                      +7 953 013 24 23
                    </a>
                      <a href="https://wa.me/79264112280" className="block text-lg sm:text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors duration-300">
                        +7 926 411 22 80
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-red-500/20 rounded-full flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm sm:text-base mb-1">Адрес</p>
                    <p className="text-lg sm:text-xl font-semibold text-gray-800">
                      г. Чебоксары,<br />ул. Калинина, 107
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm sm:text-base mb-1">Время работы</p>
                    <p className="text-lg sm:text-xl font-semibold text-gray-800">
                      Пн - Вс с 8:00 до 20:00
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-orange-500/20 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-colors duration-300">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm sm:text-base mb-1">Email</p>
                    <a href="mailto:Vashdom121@mail.ru" className="text-lg sm:text-xl font-semibold text-gray-800 hover:text-orange-600 transition-colors duration-300">
                      Vashdom121@mail.ru
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Декоративный элемент */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
          </FadeInSection>

          {/* Форма обратной связи */}
          <FadeInSection 
            as="div" 
            className="group relative p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500"
            delay={0.4}
          >
            {/* Фон */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 group-hover:text-blue-600 transition-all duration-300">
                Задать вопрос
              </h3>
              
              {success ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 sm:w-8 h-6 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg sm:text-xl font-semibold text-green-600 mb-2">Спасибо за обращение!</p>
                  <p className="text-gray-600 text-sm sm:text-base">Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      placeholder="Введите ваше имя"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base resize-none"
                      placeholder="Ваш вопрос или комментарий..."
                    />
                  </div>
                  
                  {error && (
                    <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm sm:text-base">{error}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {loading ? 'Отправка...' : 'Отправить сообщение'}
                  </button>
                </form>
              )}
            </div>

            {/* Декоративный элемент */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 