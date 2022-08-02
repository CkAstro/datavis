import getSliders from './getsliders';

const getNewId = renderables => {
   const length = renderables.length;
   return length ? renderables[length-1].id + 1 : 0;
}

// isActive is generated with 1 on create, then updated to T/F so 
//    we only auto-collapse ones which have not been interacted with
const generateRenderable = (type, renderables) => ({
   id: getNewId(renderables),
   itemName: type,
   type: type,
   isVisible: [true, true],
   isActive: 1,      // ! see above     
   sliderList: getSliders(type),
   activeVar: 'density',
   activeVarIndex: 0,
});

export default generateRenderable;
export { generateRenderable, getNewId };