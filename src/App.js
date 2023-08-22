
import './App.css';

import { Route, Routes } from 'react-router-dom';
import DashboardPage from './views/DashboardPage';
import CreateStorePage from './views/CreateStorePage';
import UpdateStorePage from './views/UpdateStorePage';
import ViewStorePage from './views/ViewStorePage';


function App() {
  return (
    <div className="App">
        
      
      <Routes>
        <Route path="/" element ={<DashboardPage/>}/>
        <Route path="/stores/add" element={<CreateStorePage/>} />
        <Route path="/stores/edit/:id" element={<UpdateStorePage/>} />
        <Route path="/stores/:id" element={<ViewStorePage/>} />
      </Routes>
    </div>
  );
}

export default App;
