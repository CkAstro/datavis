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

   const createRenderable = type => {
      const newRenderable = {
         id: getNewId(),
         type: type,
         isVisible: [true, true],
         isActive: false,
      }
      setRenderables(renderables.concat(newRenderable));
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

   return {
      renderables: renderables,
      handleCreate: createRenderable,
      handleDelete: deleteRenderable,
      handleVisible: toggleVisible,
      handleActivate: activateRenderable,
   }
}

export {
   RenderablesProvider,
   useRenderables,
}