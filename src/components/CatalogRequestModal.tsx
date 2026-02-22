'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface CatalogRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CatalogRequestModal = ({ isOpen, onClose }: CatalogRequestModalProps) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
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
    const nameValid = validateName(name);
    const phoneValid = validatePhone(phone);
    if (!phoneValid) return setError('Пожалуйста, укажите корректный российский номер телефона');
    if (!nameValid) return setError('Пожалуйста, укажите корректное имя (только буквы, не менее 2 символов)');
    setLoading(true);
    try {
      const res = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, material: 'Каталог', area: '-', finish: '-', finance: '-' }),
      });
      if (res.ok) {
        setSuccess(true);
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
    setPhone('');
    setName('');
    setError('');
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-fadeIn border border-gray-200 overflow-hidden">
        {/* Декоративные фоновые элементы */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-purple-500 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-cyan-500 rounded-full blur-2xl opacity-20"></div>
        </div>

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-20 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
          aria-label="Закрыть"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative z-10 p-8">
          <div className="w-full flex justify-center mb-6">
            <div className="relative group">
              <Image 
                src="/images/katalog.png" 
                alt="Каталог проектов" 
                width={320} 
                height={120} 
                className="object-contain rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300" 
                unoptimized={true}
              />
              {/* Декоративные элементы вокруг изображения */}
              <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-xl"></div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent">
            Укажите контакты
          </h2>
          <p className="text-gray-600 text-center mb-8">И мы отправим каталог проектов на WhatsApp</p>

          {!success ? (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                  setPhone(val);
                }}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg text-gray-800 placeholder-gray-500 hover:border-gray-300 transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg text-gray-800 placeholder-gray-500 hover:border-gray-300 transition-all duration-300"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-lg font-semibold mt-2 disabled:opacity-60 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                {loading ? 'Отправка...' : 'Хочу проект'}
              </button>
              
              {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 text-center py-3 px-4 rounded-lg flex items-center justify-center min-h-[48px] md:min-h-[40px] md:text-base text-sm whitespace-pre-line mt-2">
                  <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                  <span className="block w-full break-words">{error}</span>
                </div>
              )}
            </form>
          ) : (
            <div className="w-full flex flex-col items-center animate-fadeIn">
              <div className="bg-green-100 border border-green-300 rounded-2xl p-6 mb-8 flex items-center shadow-lg w-full">
                <CheckCircle className="w-10 h-10 text-green-600 mr-4 flex-shrink-0" />
                <span className="text-green-700 text-lg md:text-xl font-semibold leading-snug text-left">
                  Спасибо! Данные успешно отправлены.
                </span>
              </div>
              <button
                onClick={closeModal}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-lg font-semibold shadow-md hover:scale-105 hover:-translate-y-1"
              >
                Закрыть
              </button>
            </div>
          )}

          {/* Декоративный элемент */}
          <div className="absolute top-2 right-12 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CatalogRequestModal; 