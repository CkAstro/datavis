import { useState, useEffect, useContext, createContext } from "react";

const CameraContext = createContext();

const defaultOptions = {
   compare: false,
   linked: true,
   camera: [
      { zoom: -3.0, azi: 0.0, pol: 0.0 },
      { zoom: -3.0, azi: 0.0, pol: 0.0 },
   ],
}

const CameraProvider = ({ children }) => {
   const [ options, setOptions ] = useState(defaultOptions);

   return (
      <CameraContext.Provider value={[options, setOptions]}>
         {children}
      </CameraContext.Provider>
   );
}

const useCamera = () => {
   const [ options, setOptions ] = useContext(CameraContext);

   const setAllOptions = opts => {
      const newOptions = { ...opts };
      setOptions(newOptions);
   }

   const toggleCompare = () => {
      const compare = !options.compare;
      setOptions({ ...options, compare: compare });
   }

   const toggleLinked = () => {
      if (!options.compare) return;
      const linked = !options.linked;
      const newCamera = options.camera.slice();
      if (!linked) newCamera[1] = newCamera[0];
      setOptions({ ...options, linked: linked, camera: newCamera });
   }

   const moveCamera = (clickLocation, dz, da, dp) => {
      const canvas = document.getElementById('glCanvas');
      const {top, left, width } = canvas.getBoundingClientRect();
      const location = {x: clickLocation.x-left, y: clickLocation.y-top}

      const newOptions = { ..._BUGFIX_options };   // see comment below for bugfix
      const activeCamera = (newOptions.compare && !newOptions.linked && location.x > width/2.0) ? 1 : 0;
      newOptions.camera[activeCamera] = {
         zoom: newOptions.camera[activeCamera].zoom - dz,
         azi: newOptions.camera[activeCamera].azi - da,
         pol: newOptions.camera[activeCamera].pol - dp,
      }
      setOptions(newOptions);
   }

   const snapCamera = (cameraInd, direction) => {
      const newOptions = { ...options };
      if (direction === 'x' || direction === 'X') {
         newOptions.camera[cameraInd].azi = 150;
         newOptions.camera[cameraInd].pol = 0;
      } else if (direction === 'y' || direction === 'Y') {
         newOptions.camera[cameraInd].azi = 0;
         newOptions.camera[cameraInd].pol = 125;
      } else if (direction === 'z' || direction === 'Z') {
         newOptions.camera[cameraInd].azi = 0;
         newOptions.camera[cameraInd].pol = 0;
      } else {
         throw new Error('how did we get here?');
      }
      setOptions(newOptions);
   }

   useEffect(() => {
      _BUGFIX_options = { ...options };      // see comment below for bugfix
   }, [options]);

   return {
      options,
      setAllOptions,
      toggleCompare,
      toggleLinked,
      moveCamera,
      snapCamera,
   }
}


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
let _BUGFIX_options = { ...defaultOptions };

export {
   CameraProvider,
   useCamera,
}