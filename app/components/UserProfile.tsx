'use client';

interface UserProfileProps {
  email: string;
  userId: string;
  logoutAction: () => Promise<void>;
}

export default function UserProfile({ email, userId, logoutAction }: UserProfileProps) {
  return (
    <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg flex items-center justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-blue-900 truncate">접속 계정: {email}</h3>
        <p className="text-xs text-gray-600 mt-0.5 truncate">UID: {userId}</p>
      </div>
      <form action={logoutAction}>
        <button
          type="submit"
          className="px-3 py-1.5 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
        >
          로그아웃
        </button>
      </form>
    </div>
  );
}
