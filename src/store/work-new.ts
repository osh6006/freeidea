import { create } from 'zustand';

type TermStoreState = { isTermAgreed: boolean };
type TermStoreAction = { agree: () => void };
type TermStroe = TermStoreState & TermStoreAction;

export const useTermStore = create<TermStroe>((set) => ({
  isTermAgreed: false,
  agree: () => set({ isTermAgreed: true }),
}));
