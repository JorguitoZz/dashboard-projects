// app/dashboard/layout.tsx
import { Dashboard } from "@/views/Dashboard"; // Ajusta la ruta si no usas el alias @

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dashboard>
      {children}
    </Dashboard>
  );
}