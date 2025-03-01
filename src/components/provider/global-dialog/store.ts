import { create } from 'zustand';

interface GlobalDialogStore {
  isLoginDialogOpen: boolean;
  isNeedLoginDialogOpen: boolean;
  isAuthorLevelDialogOpen: boolean;
  isUseMembershipDialogOpen: boolean;

  setIsLoginDialogOpen: (isOpen: boolean) => void;
  setIsNeedLoginDialogOpen: (isOpen: boolean) => void;
  setIsAuthorLevelDialogOpen: (isOpen: boolean) => void;
  setIsUseMembershipDialogOpen: (isOpen: boolean) => void;
}

export const useGlobalDialogStore = create<GlobalDialogStore>((set) => ({
  isLoginDialogOpen: false,
  isNeedLoginDialogOpen: false,
  isAuthorLevelDialogOpen: false,
  isUseMembershipDialogOpen: false,

  setIsLoginDialogOpen: (isOpen) =>
    set((state) => ({
      ...state,
      isLoginDialogOpen: isOpen,
    })),
  setIsNeedLoginDialogOpen: (isOpen) =>
    set((state) => ({
      ...state,
      isNeedLoginDialogOpen: isOpen,
    })),
  setIsAuthorLevelDialogOpen: (isOpen) =>
    set((state) => ({
      ...state,
      isAuthorLevelDialogOpen: isOpen,
    })),

  setIsUseMembershipDialogOpen: (isOpen) =>
    set((state) => ({
      ...state,
      isUseMembershipDialogOpen: isOpen,
    })),
}));
