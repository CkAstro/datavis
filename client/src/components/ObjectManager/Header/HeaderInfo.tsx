import { useState } from 'react';
import { useRenderables } from '@/contexts';
import type { Renderable } from '@/types';
import NameChange from './NameChange';
import NameDisplay from './NameDisplay';
import css from './Header.module.scss';

type Props = {
   controllerId: number;
   controller: Renderable;
   isActive: number | boolean;
};

const HeaderInfo = ({ controllerId, controller, isActive }: Props): JSX.Element => {
   const [editMode, setEditMode] = useState(false);
   const { activateRenderable } = useRenderables();

   const enableEdit = (): void => setEditMode(true);
   const disableEdit = (): void => setEditMode(false);

   const itemNameDiv =
      isActive !== false && editMode ? (
         <NameChange controller={controller} disableEdit={disableEdit} />
      ) : (
         <NameDisplay controller={controller} enableEdit={enableEdit} />
      );

   const handleClick = (event: React.MouseEvent): void => {
      event.stopPropagation();
      activateRenderable(controllerId);
   };

   return (
      <button className={css.controllerInfo} onClick={handleClick}>
         <div className={css.infoContainer}>{itemNameDiv}</div>
      </button>
   );
};

export default HeaderInfo;
