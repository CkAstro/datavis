
const useModal = () => {

   const modalParams = {
      content: '',
      isActive: false,
   }

   const setModalContent = content => {
      modalParams.content = content;
      modalParams.isActive = true;
   }

   const closeModal = () => modalParams.isActive = false;

   return {
      modalParams,
      setModalContent,
      closeModal,
   }
}

export { useModal };