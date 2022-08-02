import generateRenderable from '../renderables/generaterenderable';

// this mock avoids React Contexts so we can test values of
//   'renderables' directly. To keep the same object reference,
//    we must use push/pop rather than map/set
//
// NOTE : an update to 'renderables' during mock will NOT trigger
//    a state change on any element depending on 'useRenderables'

const renderables = [];

// we'll remove all with pop and then push new collection
const setAllRenderables = rends => {
   while (renderables.length > 0) renderables.pop();
   for (const rend of rends) renderables.push(rend);
}

const createRenderable = type => {
   const renderable = generateRenderable(type, renderables);
   renderables.push(renderable);
}

// to remove at a specific location while keeping object, 
//    we find ind and then shift evertyhing forward by 1
//    and pop last element out of array
const deleteRenderable = id => {
   let found = false;
   for (let i=0; i<renderables.length; i++) {
      if (found) renderables[i-1] = renderables[i];
      if (renderables[i].id === id) found = true;
   }
   if (found) renderables.pop();
}

const toggleVisible = (id, ind) => {
   for (let i=0; i<renderables.length; i++) {
      if (renderables[i].id === id) renderables[i].isVisible[ind] = !renderables[i].isVisible[ind];
   }
}

const activateRenderable = id => {
   for (let i=0; i<renderables.length; i++) {
      if (renderables[i].id === id) renderables[i].isActive = !renderables[i].isActive;
   }
}

const changeActiveVar = (id, newVar) => {
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

   for (let i=0; i<renderables.length; i++) {
      if (renderables[i].id === id) {
         renderables[i].activeVar = newVar;
         renderables[i].activeVarIndex = newVarIndex;
      }
   }
}

const changeSlideValue = (val, ind, id) => {
   for (let i=0; i<renderables.length; i++) {
      if (renderables[i].id === id) {
         renderables[i].sliderList[ind].value = Number(val);
         renderables[i].sliderList[ind].trueValue = val / 100;
      }
   }
}

const changeItemName = (name, id) => {
   for (let i=0; i<renderables.length; i++) {
      if (renderables[i].id === id) renderables[i].name = name;
   }
}

const useRenderables = () => {

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
   }
}

export { 
   useRenderables,
}