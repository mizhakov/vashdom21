import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const RECIPIENT_EMAIL = process.env.SMTP_TO || 'vashdom121@mail.ru';

const labels: Record<string, string> = {
  type: 'Тип',
  name: 'Имя',
  phone: 'Телефон',
  source: 'Форма / блок',
  material: 'Материал / заявка',
  area: 'Площадь',
  finish: 'Отделка',
  finance: 'Финансирование',
  message: 'Сообщение',
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const getRequestTitle = (data: Record<string, unknown>) => {
  if (data.type === 'contact') return 'Готовы начать строительство';
  if (typeof data.material === 'string' && data.material.trim()) return data.material;
  return 'Заявка с сайта';
};

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as Record<string, unknown>;
    const submittedAt = new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
    });

    const entries = Object.entries(labels).map(([key, label]) => {
      const value = data[key];
      const normalizedValue =
        typeof value === 'string' && value.trim()
          ? value.trim()
          : typeof value === 'number'
            ? String(value)
            : '-';

      return { label, value: normalizedValue };
    });

    const title = getRequestTitle(data);
    const text = [
      `Новая заявка с сайта ВашДом: ${title}`,
      '',
      ...entries.map(({ label, value }) => `${label}: ${value}`),
      `Время: ${submittedAt}`,
    ].join('\n');

    const htmlRows = entries
      .map(
        ({ label, value }) =>
          `<tr><td style="padding:6px 12px 6px 0;font-weight:600;">${escapeHtml(label)}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`,
      )
      .join('');

    const html = `
      <div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.5;color:#111827;">
        <h2 style="margin:0 0 16px;">Новая заявка с сайта ВашДом: ${escapeHtml(title)}</h2>
        <table style="border-collapse:collapse;">${htmlRows}</table>
        <p style="margin-top:16px;color:#4b5563;">Время: ${escapeHtml(submittedAt)}</p>
      </div>
    `;

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;

    if (!host || !user || !pass || !from) {
      return NextResponse.json(
        { ok: false, error: 'SMTP is not configured' },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to: RECIPIENT_EMAIL,
      subject: `Новая заявка с сайта: ${title}`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
