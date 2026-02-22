'use client';

import { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ExcursionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExcursionModal = ({ isOpen, onClose }: ExcursionModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
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
    if (!name && !phone) return setError('Ни одно поле не заполнено');
    if (!validateName(name)) return setError('Пожалуйста, укажите корректное имя (только буквы, не менее 2 символов)');
    if (!validatePhone(phone)) return setError('Пожалуйста, укажите корректный российский номер телефона');
    setLoading(true);
    try {
      const res = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, material: 'Экскурсия', area: '-', finish: '-', finance: '-' }),
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
    setName('');
    setPhone('');
    setError('');
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
      <div className="bg-[#fdf7f2] rounded-2xl shadow-2xl w-full max-w-xl mx-4 relative animate-fadeIn">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          aria-label="Закрыть"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="p-8 md:p-12 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Записаться на экскурсию</h2>
          <p className="text-gray-600 text-center mb-8 text-lg max-w-xl">
            Мы регулярно проводим экскурсии на готовые объекты для знакомства с компанией и технологиями строительства
          </p>

          {!success ? (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
              <input
                type="text"
                placeholder="Ваше полное имя"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 border-b border-gray-400 bg-transparent focus:outline-none focus:border-blue-700 text-lg placeholder-gray-400"
              />
              <input
                type="tel"
                placeholder="Ваш телефон"
                value={phone}
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                  setPhone(val);
                }}
                className="w-full px-4 py-3 border-b border-gray-400 bg-transparent focus:outline-none focus:border-blue-700 text-lg placeholder-gray-400"
              />
              {error && (
                <div className="bg-red-500 text-white text-center py-3 px-4 rounded-lg flex items-center justify-center min-h-[48px] md:min-h-[40px] md:text-base text-sm whitespace-pre-line">
                  <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                  <span className="block w-full break-words">{error}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white py-3 rounded-full hover:bg-blue-800 transition-colors text-lg font-semibold mt-2 disabled:opacity-60 shadow-md"
              >
                {loading ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </form>
          ) : (
            <div className="w-full flex flex-col items-center animate-fadeIn">
              <div className="bg-green-100 rounded-2xl p-6 mb-8 flex items-center shadow-lg w-full">
                <CheckCircle className="w-10 h-10 text-green-600 mr-4 flex-shrink-0" />
                <span className="text-green-700 text-lg md:text-xl font-semibold leading-snug text-left">
                  Спасибо! Ваша заявка успешно отправлена.
                </span>
              </div>
              <button
                onClick={closeModal}
                className="bg-blue-900 text-white px-8 py-3 rounded-full hover:bg-blue-800 transition-colors text-lg font-semibold shadow-md"
              >
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcursionModal; 