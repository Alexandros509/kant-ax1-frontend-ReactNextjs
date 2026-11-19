# 회원 전용 Todo (Next.js + Supabase)

## 폴더 구조

```
app/
├── actions.ts              Server Actions: addTodo, toggleTodo, deleteTodo, login, signup, logout
├── layout.tsx
├── page.tsx                / 메인 (서버 컴포넌트: getUser → 로그인 확인)
├── login/page.tsx          /login
├── todos/[id]/page.tsx     /todos/1 상세 (동적 라우트, await params, 없으면 notFound)
└── components/
    ├── AuthForm.tsx        로그인/회원가입 폼 (formAction)
    ├── UserProfile.tsx     접속 계정 + 로그아웃
    ├── TodoList.tsx        useState·useEffect로 목록 조회, 4가지 상태 화면
    ├── TodoInput.tsx       할 일 추가 폼
    └── TodoItem.tsx        할 일 1개 (완료 토글, 삭제, 상세 링크)
utils/supabase/{client,server,middleware}.ts
middleware.ts               미인증 사용자를 /login으로
supabase/schema.sql         todos 테이블 + RLS 4종
```

## 필수 항목 대응

| 필수 항목           | 구현                                                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 컴포넌트 분리·Props | `TodoList` → `TodoInput`(`onChanged`), `TodoItem`(`todo`, `onChanged`). Props는 `interface`로 타입 지정                    |
| 인증·회원 전용 화면 | Supabase Auth 회원가입·로그인·로그아웃, 미들웨어가 미인증 사용자를 `/login`으로 이동                                       |
| Hook·비동기         | `useState`(목록·로딩·에러·reloadKey), `useEffect`로 Supabase에서 목록 조회. 추가·완료·삭제 후 `reloadKey`를 올려 다시 조회 |
| 상태별 UI           | 로딩 "로딩 중..." / 에러 "데이터 로딩 실패" / 빈 데이터 "등록된 데이터가 없습니다." / 성공 목록(`key={todo.id}`)           |
| 라우팅              | `/`, `/login`, `/todos/[id]`, `Link`로 목록 ↔ 상세 이동                                                                    |

## 실행 방법

1. Supabase SQL Editor에서 `supabase/schema.sql` 실행
2. `.env.example`을 복사해 `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` 입력
3. `npm install` → `npm run dev` → http://localhost:3000

## Vercel 배포

1. GitHub에 push
2. Vercel → Add New → Project → 저장소 Import
3. Environment Variables에 위 두 값 입력 → Deploy
4. Supabase → Authentication → URL Configuration의 Site URL·Redirect URLs에 배포 주소 추가
