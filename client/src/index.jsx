import ReactDOM from 'react-dom/client';
import { CameraProvider, ModalProvider, RenderablesProvider } from 'contexts';
import { Display, Toolbar } from 'features';
import { Header } from 'components/elements';
import './index.css';

const DataVis = () => (
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <div className='mainLayout'>
      <Header/>
      <div className='mainContainer'>
         <DataVis/>
      </div>
   </div>
);