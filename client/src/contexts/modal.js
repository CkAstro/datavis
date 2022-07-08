import { useState, useContext, createContext } from 'react';

const ModalContext = createContext(); 

const defaultParams = {
   content: '',
   isActive: false,
}

const ModalProvider = ({ children }) => {
   const [ modalParams, setModalParams ] = useState(defaultParams);

   return (
      <ModalContext.Provider value={[modalParams, setModalParams]}>
         {children}
      </ModalContext.Provider>
   );
}

const useModal = () => {
   const [ modalParams, setModalParams ] = useContext(ModalContext);

   const setModalContent = content => setModalParams({ content: content, isActive: true });
   const closeModal = () => setModalParams({ ...modalParams, isActive: false });

   return {
      modalParams,
      setModalContent,
      closeModal,
   }
}

export { ModalProvider, useModal };