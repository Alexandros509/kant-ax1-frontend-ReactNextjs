// 브라우저 전용 Supabase 클라이언트 생성 함수 임포트
import { createBrowserClient } from '@supabase/ssr';

// 클라이언트 컴포넌트에서 사용할 Supabase 객체를 생성해 반환합니다.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
