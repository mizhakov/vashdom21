'use client';

import { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

const CallbackModal = ({ isOpen, onClose, source }: CallbackModalProps) => {
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
        body: JSON.stringify({ name, phone, message, material: 'Звонок', source }),
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
          <div className={success ? 'hidden' : 'text-center mb-8'}>
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
            <div className="flex flex-col items-center justify-center py-6 text-center animate-fadeIn">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-400/30 rounded-full blur-xl"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25">
                  <CheckCircle className="w-11 h-11 text-white" />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Заявка отправлена
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Спасибо! Мы получили ваш запрос и свяжемся с вами в ближайшее время.
                </p>
              </div>

              {/* <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6">
                <div className="flex items-start gap-3 text-left">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Что дальше
                    </p>
                    <p className="text-sm text-gray-600 leading-snug">
                      Менеджер уточнит детали и подберет удобное время для звонка.
                    </p>
                  </div>
                </div>
              </div> */}

              <button
                onClick={closeModal}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-semibold shadow-md hover:scale-[1.02]"
              >
                Хорошо
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
