import type { glHelper, texHelper } from '@/utils';

export type GLHelper = typeof glHelper;
export type TextureHelper = typeof texHelper;

export type MouseLocation = {
   x: number | null;
   y: number | null;
};

export interface Slider {
   variable: null | string;
   trueValue: number;
   text: null | string;
   value: number;
   min: number;
   max: number;
}

export interface SliderProps extends Slider {
   isActive: boolean | number;
   id: number;
   ind: number;
}

export type RenderableType = 'xslice' | 'yslice' | 'zslice' | 'sphere' | 'surface' | 'mcube';
export type RendererType = 'slice' | 'sphere' | 'surface' | 'mcube';

export interface Renderable {
   id: number;
   itemName: string;
   type: 'xslice' | 'yslice' | 'zslice' | 'sphere' | 'surface' | 'mcube';
   isVisible: boolean[];
   isActive: boolean | number;
   sliderList: Slider[];
   activeVar: string;
   activeVarIndex: number;
   renderer: 'slice' | 'sphere' | 'surface' | 'mcube';
}

export type RenderablesInterface = {
   renderables: Renderable[];
   setAllRenderables: (rends: Renderable[]) => void;
   createRenderable: (type: RenderableType) => void;
   deleteRenderable: (id: number) => void;
   toggleVisible: (id: number, ind: number) => void;
   activateRenderable: (id: number) => void;
   changeActiveVar: (id: number, newVar: string) => void;
   changeSlideValue: (val: string | number, ind: number, id: number) => void;
   changeItemName: (name: string, id: number) => void;
};

type Camera = { zoom: number; azi: number; pol: number };

export type CameraOptions = {
   compare: boolean;
   linked: boolean;
   lastActive: number;
   camera: Camera[];
};

export type CameraInterface = {
   options: CameraOptions;
   setAllOptions: (opts: CameraOptions) => void;
   toggleCompare: () => void;
   toggleLinked: () => void;
   moveCamera: (loc: MouseLocation, dz: number, da: number, dp: number) => void;
   snapCamera: (dir: 'x' | 'y' | 'z') => void;
};

export type ModalParams = {
   content: string | React.ReactNode;
   isActive: boolean;
};

export type ModalInterface = {
   modalParams: ModalParams;
   setModalContent: (val: string | React.ReactNode) => void;
   closeModal: () => void;
};
