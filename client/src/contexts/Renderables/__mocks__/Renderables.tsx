import type { Renderable, RenderablesInterface, RenderableType } from '@/types';
import { generateRenderable } from '../generateRenderable';

// this mock avoids React Contexts so we can test values of
//   'renderables' directly. To keep the same object reference,
//    we must use push/pop rather than map/set
//
// NOTE : an update to 'renderables' during mock will NOT trigger
//    a state change on any element depending on 'useRenderables'

const renderables: Renderable[] = [];

// we'll remove all with pop and then push new collection
const setAllRenderables = (rends: Renderable[]): void => {
   while (renderables.length > 0) renderables.pop();
   rends.forEach((rend) => renderables.push(rend));
};

const createRenderable = (type: RenderableType): void => {
   const renderable = generateRenderable(type, renderables);
   renderables.push(renderable);
};

// to remove at a specific location while keeping object,
//    we find ind and then shift evertyhing forward by 1
//    and pop last element out of array
const deleteRenderable = (id: number): void => {
   let found = false;
   for (let i = 0; i < renderables.length; i++) {
      if (found) renderables[i - 1] = renderables[i];
      if (renderables[i].id === id) found = true;
   }
   if (found) renderables.pop();
};

const toggleVisible = (id: number, ind: number): void => {
   for (const renderable of renderables) {
      if (renderable.id === id) renderable.isVisible[ind] = !renderable.isVisible[ind];
   }
   // for (let i = 0; i < renderables.length; i++) {
   //    if (renderables[i].id === id) renderables[i].isVisible[ind] = !renderables[i].isVisible[ind];
   // }
};

const activateRenderable = (id: number): void => {
   for (const renderable of renderables) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (renderable.id === id) renderable.isActive = !renderable.isActive;
   }
   // for (let i = 0; i < renderables.length; i++) {
   //    if (renderables[i].id === id) renderables[i].isActive = !renderables[i].isActive;
   // }
};

const changeActiveVar = (id: number, newVar: string): void => {
   let newVarIndex;
   if (newVar === 'density') {
      newVarIndex = 0;
   } else if (newVar === 'pressure') {
      newVarIndex = 1;
   } else if (newVar === 'color') {
      newVarIndex = 2;
   } else {
      throw new Error('invalid variable selection');
   }

   for (const renderable of renderables) {
      if (renderable.id === id) {
         renderable.activeVar = newVar;
         renderable.activeVarIndex = newVarIndex;
      }
   }

   // for (let i = 0; i < renderables.length; i++) {
   //    if (renderables[i].id === id) {
   //       renderables[i].activeVar = newVar;
   //       renderables[i].activeVarIndex = newVarIndex;
   //    }
   // }
};

const changeSlideValue = (val: string | number, ind: number, id: number): void => {
   for (const renderable of renderables) {
      if (renderable.id === id) {
         renderable.sliderList[ind].value = parseFloat(val as string);
         renderable.sliderList[ind].trueValue = parseFloat(val as string) / 100;
      }
   }
   // for (let i = 0; i < renderables.length; i++) {
   //    if (renderables[i].id === id) {
   //       renderables[i].sliderList[ind].value = Number(val);
   //       renderables[i].sliderList[ind].trueValue = val / 100;
   //    }
   // }
};

const changeItemName = (name: string, id: number): void => {
   for (const renderable of renderables) {
      if (renderable.id === id) renderable.itemName = name;
   }
   // for (let i = 0; i < renderables.length; i++) {
   //    if (renderables[i].id === id) renderables[i].name = name;
   // }
};

const useRenderables = (): RenderablesInterface => ({
   renderables,
   setAllRenderables,
   createRenderable,
   deleteRenderable,
   toggleVisible,
   activateRenderable,
   changeActiveVar,
   changeSlideValue,
   changeItemName,
});

export default useRenderables;
export { useRenderables };
