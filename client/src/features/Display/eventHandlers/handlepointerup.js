const handlePointerUp = (event, setIsActive) => {
   event.preventDefault();
   setIsActive(false);
};

export default handlePointerUp;
