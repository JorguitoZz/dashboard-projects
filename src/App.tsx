import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './views/Login';
import { Dashboard } from './views/Dashboard';
import { HomeView } from './views/HomeView';
import { Projects } from './views/Projects';
import { ProjectDetail } from './views/ProjectDetail';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route index element={<HomeView />} />
          
          <Route path="projects" element={<Projects/>}/>
          <Route path="projects/:id" element={<ProjectDetail />}/>
          
          
        </Route>
        
        {/* Si entran a cualquier otra ruta, los mandamos al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;