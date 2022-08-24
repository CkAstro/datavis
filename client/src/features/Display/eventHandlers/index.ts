import type { MouseLocation } from '@/types';
import handlePointerDown from './handlepointerdown';
import handlePointerLeave from './handlepointerleave';
import handlePointerMove from './handlepointermove';
import handlePointerUp from './handlepointerup';
import handleWheel from './handlewheel';

type Props = {
   isActive: React.MutableRefObject<boolean>;
   setIsActive: (val: boolean) => void;
   mouseLocation: React.MutableRefObject<MouseLocation>;
   setMouseLocation: (val: MouseLocation) => void;
   clickLocation: React.MutableRefObject<MouseLocation>;
   setClickLocation: (val: MouseLocation) => void;
   moveCamera: (loc: MouseLocation, dz: number, da: number, dp: number) => void;
};

const getEventHandlers = ({
   isActive,
   setIsActive,
   mouseLocation,
   setMouseLocation,
   clickLocation,
   setClickLocation,
   moveCamera,
}: Props): Record<string, unknown> => ({
   onWheel: (e: WheelEvent) => handleWheel(e, moveCamera),
   onPointerUp: (e: PointerEvent) => handlePointerUp(e, setIsActive),
   onPointerDown: (e: PointerEvent) =>
      handlePointerDown(e, setMouseLocation, setClickLocation, setIsActive),
   onPointerLeave: (e: PointerEvent) => handlePointerLeave(e, setIsActive),
   onPointerMove: (e: PointerEvent) =>
      handlePointerMove(e, isActive, moveCamera, mouseLocation, clickLocation, setMouseLocation),
   onPointerOver: () => undefined,
   onPointerOut: () => undefined,
   onPointerEnter: () => undefined,
   onClick: () => undefined,
   onDoubleClick: () => undefined,
});

export default getEventHandlers;
