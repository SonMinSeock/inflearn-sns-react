import { fetchComments } from "@/api/comment";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

/**
 * useCommentsData, 댓글 조회 Tanstack Query 커스텀 훅
 *
 * [기능]
 * - 특정 게시글(postId)의 댓글 목록 조회
 * - fetchComments API 호출
 *
 * [동작 방식]
 * - queryKey에 postId를 포함하여 게시글별 캐시 분리
 * - queryFn에서 댓글 데이터 요청
 *
 * [특징]
 * - 동일 postId 요청 시 캐시 데이터 재사용 (성능 최적화)
 * - postId가 변경되면 자동으로 재요청 수행
 */

export function useCommentsData(postId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.comment.post(postId),
    queryFn: () => fetchComments(postId),
  });
}
