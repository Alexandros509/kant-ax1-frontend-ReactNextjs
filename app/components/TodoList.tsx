'use client'; // 목록 상태(useState)와 데이터 불러오기(useEffect)를 쓰기 위해 클라이언트 컴포넌트로 지정합니다.

import { useEffect, useState } from 'react';
// 브라우저 전용 Supabase 클라이언트 생성 함수 임포트
import { createClient } from '@/utils/supabase/client';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

// Todo 데이터 항목의 타입을 정의합니다.
export interface Todo {
  id: number;
  created_at: string;
  title: string;
  is_completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // 값을 1씩 올리면 useEffect가 다시 실행되어 목록을 새로 불러옵니다.
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const supabase = createClient();

    const loadTodos = async () => {
      // todos 테이블에서 생성일 기준 내림차순으로 가져옵니다. (RLS로 본인 데이터만 조회됩니다.)
      const { data, error } = await supabase.from('todos').select('*').order('created_at', { ascending: false });

      if (error) {
        console.error('데이터 로딩 에러:', error.message);
        setErrorMessage(error.message);
      } else {
        setErrorMessage(null);
        setTodos(data ?? []);
      }
      setIsLoading(false);
    };

    loadTodos();
  }, [reloadKey]);

  // 추가·완료·삭제가 끝나면 목록을 다시 불러옵니다.
  const handleChanged = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      {/* 데이터 추가 폼 */}
      <TodoInput onChanged={handleChanged} />

      {/* 1) 로딩 상태 */}
      {isLoading && <p className="text-gray-400 text-sm">로딩 중...</p>}

      {/* 2) 에러 상태 */}
      {!isLoading && errorMessage && <p className="text-red-500">데이터 로딩 실패: {errorMessage}</p>}

      {/* 3) 빈 데이터 상태 */}
      {!isLoading && !errorMessage && todos.length === 0 && (
        <p className="text-gray-400 text-sm">등록된 데이터가 없습니다.</p>
      )}

      {/* 4) 성공 상태: 목록 렌더링 */}
      {!isLoading && !errorMessage && todos.length > 0 && (
        <ul className="p-0 list-none">
          {todos.map((todo) => (
            // TodoItem 컴포넌트로 개별 항목 처리 (고유 id를 key로 전달)
            <TodoItem key={todo.id} todo={todo} onChanged={handleChanged} />
          ))}
        </ul>
      )}
    </div>
  );
}
