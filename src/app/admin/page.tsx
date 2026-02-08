import { auth } from "@/auth";

export default async function AdminShowPage() {
  const session = await auth();
  // ??는 Nullish Coalescing (널 병합) 연산자
  // ||와의 차이점은, ||는 0, "", false 같은 falsy 값도 오른쪽으로 넘기지만, ??는 오직 null/undefined만 넘깁니다.
  // session?.user?.roles가 없으면(세션이 없거나, roles가 설정 안 된 경우) 빈 배열 [] 반환
  const roles = session?.user?.roles ?? [];

  if (!roles.includes("Admin")) {
    return <div>권한이 없습니다.</div>;
  }

  return <div>Admin Show Page</div>;
}