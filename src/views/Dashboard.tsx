import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen bg-fondo">
      
      <Sidebar />
      
      <main className="flex-1 lg:h-screen lg:overflow-y-auto">
        <Header />
        {children}
      </main>
    </div>
  );
};