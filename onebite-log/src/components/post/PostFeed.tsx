import Fallback from "../Fallback";
import Loader from "../Loader";
import PostItem from "./PostItem";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useInfinitePostData } from "@/hooks/queries/useInfinitePostData";

export default function PostFeed() {
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfinitePostData();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      // 데이터 추가
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <Fallback />;

  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {data.pages.map((page) =>
        page.map((postId) => <PostItem key={postId} postId={postId} />),
      )}
      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}
