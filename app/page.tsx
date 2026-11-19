import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "./actions";
import TodoList from "./components/TodoList";
import UserProfile from "./components/UserProfile";

export default async function HomePage() {
  const supabase = await createClient();
  // Middleware 라우트 가드에 의해 이곳에 도달한 유저는 인증된 유저입니다.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 미들웨어를 통과했더라도 서버에서 한 번 더 확인합니다.
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="max-w-md mx-auto my-10 p-5 font-sans space-y-6">
      <h1 className="text-2xl font-bold">나의 할 일</h1>

      {/* 사용자 프로필 정보 바 */}
      <UserProfile
        email={user.email ?? "이메일 없음"}
        userId={user.id}
        logoutAction={logout}
      />

      {/* 할 일 입력 + 필터 + 목록 (클라이언트 컴포넌트) */}
      <TodoList />
    </main>
  );
}
