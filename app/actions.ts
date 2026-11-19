'use server';

// Supabase 서버 클라이언트 생성 함수 임포트
import { createClient } from '@/utils/supabase/server';
// 캐시 갱신 함수 임포트
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// ───────────── 할 일 CRUD Actions ─────────────

// 새로운 할 일을 추가하는 Server Action 함수
export async function addTodo(formData: FormData) {
  // Supabase 클라이언트를 가져옵니다.
  const supabase = await createClient();

  // 폼 입력값에서 title 데이터를 추출합니다.
  const title = formData.get('title') as string;

  // 입력값이 빈 문자열이면 처리를 중단합니다.
  if (!title || title.trim() === '') return;

  // todos 테이블에 데이터 행을 삽입합니다. (user_id는 DB 기본값 auth.uid()로 채워집니다.)
  const { error } = await supabase.from('todos').insert([{ title: title.trim(), is_completed: false }]);

  if (error) {
    console.error('데이터 추가 에러:', error.message);
  }

  // 데이터 변경 후 메인 페이지 캐시를 갱신합니다.
  revalidatePath('/');
}

// 할 일 완료 상태를 토글하는 Server Action
export async function toggleTodo(id: number, isCompleted: boolean) {
  const supabase = await createClient();

  // id가 일치하는 행의 is_completed 상태를 반전시킵니다.
  const { error } = await supabase.from('todos').update({ is_completed: !isCompleted }).eq('id', id);

  if (error) {
    console.error('데이터 수정 에러:', error.message);
  }

  revalidatePath('/');
}

// 할 일을 삭제하는 Server Action
export async function deleteTodo(id: number) {
  const supabase = await createClient();

  // id가 일치하는 행을 테이블에서 삭제합니다.
  const { error } = await supabase.from('todos').delete().eq('id', id);

  if (error) {
    console.error('데이터 삭제 에러:', error.message);
  }

  revalidatePath('/');
}

// ───────────── Auth Actions ─────────────

// 로그인 Server Action
export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('로그인 에러:', error.message);
    redirect('/login?error=login_failed');
  }

  revalidatePath('/', 'layout');
  redirect('/'); // 로그인 성공 시 메인 보호 페이지로 이동
}

// 회원가입 Server Action
export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error('회원가입 에러:', error.message);
    redirect('/login?error=signup_failed');
  }

  revalidatePath('/', 'layout');
  redirect('/'); // 회원가입 완료 후 메인 페이지로 이동
}

// 로그아웃 Server Action
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login'); // 로그아웃 시 로그인 페이지로 이동
}
