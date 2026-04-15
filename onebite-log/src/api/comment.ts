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

/**
 * fetchComments, 댓글 조회 비동기 함수
 *
 * [기능]
 * - 특정 게시글(postId)에 해당하는 댓글 목록 조회
 * - profile 테이블과 join하여 작성자 정보(author) 포함
 * - created_at 기준 최신순 정렬
 *
 * [동작 방식]
 * - Supabase Query Builder를 사용하여 select 쿼리 생성
 * - "author: profile!author_id (*)" 문법으로 외래키 기반 join 수행
 *   → comment.author_id = profile.id 관계를 이용
 * - eq("post_id", postId)로 특정 게시글의 댓글만 필터링
 * - await 시점에 실제 API 요청 실행
 *
 * [특징]
 * - 댓글 데이터 + 작성자 정보(author)를 함께 반환 (UI 렌더링 최적화)
 * - author는 profile 테이블의 전체 컬럼(*)을 포함한 객체로 반환됨
 * - 최신 댓글이 상단에 위치하도록 정렬
 */

export async function fetchComments(postId: number) {
  const { data, error } = await supabase
    .from("comment")
    .select("*, author: profile!author_id (*)")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

/**
 * updateComment, 댓글 수정 비동기 함수
 *
 * [기능]
 * - 특정 댓글(id)에 대해 내용(content)을 수정
 *
 * [동작 방식]
 * - Supabase Query Builder를 사용하여 update 쿼리 생성
 * - update({ content })로 댓글 내용 수정
 * - eq("id", id)로 특정 댓글 1개를 대상으로 필터링
 * - select().single()을 통해 수정된 단일 댓글 데이터 반환
 * - await 시점에 실제 API 요청 실행
 *
 * [특징]
 * - 수정된 최신 댓글 데이터를 즉시 반환 (UI 동기화 용이)
 * - id를 기준으로 단일 댓글만 업데이트되도록 보장
 */

export async function updateComment({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  const { data, error } = await supabase
    .from("comment")
    .update({ content })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
