/**
 * 포스트 관련 비동기 코드 파일
 */

import supabase from "@/lib/supabase";

/**
 * createPost, 포스트 생성 요청 비동기 함수
 */
export async function createPost(content: string) {
  const { data, error } = await supabase.from("post").insert({
    content: content,
  });

  if (error) throw error;

  return data;
}
