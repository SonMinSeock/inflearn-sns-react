import CommentEditor from "@/components/comment/CommentEditor";
import CommentList from "@/components/comment/CommentList";
import PostItem from "@/components/post/PostItem";
import { Navigate, useParams } from "react-router";

export default function PostDetailPage() {
  const { postId } = useParams();

  if (!postId) return <Navigate to={"/"} replace />;

  return (
    <div className="flex flex-col gap-5">
      <PostItem type="DETAIL" postId={Number(postId)} />
      <div className="text-xl font-bold">댓글</div>
      <CommentEditor postId={Number(postId)} />
      <CommentList />
    </div>
  );
}
