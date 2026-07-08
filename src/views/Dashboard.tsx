// src/components/layout/Dashboard.tsx
import { Outlet } from 'react-router-dom';
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";

export const Dashboard = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen bg-fondo">
      
      <Sidebar />
      
      <main className="flex-1 lg:h-screen lg:overflow-y-auto">
        <Header />
        
        <Outlet /> 
        
      </main>
    </div>
  );
};