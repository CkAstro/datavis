import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header';
import Display from './components/display';
import Toolbar from './components/toolbar';
import './index.css';

const DataVis = () => {
   return (
      <div className='mainContainer'>
         <div className='datavisContainer'>
            <Display/>
            <Toolbar/>
         </div>
      </div>
   );
}

const App = () => {
   return (
      <div className='mainLayout'>
         <Header/>
         <DataVis/>
      </div>
   );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <App/>
   </React.StrictMode>
);