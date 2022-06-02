import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header';
import Display from './components/display';
import Toolbar from './components/toolbar';
import { RenderablesProvider } from './contexts/renderables';
import { CameraProvider } from './contexts/camera';
import './index.css';

const DataVis = () => {
   return (
      <div className='datavisContainer'>
         <RenderablesProvider>
            <CameraProvider>
               <Display/>
               <Toolbar/>
            </CameraProvider>
         </RenderablesProvider>
      </div>
   );
}

const App = () => {
   return (
      <div className='mainLayout'>
         <Header/>
         <div className='mainContainer'>
            <DataVis/>
         </div>
      </div>
   );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <App/>
   </React.StrictMode>
);