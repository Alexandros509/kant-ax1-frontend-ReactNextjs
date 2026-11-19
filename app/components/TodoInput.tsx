'use client'; // 추가가 끝난 뒤 부모(TodoList)에게 알리기 위해 클라이언트 컴포넌트로 지정합니다.

import { addTodo } from '@/app/actions';

interface TodoInputProps {
  onChanged: () => void; // 추가가 끝나면 호출 (목록 다시 불러오기)
}

export default function TodoInput({ onChanged }: TodoInputProps) {
  // Server Action(addTodo)을 실행한 뒤 부모에게 알립니다.
  const handleSubmit = async (formData: FormData) => {
    await addTodo(formData);
    onChanged();
  };

  return (
    <form action={handleSubmit} className="flex gap-2">
      <input
        type="text"
        name="title"
        placeholder="새 할 일을 입력하세요"
        required
        className="flex-1 p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition"
      >
        추가
      </button>
    </form>
  );
}
