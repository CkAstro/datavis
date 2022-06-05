import { useState, useContext, createContext } from "react";

const CameraContext = createContext();

const defaultOptions = {
   compare: false,
   linked: true,
   zoom: -3.0,
   azi: 0.0,
   pol: 0.0,
   queue: true,
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
      setOptions({ ...options, linked: linked });
   }

   const moveCamera = (dz, da, dp) => {
      setOptions({
         ...options,
         zoom: options.zoom + dz,
         azi: options.azi + da,
         pol: options.pol + dp,
         queue: true,
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