/**
 * 프로필 관련 비동기 코드 파일
 */

import supabase from "@/lib/supabase";
import { getRandomNickname } from "@/lib/utils";
import { deleteImagesInPath, uploadImage } from "./image";

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

/**
 * updateProfile, 프로필 수정 요청 비동기 함수
 */

export async function updateProfile({
  userId,
  nickname,
  bio,
  avatarImageFile,
}: {
  userId: string;
  nickname?: string;
  bio?: string;
  avatarImageFile?: File;
}) {
  // 프로필 수정 과정
  // 1. 스토리지에 등록된 아바타 이미지를 삭제
  // 유저 아바타 이미지는 'userId/avatar' 경로로 스토리지에 관리하고자 한다.
  if (avatarImageFile) {
    await deleteImagesInPath(`${userId}/avatar`);
  }

  // 2. 새로운 아바타 이미지를 스토리지에 업로드
  let newAvatarImageUrl;

  if (avatarImageFile) {
    const fileExtension = avatarImageFile.name.split(".").pop() || "webp";
    const filePath = `${userId}/avatar/${new Date().getTime()}-${crypto.randomUUID()}.${fileExtension}`;

    newAvatarImageUrl = await uploadImage({ file: avatarImageFile, filePath });
  }

  // 3. 프로필 테이블 수정
  const { data, error } = await supabase
    .from("profile")
    .update({
      nickname,
      bio,
      avatar_url: newAvatarImageUrl,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
}
