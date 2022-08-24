import { useState, useContext, createContext, useMemo } from 'react';
import type { ModalParams, ModalInterface } from '@/types';

type ProviderInterface = {
   modalParams: ModalParams;
   setModalParams: React.Dispatch<React.SetStateAction<ModalParams>>;
};

const ModalContext = createContext<ProviderInterface | null>(null);

const defaultParams: ModalParams = {
   content: '',
   isActive: false,
};

const ModalProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
   const [modalParams, setModalParams] = useState<ModalParams>(defaultParams);
   const modal = useMemo(() => ({ modalParams, setModalParams }), [modalParams]);

   return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>;
};

const useModal = (): ModalInterface => {
   const modal: ProviderInterface = useContext(ModalContext)!;

   const setModalContent = (content: string | React.ReactNode): void =>
      modal.setModalParams({ content, isActive: true });
   const closeModal = (): void => modal.setModalParams({ ...modal.modalParams, isActive: false });

   return {
      modalParams: modal.modalParams,
      setModalContent,
      closeModal,
   };
};

export { ModalProvider, useModal };
