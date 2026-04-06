import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export function useInfinitePostData(authorId?: string) {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: !authorId
      ? QUERY_KEYS.post.list
      : QUERY_KEYS.post.userList(authorId),
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const posts = await fetchPosts({ from, to, authorId });

      posts.forEach((post) =>
        queryClient.setQueryData(QUERY_KEYS.post.byId(post.id), post),
      );
      return posts.map((post) => post.id);
    },
    initialPageParam: 0, // 첫 페이지
    getNextPageParam: (lastPage, allPages) => {
      // 다음페이지 계산
      if (lastPage.length < PAGE_SIZE) return undefined; // 다음페이지 없다고 undefined 보낸다.
      return allPages.length;
    },
    staleTime: Infinity,
  });
}
