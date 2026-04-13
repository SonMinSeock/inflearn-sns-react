/**
 * Tanstack Query의 쿼리 키 팩토리 상수
 */

export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId: string) => ["profile", "byId", userId],
  },
  post: {
    all: ["post"],
    list: ["post", "list"],
    userList: (userId: string) => ["post", "userList", userId], // 유저별 포스트
    byId: (postId: number) => ["post", "byId", postId],
  },
  comment: {
    all: ["comment"],
    post: (postId: number) => ["comment", "post", postId], // 특정 게시글(postId)에 해당하는 댓글 목록 조회용 key
  },
};

/**
 * 버킷 상수
 */
export const BUCKET_NAME = "uploads";
