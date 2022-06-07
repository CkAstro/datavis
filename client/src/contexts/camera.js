import { useState, useContext, createContext } from "react";

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

   const toggleCompare = () => {
      const compare = !options.compare;
      setOptions({ ...options, compare: compare });
   }

   const toggleLinked = () => {
      if (!options.compare) return;
      const linked = !options.linked;
      if (!linked) {
         const newCamera = options.camera.slice();
         newCamera[1] = newCamera[0];
         setOptions({ ...options, linked: linked, camera: newCamera });
      } else {
         setOptions({ ...options, linked: linked });
      }
   }

   const moveCamera = (clickLocation, canvasRect, dz, da, dp) => {
      const activeCamera = (options.compare && !options.linked && clickLocation.x-canvasRect.left > canvasRect.width/2.0) ? 1 : 0;
      const newCamera = options.camera.slice();
      newCamera[activeCamera] = {
         zoom: options.camera[activeCamera].zoom + dz,
         azi: options.camera[activeCamera].azi - da,
         pol: options.camera[activeCamera].pol - dp,
      }
      setOptions({
         ...options,
         camera: newCamera,
      });
   }

   return {
      options: options,
      handleCompare: toggleCompare,
      handleLinked: toggleLinked,
      handleCamera: moveCamera,
   }
}

export {
   CameraProvider,
   useCamera,
}