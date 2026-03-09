import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/useSignInWithPassword";
import { useState } from "react";
import { Link } from "react-router";

export default function SignInPage() {
  // 이메일, 패스워드 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 mutation 커스텀 훅
  const { mutate: signInWithPassword } = useSignInWithPassword();

  // 로그인 버튼 이벤트 핸들러
  const handleSingInWithPasswordClick = () => {
    // 이메일 입력 검증
    if (!email.trim()) return;

    // 패스워드 입력 검증
    if (!password.trim()) return;

    signInWithPassword({
      email,
      password,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          className="py-6"
          placeholder="example@abc.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          className="py-6"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <Button className="w-full" onClick={handleSingInWithPasswordClick}>
          로그인
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to={"/sign-up"}>
          이미 계정이 없으시다면? 회원가입
        </Link>
      </div>
    </div>
  );
}
