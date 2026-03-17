/**
 * 프로필 관련 비동기 코드 파일
 */

import supabase from "@/lib/supabase";
import { getRandomNickname } from "@/lib/utils";

/**
 * fetchProfile, 해당 프로필 조회 요청 비동기 함수
 */
export async function fetchProfile(userId: string) {
  // 하고 모든 열 포함해서 조건에 만족한 프로필 한개 데이터를 조회
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

/**
 * createProfile, 프로필 생성 요청 비동기 함수
 */

export async function createProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .insert({
      id: userId,
      nickname: getRandomNickname(),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
