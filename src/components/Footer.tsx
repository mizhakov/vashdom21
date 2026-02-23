import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ваш Дом</h3>
            <p className="text-gray-400">
              Современное строительство домов и коттеджей под ключ. Индивидуальные проекты, качественные материалы, профессиональная команда.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  Проекты
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link href="#reviews" className="text-gray-400 hover:text-white transition-colors">
                  Отзывы
                </Link>
              </li>
              <li>
                <Link href="#contacts" className="text-gray-400 hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="tel:+79530132423" className="hover:text-white transition-colors">
                  +7 953 013 24 23
                </a>
              </li>
              <li>
                <a href="tel:+79264112280" className="hover:text-white transition-colors">
                  +7 926 411 22 80
                </a>
              </li>
              <li>
                <a href="mailto:vashdom121@mail.ru" className="hover:text-white transition-colors">
                  vashdom121@mail.ru
                </a>
              </li>
              <li>
                г. Чебоксары,<br />
                ул. Калинина, 107
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Мы в соцсетях</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2021-2025 ВашДом. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 