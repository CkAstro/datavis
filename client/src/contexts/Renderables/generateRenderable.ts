import type { Renderable, RenderableType, RendererType } from '@/types';
import getSliders from './getSliders';

const getNewId = (renderables: Renderable[]): number => {
   const { length } = renderables;
   return length > 0 ? renderables[length - 1].id + 1 : 0;
};

const getRenderer = (type: RenderableType): RendererType => {
   if (type === 'xslice' || type === 'yslice' || type === 'zslice') return 'slice';
   return type;
};

// isActive is generated with 1 on create, then updated to T/F so
//    we only auto-collapse ones which have not been interacted with
const generateRenderable = (type: RenderableType, renderables: Renderable[]): Renderable => ({
   id: getNewId(renderables),
   itemName: type,
   type,
   isVisible: [true, true],
   isActive: 1, // ! see above
   sliderList: getSliders(type),
   activeVar: 'density',
   activeVarIndex: 0,
   renderer: getRenderer(type),
});

export default generateRenderable;
export { generateRenderable, getNewId };
