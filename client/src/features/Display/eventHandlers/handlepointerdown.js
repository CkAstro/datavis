const handlePointerDown = (
   event,
   setMouseLocation,
   setClickLocation,
   setIsActive
) => {
   event.preventDefault();
   const { clientX, clientY } = event;
   setMouseLocation({ x: clientX, y: clientY });
   setClickLocation({ x: clientX, y: clientY });
   setIsActive(true);
};

export default handlePointerDown;
