'use client';

// Props 타입 정의 (로그인 및 회원가입 Server Actions 함수 수신)
interface AuthFormProps {
  loginAction: (formData: FormData) => Promise<void>;
  signupAction: (formData: FormData) => Promise<void>;
}

export default function AuthForm({ loginAction, signupAction }: AuthFormProps) {
  return (
    <div className="w-full max-w-sm border border-gray-300 p-6 rounded-lg bg-white shadow-sm space-y-4">
      <h3 className="text-lg font-bold text-gray-800">로그인 / 회원가입</h3>
      <form className="space-y-3">
        <div>
          {/* 이메일 입력 필드 */}
          <input
            type="email"
            name="email"
            placeholder="이메일 주소"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
        </div>
        <div>
          {/* 비밀번호 입력 필드 */}
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
        </div>
        <div className="flex gap-2 pt-2">
          {/* formAction으로 실행할 Server Action 바인딩 */}
          <button
            formAction={loginAction}
            className="flex-1 bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
          >
            로그인
          </button>
          <button
            formAction={signupAction}
            className="flex-1 bg-gray-600 text-white py-2 rounded text-sm font-medium hover:bg-gray-700 transition"
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
