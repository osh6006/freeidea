import { imageFileSchema } from '@/lib/zod/image-file';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

export interface FeedProduct {
  positionX: number;
  positionY: number;
  productId?: string;
  productImageUrl?: string;
  title?: string;
  price?: number;
  registerStatus?: string;
  nickname?: string;
}

export type FileInfo = {
  feedImageId: string;
  feedImageUrl: string;
  products?: FeedProduct[];
};

type State = {
  step: number;
  selectedFileInfos: FileInfo[];
  alertInfo: {
    isOpen: boolean;
    title: string;
    mode: 'full-single' | 'full-double' | 'end-double' | 'login';
    desc: string;
    textAlign: 'text-start' | 'text-center';
    onConfirm: () => void;
  };
  contents: string;
  globalLoading: boolean;
};

type Action = {
  setStep: (step: State['step']) => void;
  setFileInfos: ({
    fileInfos,
    isNext,
  }: {
    fileInfos: FileInfo[];
    isNext?: boolean;
  }) => void;

  setContents: (contents: string) => void;

  addFileInfos: (fileInfo: FileInfo[]) => void;
  deleteFileInfo: (idx: number) => void;

  addTagPosition: ({
    idx,
    posX,
    posY,
  }: {
    idx: number;
    posX: number;
    posY: number;
  }) => void;

  addTagProduct: ({
    fileIdx,
    tagIdx,
    product,
  }: {
    fileIdx: number;
    tagIdx: number;
    product: FeedProduct;
  }) => void;

  deleteTag: ({ fileIdx, tagIdx }: { fileIdx: number; tagIdx: number }) => void;

  notProductClear: () => void;
  reset: () => void;

  setAlert: ({
    isOpen,
    title,
    mode,
    desc,
    textAlign,
    onConfirm,
  }: {
    isOpen: boolean;
    title: string;
    mode: 'full-single' | 'full-double' | 'end-double' | 'login';
    desc: string;
    textAlign: 'text-start' | 'text-center';
    onConfirm: () => void;
  }) => void;

  setAlertOpen: (isOpen: boolean) => void;

  setAllData: ({
    fileInfos,
    contents,
  }: {
    fileInfos: FileInfo[];
    contents: string;
  }) => void;

  setGlobalLoading: (isLoading: boolean) => void;
};

const MIN_STEP = 1;
const MAX_STEP = 3;

