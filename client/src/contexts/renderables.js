import { useState, useContext, createContext } from 'react';

const RenderablesContext = createContext();

const RenderablesProvider = ({ children }) => {
   const [ renderables, setRenderables ] = useState([]);

   return (
      <RenderablesContext.Provider value={[renderables, setRenderables]}>
         {children}
      </RenderablesContext.Provider>
   );
}

const useRenderables = () => {
   const [ renderables, setRenderables ] = useContext(RenderablesContext);

   const getNewId = () => {
      const length = renderables.length;
      return length ? renderables[length-1].id + 1 : 0;
   }

   const getSliderList = type => {
      if (type.includes('slice')) {
         return [{
            variable: 'offset',
            trueValue: 0.0,
            text: 'offset',
            value: 0,
            min: -100,
            max: 100,
         }];
      } else if (type === 'sphere') {
         const offsetSlider = {
            variable: 'x offset',
            trueValue: 0.0,
            text: 'x offset',
            value: 0,
            min: -100,
            max: 100,
         }
         const radialSlider = {
            variable: 'radius',
            trueValue: 0.5,
            text: 'radius',
            value: 50,
            min: 0,
            max: 100,
         }
         return [
            {...offsetSlider}, 
            {...offsetSlider, variable: 'y offset', text: 'y offset'},
            {...offsetSlider, variable: 'z offset', text: 'z offset'},
            {...radialSlider},
         ];
      } else if (type === 'surface') {
         return [{
            variable: 'value',
            trueValue: 0.5,
            text: 'value',
            value: 50,
            min: 0,
            max: 100,
         }];
      } else {
         throw new Error('how did we get here?');
      }
   }

   const generateRenderable = type => {
      return {
         id: getNewId(),
         itemName: type,
         type: type,
         isVisible: [true, true],
         isActive: true,
         sliderList: getSliderList(type),
         activeVar: 'density',
         activeVarIndex: 0,
      }
   }

   const createRenderable = type => {
      const newRenderables = renderables.map(item => {
         item.isActive = false;
         return item;
      });
      const renderable = generateRenderable(type);
      setRenderables(newRenderables.concat(renderable));
   }

   const deleteRenderable = id => {
      const newRenderables = renderables.filter(item => item.id !== id);
      setRenderables(newRenderables);
   }

   const toggleVisible = (id, ind) => {
      const newRenderables = renderables.map(item => {
         if (item.id === id)  item.isVisible[ind] = !item.isVisible[ind];
         return item;
      });
      setRenderables(newRenderables);
   }

   const activateRenderable = id => {
      const newRenderables = renderables.map(item => {
         item.isActive = item.id === id ? !item.isActive : false;
         return item;
      });
      setRenderables(newRenderables);
   }

   const changeActiveVar = (id, newVar) => {
      if (newVar === 'density' || newVar === 'pressure' || newVar === 'color') {
         let newVarIndex;
         if (newVar === 'density') newVarIndex = 0;
         if (newVar === 'pressure') newVarIndex = 1;
         if (newVar === 'color') newVarIndex = 2;

         const newRenderables = renderables.map(item => {
            if (item.id === id) {
               item.activeVar = newVar;
               item.activeVarIndex = newVarIndex;
            }
            return item;
         });
         setRenderables(newRenderables);
      } else {
         throw new Error('invalid variable selection');
      }
   }

   const changeSlideValue = (val, ind, id) => {
      const newRenderables = renderables.map(item => {
         if (item.id === id) {
            const slider = item.sliderList[ind];
            slider.value = val;
            slider.trueValue = val / 100.0;
         }
         return item;
      });
      setRenderables(newRenderables);
   }

   const changeItemName = (name, id) => {
      const newRenderables = renderables.map(item => {
         if (item.id === id) item.itemName = name;
         return item;
      });
      setRenderables(newRenderables);
   }

   return {
      renderables,
      createRenderable,
      deleteRenderable,
      toggleVisible,
      activateRenderable,
      changeActiveVar,
      changeSlideValue,
      changeItemName,
   }
}

export {
   RenderablesProvider,
   useRenderables,
}