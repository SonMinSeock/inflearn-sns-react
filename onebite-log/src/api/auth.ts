/**
 * 인증 관련 비동기 코드 파일
 */

import supabase from "@/lib/supabase";

/**
 * signUp 비동기 함수
 * 이메일과 비밀번호를 이용해 Supabase Auth에 사용자 계정을 생성한다.
 */
export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  /**
   * Supabase Auth를 이용해 회원가입을 요청한다.
   * 전달받은 이메일과 비밀번호로 사용자 계정을 생성한다.
   * 성공 시 사용자 정보와 세션 데이터가 포함된 응답을 반환한다.
   */
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  // 회원가입 요청 에러 발생
  if (error) throw error;

  // 성공 시 사용자 정보 및 세션 데이터를 반환
  return data;
}

/**
 * signIn 비동기 함수
 * 이메일과 비밀번호를 이용해 Supabase Auth에 사용자 로그인 요청한다.
 */
export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // Supabase Auth를 이용해 이메일/비밀번호 기반 로그인 요청
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // 로그인 실패 시 에러 throw
  if (error) throw error;

  // 로그인 성공 시 사용자 정보 및 세션 반환
  return data;
}
