import { useState, useEffect, useContext, createContext } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
   const [ modalContent, setModalContent ] = useState(null);

   return (
      <ModalContext.Provider value={[modalContent, setModalContent]}>
         {children}
      </ModalContext.Provider>
   );
}

const useModal = () => {
   const [ modalContent, setModalContent ] = useContext(ModalContext);

   const updateModal = content => setModalContent(content);

   return {
      modalContent,
      updateModal,
   }
}

export { ModalProvider, useModal };