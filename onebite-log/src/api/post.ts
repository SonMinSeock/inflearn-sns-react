/**
 * 포스트 관련 비동기 코드 파일
 */

import supabase from "@/lib/supabase";
import { uploadImage } from "./image";
import type { PostEntity } from "@/types";

/**
 * createPost, 포스트 생성 요청 비동기 함수
 */
export async function createPost(content: string) {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content: content,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * cratePostWithImages, 포스트 생성 요청과 이미지 생성 요청 비동기 함수
 */
export async function cratePostWithImages({
  content,
  images,
  userId,
}: {
  content: string;
  images: File[];
  userId: string;
}) {
  // 1. 새로운 포스트 생성
  const post = await createPost(content);

  if (images.length === 0) return post;

  try {
    // 2. 스토리지에 이미지 업로드
    // 이미지를 병렬로 업로드한다.
    const imageUrls = await Promise.all(
      images.map((image) => {
        // 파일 확장자 추출
        const fileExtension = image.name.split(".").pop() || "webp";
        // 파일 이름 작성
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        // 파일 경로
        const filePath = `${userId}/${post.id}/${fileName}`;

        return uploadImage({ file: image, filePath: filePath });
      }),
    );

    // 3. 포스트 테이블 업데이트
    const updatedPost = await updatePost({
      id: post.id,
      img_urls: imageUrls,
    });

    return updatedPost;
  } catch (error) {
    await deletePost(post.id);
    throw error;
  }
}

/**
 * updatePost, 포스트 수정
 *
 * -> post 인자는 Partial<PostEntity> & { id: number } 타입을 사용한다.
 *    - PostEntity의 모든 필드는 optional로 받는다. (부분 업데이트 가능)
 *    - 단, id는 필수로 받아 어떤 게시글을 수정할지 식별한다.
 *
 * -> Supabase의 update는 전달된 필드만 변경하므로,
 *    필요한 필드만 선택적으로 전달하면 된다.
 *
 * -> eq("id", post.id)
 *    - id가 일치하는 특정 row만 업데이트한다.
 *
 * -> select().single()
 *    - 업데이트된 결과를 반환받는다.
 *    - single()을 사용하여 단일 객체 형태로 응답을 받는다.
 *
 * -> 에러 발생 시 throw하여 상위 로직에서 처리하도록 한다.
 */
export async function updatePost(post: Partial<PostEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * deletePost, 포스트 삭제
 */
export async function deletePost(id: number) {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
