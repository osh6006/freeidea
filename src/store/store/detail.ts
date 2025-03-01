import { create } from 'zustand';

type ViewState = {
  isDescInView: boolean;
  isReviewInView: boolean;
};

type ViewAction = {
  setIsDescInView: (isInView: boolean) => void;
  setIsReviewInView: (isInView: boolean) => void;
};

export const useInViewStore = create<ViewState & ViewAction>((set) => ({
  isDescInView: false,
  isReviewInView: false,

  setIsDescInView: (isInView: boolean) => set({ isDescInView: isInView }),
  setIsReviewInView: (isInView: boolean) => set({ isReviewInView: isInView }),
}));
