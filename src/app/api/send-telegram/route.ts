import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { type, name, phone, material, area, finish, finance, message } = await req.json();

  const token = '7422874036:AAE54kNXkKv2y4iwBmEuexSefuh9fs2v2dc';
  const chatId = '965454906'; // chat_id пользователя

  let text = '';
  
  if (type === 'contact') {
    text = `🚀 Новая заявка "Готовы начать строительство?"\n\n🎯 <b>Ваш Дом - Контактная форма</b>\n\n👤 <b>Имя:</b> ${name}\n📞 <b>Телефон:</b> ${phone}\n🏠 <b>Тип заявки:</b> Готов начать строительство\n⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}\n\n✅ <i>Клиент готов обсуждать строительство дома!</i>`;
  } else if (material === 'Контакты') {
    text = `📩 Новое сообщение с сайта ВашДом:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n💬 Сообщение: ${message || '-'}\n`;
  } else if (material === 'Экскурсия') {
    text = `🚌 Заявка на экскурсию с сайта ВашДом:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;
  } else if (material === 'Звонок') {
    text = `📞 Заявка на звонок с сайта ВашДом:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n💬 Сообщение: ${message || '-'}`;
  } else if (material === 'Расчет стоимости') {
    text = `💰 Новая заявка на расчет стоимости дома!\n\n🎯 <b>Ваш Дом - Заявка с главной страницы</b>\n\n👤 <b>Имя:</b> ${name}\n📞 <b>Телефон:</b> ${phone}\n🏠 <b>Тип заявки:</b> Расчет стоимости дома\n⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}\n\n✅ <i>Клиент заинтересован в строительстве дома и готов обсудить проект!</i>`;
  } else {
    text = `🏠 Новая заявка на расчет стоимости с сайта ВашДом:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n🧱 Материал: ${material}\n📏 Площадь: ${area}\n✨ Отделка: ${finish}\n💰 Финансирование: ${finance}`;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  });

  if (res.ok) {
    return NextResponse.json({ ok: true });
  } else {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
} 