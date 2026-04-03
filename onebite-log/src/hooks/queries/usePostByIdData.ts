/**
 * 해당 포스트 조회에 대한 Tanstack Query의 Query 커스텀 훅
 */

import { fetchPostById } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function usePostByIdData({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL";
}) {
  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () => fetchPostById(postId),
    enabled: type === "FEED" ? false : true, // 피드일때만 queryFn 실행하지 않고 캐싱 데이터 활용하도록 할려고한다.
  });
}
