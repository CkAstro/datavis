import type { ModalParams, ModalInterface } from '@/types';

const useModal = (): ModalInterface => {
   const modalParams: ModalParams = {
      content: '',
      isActive: false,
   };

   const setModalContent = (content: string | React.ReactNode): void => {
      modalParams.content = content;
      modalParams.isActive = true;
   };

   const closeModal = (): void => {
      modalParams.isActive = false;
   };

   return {
      modalParams,
      setModalContent,
      closeModal,
   };
};

export default useModal;
export { useModal };
