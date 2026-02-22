'use client';

import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    phone: '',
    name: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[78]\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const validateName = (name: string) => {
    const nameRegex = /^[а-яёА-ЯЁa-zA-Z\s]{2,}$/;
    return nameRegex.test(name.trim());
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Очищаем ошибки при вводе
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('name', e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    if (value.length > 0 && !value.startsWith('7') && !value.startsWith('8')) {
      value = '7' + value;
    }
    
    let formattedValue = value;
    if (value.length > 1) {
      formattedValue = `+${value.slice(0, 1)} (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`;
    }
    
    handleInputChange('phone', formattedValue);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange('message', e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      phone: '',
      name: ''
    };

    const cleanPhone = formData.phone.replace(/\D/g, '');
    
    if (!validatePhone(cleanPhone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }
    
    if (!validateName(formData.name)) {
      newErrors.name = 'Имя должно содержать только буквы (минимум 2 символа)';
    }

    if (newErrors.phone || newErrors.name) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          phone: formData.phone,
          message: formData.message
        }),
      });

      if (response.ok) {
        setFormData({ phone: '', name: '', message: '' });
        setSuccess('Сообщение успешно отправлено!');
        onClose();
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setError('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-md">
        {/* Фоновые декоративные элементы */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-xl"></div>
        
        {/* Основной контейнер */}
        <div className="relative bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-2xl">
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-600"
          >
            ✕
          </button>

          {/* Заголовок */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent mb-2">
              Укажите свои данные
            </h2>
            <p className="text-gray-600 text-sm">
              И наш менеджер свяжется с Вами в ближайшее время
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleNameChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-gray-800 placeholder-gray-500"
                required
              />
            </div>
            
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Ваш телефон"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-gray-800 placeholder-gray-500"
                required
              />
            </div>
            
            <div>
              <textarea
                name="message"
                placeholder="Ваше сообщение"
                rows={4}
                value={formData.message}
                onChange={handleMessageChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              {isLoading ? 'Отправка...' : 'Отправить сообщение'}
            </button>
            
            {success && (
              <div className="bg-green-100 border border-green-300 text-green-700 text-center py-3 px-4 rounded-xl text-sm">
                {success}
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 text-center py-3 px-4 rounded-xl text-sm">
                {error}
              </div>
            )}
          </form>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            Нажимая кнопку &ldquo;Отправить сообщение&rdquo;, вы соглашаетесь с{' '}
            <a href="#" className="underline hover:text-blue-600 transition-colors duration-300">
              Политикой конфиденциальности
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal; 