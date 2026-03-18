import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/auth/useSignInWithPassword";
import { useState } from "react";
import { Link } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";
import { useSignInWithOAuth } from "@/hooks/mutations/auth/useSignInWithOAuth";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

export default function SignInPage() {
  // 이메일, 패스워드 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 mutation 커스텀 훅
  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onError: (error) => {
        // 번역한 에러 메시지
        const message = generateErrorMessage(error);
        // 토스트 에러 메시지  상단 중앙에 보여준다.
        toast.error(message, {
          position: "top-center",
        });

        setPassword(""); // 에러가 발생하면 비밀번호 빈값으로 초기화한다.
      },
    });

  // 소셜 로그인 mutation 커스텀 훅
  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuth({
      onError: (error) => {
        const message = generateErrorMessage(error);

        toast.error(message, {
          position: "top-center",
        });
      },
    });

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

  // 소셜 로그인 버튼 이벤트 핸들러
  const handleSignInWithOAuthClick = () => {
    signInWithOAuth("github");
  };

  // 로딩 상태
  const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          disabled={isPending}
          className="py-6"
          placeholder="example@abc.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          disabled={isPending}
          type="password"
          className="py-6"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          disabled={isPending}
          className="w-full"
          onClick={handleSingInWithPasswordClick}
        >
          로그인
        </Button>
        <Button
          disabled={isPending}
          className="w-full"
          variant={"outline"}
          onClick={handleSignInWithOAuthClick}
        >
          <img src={gitHubLogo} className="h-4 w-4" />
          GitHub 계정 로그인
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Link className="text-muted-foreground hover:underline" to={"/sign-up"}>
          이미 계정이 없으시다면? 회원가입
        </Link>
        <Link
          className="text-muted-foreground hover:underline"
          to={"/forget-password"}
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </div>
  );
}
