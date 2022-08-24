import { useState, useEffect } from 'react';
import type { Renderable } from '@/types';
import EditButton from './EditButton';
import css from './Header.module.scss';

type Props = {
   controller: Renderable;
   enableEdit: () => void;
};

const NameDisplay = ({ controller, enableEdit }: Props): JSX.Element => {
   const [showEditButton, setShowEditButton] = useState<boolean>(false);

   useEffect(() => {
      if (controller.isActive !== false) return;
      setShowEditButton(false);
   }, [controller.isActive]);

   const handleClick = (event: React.MouseEvent): void => {
      event.stopPropagation();
      setShowEditButton(true);
   };

   return (
      <>
         <button
            className={`${css.controllerName} noselect`}
            title={controller.itemName}
            onClick={controller.isActive !== false ? handleClick : (): void => void null}
            onDoubleClick={controller.isActive !== false ? enableEdit : (): void => void null}
         >
            {controller.id} - {controller.itemName}
         </button>
         {showEditButton ? <EditButton enableEdit={enableEdit} /> : null}
      </>
   );
};

export default NameDisplay;
