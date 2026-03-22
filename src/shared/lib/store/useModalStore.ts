import { create } from 'zustand';

type TModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useModalStore = create<TModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
