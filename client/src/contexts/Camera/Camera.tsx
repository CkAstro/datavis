import { useState, useEffect, useContext, createContext, useMemo } from 'react';
import type { CameraInterface, CameraOptions, MouseLocation } from '@/types';

type ProviderInterface = {
   options: CameraOptions;
   setOptions: React.Dispatch<React.SetStateAction<CameraOptions>>;
};

const CameraContext = createContext<ProviderInterface | null>(null);

const defaultOptions: CameraOptions = {
   compare: false,
   linked: true,
   lastActive: 0,
   camera: [
      { zoom: -3.0, azi: 0.0, pol: 0.0 },
      { zoom: -3.0, azi: 0.0, pol: 0.0 },
   ],
};

// BUG FIX
// note : this may be related to a 'passive event listener' issue
//    with React; see https://github.com/facebook/react/issues/19651
// note : this may also be related to bug in Reversi code where 'set'
//    function is called multiple times too quickly;
//    see 'client/src/contexts/gameinfo.js'
//
// issue : any time moveCamera is called from 'handleScroll()' in
//    'GL2Canvas' (it works fine from 'handleMouseMove()' even if
//    'zoom' argument is non-zero), both 'options.compare' and
//    'options.linked' are reset to default values, while
//    'options.camera' is updated as normal. This reset occurs
//    prior to the function call, so 'options.camera[0]' always
//    receives the 'zoom' update.
//     - canvas also seems to redraw on scroll and we cannot pass
//       bounding rect info; we instead get via getElementById()
//
// fix : since 'options' keeps partially resetting, we copy it and
//    use that copy to build 'newOptions' for 'setOptions()' call
//    we then add a 'useEffect()' to watch for 'options' change and
//    recopy options to '_BUGFIX_options' on update
let optionBUGFIX: CameraOptions = { ...defaultOptions };

const CameraProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
   const [options, setOptions] = useState<CameraOptions>(defaultOptions);
   const camera = useMemo(() => ({ options, setOptions }), [options]);

   return <CameraContext.Provider value={camera}>{children}</CameraContext.Provider>;
};

const useCamera = (): CameraInterface => {
   const camera: ProviderInterface = useContext(CameraContext)!;

   // should only be used for loading from saved session
   const setAllOptions = (opts: CameraOptions): void => {
      const newOptions = { ...opts };
      camera.setOptions(newOptions);
   };

   // toggle compare mode (1 vs 2 viewports)
   const toggleCompare = (): void => {
      const compare = !camera.options.compare;
      camera.setOptions({ ...camera.options, compare });
   };

   // toggle linked mode (viewports work together or separately)
   const toggleLinked = (): void => {
      if (!camera.options.compare) return;
      const linked = !camera.options.linked;
      const newCamera = camera.options.camera.slice();
      const mainCamera = newCamera[0];
      if (!linked) newCamera[1] = mainCamera;
      camera.setOptions({ ...camera.options, linked, camera: newCamera });
   };

   // move camera (rotate/zoom)
   const moveCamera = (clickLocation: MouseLocation, dz: number, da: number, dp: number): void => {
      const canvas = document.getElementById('glCanvas')!;

      // use click location to determine which viewport we are on
      const { top, left, width } = canvas.getBoundingClientRect();
      const location = { x: clickLocation.x! - left, y: clickLocation.y! - top };

      const newOptions = { ...optionBUGFIX }; // see comment below for bugfix
      const activeCamera =
         newOptions.compare && !newOptions.linked && location.x > width / 2.0 ? 1 : 0;
      newOptions.lastActive = activeCamera;
      newOptions.camera[activeCamera] = {
         zoom: newOptions.camera[activeCamera].zoom - dz,
         azi: newOptions.camera[activeCamera].azi - da,
         pol: newOptions.camera[activeCamera].pol - dp,
      };
      camera.setOptions(newOptions);
   };

   // snap camera to axis
   const snapCamera = (direction: 'x' | 'y' | 'z'): void => {
      const newOptions = { ...optionBUGFIX }; // see comment below for bugfix
      const cameraInd = newOptions.compare && !newOptions.linked ? newOptions.lastActive : 0;
      if (direction === 'x') {
         newOptions.camera[cameraInd].azi = 150;
         newOptions.camera[cameraInd].pol = 0;
      } else if (direction === 'y') {
         newOptions.camera[cameraInd].azi = 0;
         newOptions.camera[cameraInd].pol = 125;
      } else {
         newOptions.camera[cameraInd].azi = 0;
         newOptions.camera[cameraInd].pol = 0;
      }
      camera.setOptions(newOptions);
   };

   useEffect(() => {
      optionBUGFIX = { ...camera.options }; // see comment below for bugfix
   }, [camera.options]);

   return {
      options: camera.options,
      setAllOptions,
      toggleCompare,
      toggleLinked,
      moveCamera,
      snapCamera,
   };
};

export { CameraProvider, useCamera };
