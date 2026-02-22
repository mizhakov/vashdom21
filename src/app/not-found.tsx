import Link from 'next/link';
import FadeInSection from '@/components/FadeInSection';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <FadeInSection as="div" className="flex flex-col items-center text-center max-w-lg w-full">
        <div className="mb-8">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mx-auto">
            <rect x="20" y="60" width="80" height="40" rx="8" fill="#2563eb"/>
            <polygon points="60,20 20,60 100,60" fill="#3b82f6"/>
            <rect x="50" y="80" width="20" height="20" rx="4" fill="#fff"/>
          </svg>
        </div>
        <h1 className="text-6xl font-extrabold text-blue-700 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">Страница не найдена</p>
        <p className="text-gray-500 mb-8">Возможно, вы ошиблись адресом или страница была удалена.</p>
        <Link href="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors">
          На главную
        </Link>
      </FadeInSection>
    </main>
  );
} 