export const useFeedWriteStore = create<State & Action>((set) => ({
  step: MIN_STEP,
  selectedFileInfos: [],
  alertInfo: {
    isOpen: false,
    title: '',
    mode: 'end-double',
    desc: '',
    textAlign: 'text-center',
    onConfirm: () => {},
  },
  contents: '',
  globalLoading: false,

  setStep: (step) =>
    set(() => {
      if (step > MAX_STEP || step < MIN_STEP) {
        return {};
      }
      return { step };
    }),

  setContents: (contents: string) =>
    set(() => {
      return { contents };
    }),

  setFileInfos: ({ fileInfos, isNext }) =>
    set((state) => {
      if (isNext) {
        return {
          step: state.step + 1,
          selectedFileInfos: [...fileInfos],
        };
      }

      return {
        selectedFileInfos: [...fileInfos],
      };
    }),

  addFileInfos: (fileInfos) =>
    set((state) => {
      return {
        selectedFileInfos: [...state.selectedFileInfos, ...fileInfos],
      };
    }),

  deleteFileInfo: (idx) =>
    set((state) => ({
      selectedFileInfos: state.selectedFileInfos.filter(
        (_, index) => index !== idx
      ),
    })),

  addTagPosition: ({ idx, posX, posY }) =>
    set((state) => {
      const validInfo = checkTagsLength([...state.selectedFileInfos]);
      if (!validInfo.success) {
        return {
          alertInfo: {
            isOpen: true,
            title: validInfo.message || '',
            mode: 'full-single',
            desc: '',
            textAlign: 'text-center',
            onConfirm: () => {},
          },
        };
      }

      const clearTag = productGarbageCollect(state.selectedFileInfos);

      return {
        selectedFileInfos: clearTag.map((info, i) => {
          if (i !== idx) return info;

          const tags = [...(info.products || [])];

          return {
            ...info,
            products: [
              ...tags,
              { positionX: posX, positionY: posY, product: undefined },
            ],
          };
        }),
      };
    }),

  addTagProduct: ({ fileIdx, tagIdx, product }) =>
    set((state) => {
      const updateTags = (products: FeedProduct[], product: FeedProduct) =>
        products?.map((tag, idx) => {
          if (idx === tagIdx) {
            return {
              ...product,
            };
          }
          return tag;
        });

      const updateFileInfo = (
        fileInfo: FileInfo,
        fileIdx: number,
        index: number
      ) =>
        index === fileIdx
          ? {
              ...fileInfo,
              products: updateTags(fileInfo.products || [], product),
            }
          : fileInfo;

      return {
        selectedFileInfos: state.selectedFileInfos.map((fileInfo, index) =>
          updateFileInfo(fileInfo, fileIdx, index)
        ),
      };
    }),

  deleteTag: ({ fileIdx, tagIdx }) =>
    set((state) => {
      const updateTags = (fileInfo: FileInfo, i: number) => {
        if (i !== fileIdx) return fileInfo;

        return {
          ...fileInfo,
          products: fileInfo.products?.filter((_, tagI) => tagI !== tagIdx),
        };
      };

      return {
        selectedFileInfos: state.selectedFileInfos.map(updateTags),
      };
    }),

  notProductClear: () =>
    set((state) => {
      return {
        selectedFileInfos: [...productGarbageCollect(state.selectedFileInfos)],
      };
    }),

  reset: () =>
    set(() => ({
      step: MIN_STEP,
      selectedFileInfos: [],
      alertInfo: {
        isOpen: false,
        title: '',
        mode: 'end-double',
        desc: '',
        textAlign: 'text-center',
        onConfirm: () => {},
      },
      contents: '',
      globalLoading: false,
    })),

  setAlert({ isOpen, title, mode, desc, textAlign, onConfirm }) {
    return set((state) => ({
      alertInfo: {
        ...state.alertInfo,
        isOpen,
        title,
        mode,
        desc,
        textAlign,
        onConfirm,
      },
    }));
  },

  setAlertOpen(isOpen) {
    return set((state) => ({
      alertInfo: {
        ...state.alertInfo,
        isOpen,
      },
    }));
  },

  setAllData({ fileInfos, contents }) {
    return set((state) => ({
      selectedFileInfos: fileInfos,
      contents,
    }));
  },

  setGlobalLoading(isLoading) {
    return set(() => ({
      globalLoading: isLoading,
    }));
  },
}));

export const useFeedWriteActions = () =>
  useFeedWriteStore((state) => ({
    ...state,
  }));

export const useFeedWriteStates = () =>
  useFeedWriteStore(useShallow((state) => ({ ...state })));

export function checkFiles(
  currentFiles: FileInfo[],
  newfiles: File[]
): {
  success: boolean;
  message?: string;
} {
  if (currentFiles.length + newfiles.length > 10) {
    return {
      success: false,
      message: '이미지는 최대 10개까지 등록할 수 있어요!',
    };
  }

  for (const file of newfiles) {
    const result = imageFileSchema.safeParse(file);

    if (!result.success)
      return {
        success: result.success,
        message: result.error.errors[0].message,
      };
  }

  return { success: true };
}

function checkTagsLength(fileInfo: FileInfo[]): {
  success: boolean;
  message?: string;
} {
  const count = fileInfo.reduce((prev, curr) => {
    return (prev += curr.products?.length || 0);
  }, 0);

  if (count >= 10) {
    return {
      success: false,
      message: '태그는 10개 이상 등록할 수 없어요!',
    };
  }

  return {
    success: true,
  };
}

function productGarbageCollect(files: FileInfo[]) {
  return files.map((info) => {
    const clearTags =
      info.products?.filter((product) => !!product.productId) || [];
    return { ...info, products: clearTags };
  });
}
