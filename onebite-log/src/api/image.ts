import { BUCKET_NAME } from "@/lib/constants";
import supabase from "@/lib/supabase";

/**
 * 스토리지 이미지 API 비동기 코드 파일
 * -> 업로드 한 이미지의 주소를 반환 한다.
 */
export async function uploadImage({
  file,
  filePath,
}: {
  file: File;
  filePath: string;
}) {
  // supabase storage의 버킷 id 입력
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (error) throw error;

  // 업로드 한 이미지의 url을 반환 해준다.
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

  return publicUrl;
}
