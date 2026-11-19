import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // 미들웨어 전용 Supabase 클라이언트 생성
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 접속 유저 정보 확인
  const { data: { user } } = await supabase.auth.getUser();

  // 보호할 경로: 메인 목록(/)과 상세 페이지(/todos/...)
  // (교안은 '/'만 보호합니다. 상세 페이지가 추가되어 '/todos'도 함께 막습니다.)
  const isProtectedPath =
    request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/todos');

  // 미인증 유저가 보호된 라우트에 접근한 경우 -> /login으로 리다이렉트
  if (!user && isProtectedPath) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 이미 로그인한 유저가 /login 페이지에 접근한 경우 -> 메인(/)으로 리다이렉트
  if (user && request.nextUrl.pathname.startsWith('/login')) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
