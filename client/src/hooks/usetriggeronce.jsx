import { useState } from 'react';

const useTriggerOnce = () => {
   const [hasTriggered, setHasTriggered] = useState(false);

   const trigger = (func) => {
      func();
      setHasTriggered(true);
   };

   const resetTrigger = () => setHasTriggered(false);

   const triggerOnce = (func) =>
      hasTriggered
         ? () => undefined // if hook has triggered, return nothing
         : trigger(func);
   return { triggerOnce, resetTrigger };
};

export default useTriggerOnce;
