import { useEffect } from 'react';
import { useRenderables } from '@/contexts';
import IsosurfaceButtons from './IsosurfaceButtons';
import SphereButton from './SphereButton';
import XPlaneButton from './XPlaneButton';
import YPlaneButton from './YPlaneButton';
import ZPlaneButton from './ZPlaneButton';
import css from './Toolbar.module.scss';

const ItemCreator = (): JSX.Element => {
   const { createRenderable } = useRenderables();

   // create sphere on initial load
   useEffect(() => {
      createRenderable('sphere');
   }, [createRenderable]);

   return (
      <div className={css.options}>
         <div className={css.options__itemCreator}>
            <IsosurfaceButtons />
            <SphereButton />
            <ZPlaneButton />
            <YPlaneButton />
            <XPlaneButton />
         </div>
         <div className={css.options__miniHeader}>Create Items</div>
      </div>
   );
};

export default ItemCreator;
