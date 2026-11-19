import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import type { Todo } from '@/app/components/TodoList';

// 동적 라우트 props (params는 Promise로 전달됩니다.)
interface TodoDetailPageProps {
  params: Promise<{
    id: string; // URL 경로에서 전달받은 가변 id 값입니다.
  }>;
}

export default async function TodoDetailPage({ params }: TodoDetailPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // id가 일치하는 할 일 1건을 가져옵니다. (RLS로 본인 데이터만 조회됩니다.)
  const { data } = await supabase.from('todos').select('*').eq('id', id).maybeSingle();

  // 없는 할 일이면 404 화면을 보여 줍니다.
  if (!data) {
    notFound();
  }

  const todo: Todo = data;

  return (
    <main className="max-w-md mx-auto my-10 p-5 font-sans space-y-4">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← 목록으로
      </Link>

      <div className="p-5 border border-gray-200 rounded-lg bg-white space-y-2">
        <h1 className="text-xl font-bold">{todo.title}</h1>
        <p className="text-sm">상태: {todo.is_completed ? '완료' : '진행 중'}</p>
        <p className="text-sm text-gray-500">등록일: {new Date(todo.created_at).toLocaleString('ko-KR')}</p>
      </div>
    </main>
  );
}
