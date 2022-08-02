
const options = {
   compare: false,
   linked: true,
   lastActive: 0,
   camera: [
      { zoom: -3.0, azi: 0.0, pol: 0.0 },
      { zoom: -3.0, azi: 0.0, pol: 0.0 },
   ],
}

const setAllOptions = opts => {
   options.compare = opts.compare;
   options.linked = opts.linked;
   options.lastActive = opts.lastActive;
   options.camera = opts.camera;
}

const toggleCompare = () => options.compare = !options.compare;

const toggleLinked = () => {
   if (!options.compare) return;
   options.linked = !options.linked;
   if (!options.linked) options.camera[1] = options.camera[1];
}

const moveCamera = (clickLocation, dz, da, dp) => {
   // not testing for now
}

const snapCamera = direction => {
   // not testing for now
}

const useCamera = () => {

   return {
      options,
      setAllOptions,
      toggleCompare,
      toggleLinked,
      moveCamera,
      snapCamera,
   }
}

export {
   useCamera,
}