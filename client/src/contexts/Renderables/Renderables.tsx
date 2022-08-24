import { useState, useContext, createContext, useMemo } from 'react';
import type { Renderable, RenderablesInterface, RenderableType } from '@/types';
import { generateRenderable } from './generateRenderable';

type ProviderInterface = {
   renderables: Renderable[];
   setRenderables: React.Dispatch<React.SetStateAction<Renderable[]>>;
};

const RenderablesContext = createContext<ProviderInterface | null>(null);

const RenderablesProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
   const [renderables, setRenderables] = useState<Renderable[]>([]);
   const collection = useMemo(() => ({ renderables, setRenderables }), [renderables]);

   return <RenderablesContext.Provider value={collection}>{children}</RenderablesContext.Provider>;
};

const useRenderables = (): RenderablesInterface => {
   const collection: ProviderInterface = useContext(RenderablesContext)!;
   const { renderables, setRenderables } = collection;

   // set renderables from a saved state
   const setAllRenderables = (rends: Renderable[]): void => {
      const newRenderables = [...rends];
      setRenderables(newRenderables);
   };

   // add new renderable to list
   // item.isActive is T/F but init with 1 so we can minimize
   //    previous created if it hasn't been minimized already
   const createRenderable = (type: RenderableType): void => {
      const newRenderables = renderables.map((item) => {
         if (item.isActive === 1) return { ...item, isActive: false };
         return item;
      });
      const renderable: Renderable = generateRenderable(type, renderables);
      setRenderables(newRenderables.concat(renderable));
   };

   // delete renderable by id
   const deleteRenderable = (id: number): void => {
      const newRenderables = renderables.filter((item) => item.id !== id);
      setRenderables(newRenderables);
   };

   // toggle item viewport visibility
   // id : generated ID for the renderable
   // ind : viewport index to toggle
   const toggleVisible = (id: number, ind: number): void => {
      const newRenderables = renderables.map((item) => {
         if (item.id !== id) return item;
         const newItem = { ...item };
         newItem.isVisible[ind] = !newItem.isVisible[ind];
         return newItem;
      });
      setRenderables(newRenderables);
   };

   // toggle renderable activation by ID
   // NOTE : previously this would deactivate all other renderables
   //    now it is just a toggle
   const activateRenderable = (id: number): void => {
      const newRenderables = renderables.map((item) => {
         if (item.id !== id) return item;
         // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
         return { ...item, isActive: !item.isActive };
      });
      setRenderables(newRenderables);
   };

   // change display variable, choices currently hard-coded
   const changeActiveVar = (id: number, newVar: string): void => {
      let newVarIndex: number;
      if (newVar === 'density') {
         newVarIndex = 0;
      } else if (newVar === 'pressure') {
         newVarIndex = 1;
      } else if (newVar === 'color') {
         newVarIndex = 2;
      } else {
         throw new Error('invalid variable selection');
      }

      const newRenderables = renderables.map((item) => {
         if (item.id !== id) return item;
         const newItem = {
            ...item,
            activeVar: newVar,
            activeVarIndex: newVarIndex,
         };
         return newItem;
      });
      setRenderables(newRenderables);
   };

   // change slider value
   // val : actual slide-bar value (e.g. '50' for 0.5)
   // ind : index of slidebar (0-3)
   // id : renderable id
   const changeSlideValue = (val: string | number, ind: number, id: number): void => {
      const newRenderables = renderables.map((item) => {
         if (item.id !== id) return item;
         const slider = item.sliderList[ind];
         slider.value = val as number;
         slider.trueValue = (val as number) / 100.0;
         return item;
      });
      setRenderables(newRenderables);
   };

   // change item's displayed name
   const changeItemName = (name: RenderableType, id: number): void => {
      const newRenderables: Renderable[] = renderables.map((item) => {
         if (item.id !== id) return item;
         const newItem = { ...item, itemName: name };
         return newItem;
      });
      setRenderables(newRenderables);
   };

   return {
      renderables,
      setAllRenderables,
      createRenderable,
      deleteRenderable,
      toggleVisible,
      activateRenderable,
      changeActiveVar,
      changeSlideValue,
      changeItemName,
   };
};

export { RenderablesProvider, useRenderables };
