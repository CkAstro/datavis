const handlePointerMove = (
   event,
   isActive,
   moveCamera,
   mouseLocation,
   clickLocation,
   setMouseLocation
) => {
   event.preventDefault();
   if (!isActive.current) return;
   const { clientX, clientY } = event;
   const deltaX = mouseLocation.current.x - clientX;
   const deltaY = mouseLocation.current.y - clientY;

   moveCamera(clickLocation.current, 0, deltaX, deltaY);
   setMouseLocation({ x: clientX, y: clientY });
};

export default handlePointerMove;
