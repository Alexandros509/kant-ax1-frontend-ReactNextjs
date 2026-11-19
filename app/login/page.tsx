import { login, signup } from '@/app/actions';
import AuthForm from '@/app/components/AuthForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">할 일 관리 서비스</h1>
        <p className="text-sm text-gray-600 mt-1">서비스를 이용하려면 로그인이 필요합니다.</p>
      </div>

      {/* AuthForm에 Server Actions 전달 */}
      <AuthForm loginAction={login} signupAction={signup} />
    </main>
  );
}
