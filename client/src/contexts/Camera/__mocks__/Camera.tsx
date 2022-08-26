/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CameraInterface, CameraOptions, MouseLocation } from '@/types';

const options: CameraOptions = {
   compare: false,
   linked: true,
   lastActive: 0,
   camera: [
      { zoom: -3.0, azi: 0.0, pol: 0.0 },
      { zoom: -3.0, azi: 0.0, pol: 0.0 },
   ],
};

const setAllOptions = (opts: CameraOptions): void => {
   options.compare = opts.compare;
   options.linked = opts.linked;
   options.lastActive = opts.lastActive;
   options.camera = opts.camera;
};

const toggleCompare = (): void => {
   options.compare = !options.compare;
};

const toggleLinked = (): void => {
   if (!options.compare) return;
   options.linked = !options.linked;
   const mainCamera = options.camera[0];
   if (!options.linked) options.camera[1] = mainCamera;
};

// not testing for now
const moveCamera = (clickLocation: MouseLocation, dz: number, da: number, dp: number): void =>
   undefined;

// not testing for now
const snapCamera = (direction: 'x' | 'y' | 'z'): void => undefined;

const useCamera = (): CameraInterface => ({
   options,
   setAllOptions,
   toggleCompare,
   toggleLinked,
   moveCamera,
   snapCamera,
});

export default useCamera;
export { useCamera };
