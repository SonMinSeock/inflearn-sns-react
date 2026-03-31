import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type CloseState = {
  isOpen: false;
};

type CreateMode = {
  isOpen: true;
  type: "CREATE";
};

type EditMode = {
  isOpen: true;
  type: "EDIT";
  postId: number;
  content: string;
  imageUrls: string[] | null;
};

type OpenState = CreateMode | EditMode;

type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
} as State;

/**
 * 모달 스토어
 */
const usePostEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        openCreate: () => {
          set({
            type: "CREATE",
            isOpen: true,
          });
        },
        openEdit: (param: Omit<EditMode, "isOpen" | "type">) => {
          set({
            type: "EDIT",
            isOpen: true,
            ...param,
          });
        },
        close: () => {
          set({
            isOpen: false,
          });
        },
      },
    })),
    {
      name: "postEditorModalStore",
    },
  ),
);

export const useOpenCreatePostModal = () => {
  const openCreate = usePostEditorModalStore(
    (store) => store.actions.openCreate,
  );

  return openCreate;
};

export const useOpenEditPostModal = () => {
  const openEdit = usePostEditorModalStore((store) => store.actions.openEdit);

  return openEdit;
};

export const usePostEditorModal = () => {
  const store = usePostEditorModalStore();

  return store as typeof store & State;
};
