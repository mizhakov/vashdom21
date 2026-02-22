'use client';

import { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallbackModal = ({ isOpen, onClose }: CallbackModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

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
        body: JSON.stringify({ name, phone, message, material: 'Звонок' }),
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

  const closeModal = () => {
    setName('');
    setPhone('');
    setMessage('');
    setError('');
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full">
        {/* Декоративные фоновые элементы */}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-2xl opacity-70"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-2xl opacity-70"></div>
        
        {/* Основной контейнер модального окна */}
        <div className="relative bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-2xl">
          {/* Кнопка закрытия */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300 hover:bg-gray-100 rounded-full p-2 group"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </button>

          {/* Заголовок */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent mb-2">
              Заказать звонок
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  placeholder="Ваш телефон"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                    setPhone(val);
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Сообщение (необязательно)"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 text-center py-3 px-4 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                  <span className="block w-full break-words">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-semibold disabled:opacity-60 hover:scale-105 hover:shadow-lg"
              >
                {loading ? 'Отправка...' : 'Заказать звонок'}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 animate-fadeIn">
              <div className="bg-green-100 border border-green-300 rounded-2xl p-6 mb-6 flex items-center shadow-lg w-full">
                <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                <span className="text-green-700 text-lg font-semibold leading-snug text-left">
                  Спасибо! Ваш запрос успешно отправлен.
                </span>
              </div>
              <button
                onClick={closeModal}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-semibold shadow-md hover:scale-105"
              >
                Закрыть
              </button>
            </div>
          )}

          {/* Декоративный элемент */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CallbackModal;