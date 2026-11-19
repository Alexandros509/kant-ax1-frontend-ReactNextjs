'use client'; // 버튼 클릭 후 부모(TodoList)에게 알리기 위해 클라이언트 컴포넌트로 지정합니다.

import Link from 'next/link';
import { Todo } from './TodoList';
// Server Actions 함수 임포트
import { deleteTodo, toggleTodo } from '@/app/actions';

interface TodoItemProps {
  todo: Todo;
  onChanged: () => void; // 완료/삭제가 끝나면 호출 (목록 다시 불러오기)
}

export default function TodoItem({ todo, onChanged }: TodoItemProps) {
  // 완료 상태를 반전시키는 Server Action 실행 후 부모에게 알립니다.
  const handleToggle = async () => {
    await toggleTodo(todo.id, todo.is_completed);
    onChanged();
  };

  // 삭제 Server Action 실행 후 부모에게 알립니다.
  const handleDelete = async () => {
    await deleteTodo(todo.id);
    onChanged();
  };

  return (
    <li className="py-3 flex items-center justify-between gap-3 border-b border-gray-100">
      {/* 제목을 누르면 상세 페이지(/todos/[id])로 이동, 완료 상태에 따라 취소선 및 글자색 변경 */}
      <Link
        href={`/todos/${todo.id}`}
        className={todo.is_completed ? 'line-through text-gray-400 hover:underline' : 'text-gray-800 hover:underline'}
      >
        {todo.title}
      </Link>

      <div className="flex gap-2 shrink-0">
        {/* Update 버튼 Form */}
        <form action={handleToggle}>
          <button type="submit" className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition">
            {todo.is_completed ? '취소' : '완료'}
          </button>
        </form>

        {/* Delete 버튼 Form */}
        <form action={handleDelete}>
          <button type="submit" className="px-2.5 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded transition">
            삭제
          </button>
        </form>
      </div>
    </li>
  );
}
