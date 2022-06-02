import { useState, useContext, createContext } from "react";

const CameraContext = createContext();

const defaultOptions = {
   compare: false,
   linked: true,
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

   return {
      options: options,
      handleCompare: toggleCompare,
      handleLinked: toggleLinked,
   }
}

export {
   CameraProvider,
   useCamera,
}