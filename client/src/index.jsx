import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { CameraProvider, ModalProvider, RenderablesProvider } from 'contexts';
import { Display, Toolbar } from 'features';
import { Header } from 'components/elements';
import './index.css';

function DataVis() {
   // resizable sections handled by 'datavis__divider'
   const [displayWidth, setDisplayWidth] = useState(window.innerWidth - 500);
   const [displayHeight, setDisplayHeight] = useState(500);
   const [isActive, setIsActive] = useState(false);

   // mouse movement and mouse up is handled by outer div
   //    so we never lose contact with the divider
   const handleMouseMove = (event) => {
      if (!isActive) return;
      setDisplayWidth(event.clientX);
      setDisplayHeight(event.clientY);
   };

   const handleTouchMove = ({ nativeEvent }) => {
      if (!isActive) return;
      const event = nativeEvent.changedTouches[0];
      setDisplayWidth(event.clientX);
      setDisplayHeight(event.clientY);
   };

   return (
      <div
         className="mainLayout"
         onMouseUp={() => setIsActive(false)}
         onMouseMove={handleMouseMove}
         onTouchEnd={() => setIsActive(false)}
         onTouchMove={handleTouchMove}
      >
         <Header />
         <div className="datavis">
            <div
               className="noselect datavis__flex"
               style={{
                  '--display-width': `${displayWidth}px`,
                  '--display-height': `${displayHeight - 38}px`,
               }}
            >
               <Display />
               <div
                  className="datavis__divider"
                  onMouseDown={() => setIsActive(true)}
                  onTouchStart={() => setIsActive(true)}
               />
               <Toolbar />
            </div>
         </div>
      </div>
   );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <RenderablesProvider>
      <CameraProvider>
         <ModalProvider>
            <DataVis />
         </ModalProvider>
      </CameraProvider>
   </RenderablesProvider>
);
