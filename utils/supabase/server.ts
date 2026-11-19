// Next.js SSR 전용 Supabase 클라이언트 생성 함수 임포트
import { createServerClient } from '@supabase/ssr';
// Next.js 서버 쿠키 관리 함수 임포트
import { cookies } from 'next/headers';

// 서버 환경(서버 컴포넌트, Server Action)에서 호출할 Supabase 클라이언트 생성 함수
export async function createClient() {
  // 현재 요청의 쿠키 저장소 객체를 가져옵니다.
  const cookieStore = await cookies();

  // Supabase 클라이언트 인스턴스를 생성하여 반환합니다.
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        // 모든 쿠키 데이터를 가져오는 메서드
        getAll() {
          return cookieStore.getAll();
        },
        // 변경된 쿠키 데이터를 설정하는 메서드
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component 내부에서의 쿠키 변경 호출 예외 처리
          }
        },
      },
    }
  );
}
