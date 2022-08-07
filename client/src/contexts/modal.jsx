import { useState, useContext, createContext, useMemo } from 'react';

const ModalContext = createContext();

const defaultParams = {
   content: '',
   isActive: false,
};

function ModalProvider({ children }) {
   const [modalParams, setModalParams] = useState(defaultParams);
   const modal = useMemo(
      () => ({ modalParams, setModalParams }),
      [modalParams]
   );

   return (
      <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
   );
}

const useModal = () => {
   const modal = useContext(ModalContext);

   const setModalContent = (content) =>
      modal.setModalParams({ content, isActive: true });
   const closeModal = () =>
      modal.setModalParams({ ...modal.modalParams, isActive: false });

   return {
      modalParams: modal.modalParams,
      setModalContent,
      closeModal,
   };
};

export { ModalProvider, useModal };
