import { useMemo } from 'react';
import handlePointerDown from './handlepointerdown';
import handlePointerLeave from './handlepointerleave';
import handlePointerMove from './handlepointermove';
import handlePointerUp from './handlepointerup';
import handleWheel from './handlewheel';

const getEventHandlers = ({
   isActive,
   setIsActive,
   mouseLocation,
   setMouseLocation,
   clickLocation,
   setClickLocation,
   moveCamera,
}) =>
   useMemo(
      () => ({
         onWheel: (e) => handleWheel(e, moveCamera),
         onPointerUp: (e) => handlePointerUp(e, setIsActive),
         onPointerDown: (e) =>
            handlePointerDown(
               e,
               setMouseLocation,
               setClickLocation,
               setIsActive
            ),
         onPointerLeave: (e) => handlePointerLeave(e, setIsActive),
         onPointerMove: (e) =>
            handlePointerMove(
               e,
               isActive,
               moveCamera,
               mouseLocation,
               clickLocation,
               setMouseLocation
            ),
         onPointerOver: () => {},
         onPointerOut: () => {},
         onPointerEnter: () => {},
         onClick: () => {},
         onDoubleClick: () => {},
      }),
      []
   );

export default getEventHandlers;
