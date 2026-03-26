import { type Database } from "./database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];

export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];

export type Post = PostEntity & { author: ProfileEntity };

export type UseMutationCallbacks = {
  onSuccess?: () => void;
  onMutate?: () => void;
  onSettled?: () => void;
  onError: (error: Error) => void;
};
