import { create } from 'zustand';

type AccordionStoreState = { expended: boolean };
type AccordionStoreAction = { setExpended: (expended: boolean) => void };
type AccordionStore = AccordionStoreState & AccordionStoreAction;

export const useAccordionStore = create<AccordionStore>((set) => ({
  expended: false,
  setExpended: (expended) => set({ expended }),
}));
