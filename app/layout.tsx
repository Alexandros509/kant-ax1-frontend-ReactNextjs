import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '할 일 관리 서비스',
  description: 'Next.js + Supabase 회원 전용 Todo 앱',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
