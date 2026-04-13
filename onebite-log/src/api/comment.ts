/**
 * 포스트 관련 비동기 코드 파일
 */

import supabase from "@/lib/supabase";

/**
 * createComment, 댓글 생성 비동기 함수
 *
 * [기능]
 * - comment 테이블에 새로운 댓글 데이터 생성
 * - post_id를 통해 특정 게시글과 연결
 * - content를 저장하여 댓글 내용 등록
 *
 * [동작 방식]
 * - Supabase Query Builder를 사용하여 insert 쿼리 생성
 * - insert 이후 select().single()을 통해 생성된 데이터 반환
 * - await 시점에 실제 API 요청 실행
 *
 * [특징]
 * - 생성된 댓글 데이터를 즉시 반환하여 UI 업데이트에 활용 가능
 * - post_id는 외래키로 post 테이블과 관계를 가짐
 * - 인증된 사용자 기준으로 author_id는 DB(RLS/trigger)에서 자동 처리 가능
 */

export async function createComment({
  postId,
  content,
}: {
  postId: number;
  content: string;
}) {
  const { data, error } = await supabase
    .from("comment")
    .insert({ post_id: postId, content })
    .select()
    .single();

  if (error) throw error;

  return data;
}
