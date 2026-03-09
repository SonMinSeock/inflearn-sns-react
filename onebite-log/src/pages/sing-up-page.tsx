import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/mutations/useSignUpMutation";
import { useState } from "react";
import { Link } from "react-router";

export default function SignUpPage() {
  // 이메일, 패스워드 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 회원가입 mutation 커스텀 훅
  const { mutate: signUp } = useSignUp();

  // 회원가입 버튼 이벤트 핸들러
  const handleSinUpClick = () => {
    // 이메일 입력 검증
    if (!email.trim()) return;

    // 패스워드 입력 검증
    if (!password.trim()) return;

    console.log(email, password);
    signUp({
      email,
      password,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">회원 가입</div>
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
        <Button className="w-full" onClick={handleSinUpClick}>
          회원가입
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to={"/sign-in"}>
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}
