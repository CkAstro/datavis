const handleWheel = (event, moveCamera) => {
   const zoom = event.deltaY / 1000;
   const mouse = { x: event.clientX, y: event.clientY };
   moveCamera(mouse, zoom, 0, 0);
};

export default handleWheel;
