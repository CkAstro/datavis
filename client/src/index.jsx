import ReactDOM from 'react-dom/client';
import Header from 'components/header';
import Display from 'components/display';
import Toolbar from 'components/toolbar';
import { RenderablesProvider } from 'contexts/renderables';
import { CameraProvider } from 'contexts/camera';
import { ModalProvider } from 'contexts/modal';
import './index.css';

const DataVis = () => {
   return (
      <div className='datavisContainer'>
         <RenderablesProvider>
            <CameraProvider>
               <ModalProvider>
                  <Display/>
                  <Toolbar/>
               </ModalProvider>
            </CameraProvider>
         </RenderablesProvider>
      </div>
   );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <div className='mainLayout'>
      <Header/>
      <div className='mainContainer'>
         <DataVis/>
      </div>
   </div>
);