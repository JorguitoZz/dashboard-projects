import { ProjectDetail } from "@/views/ProjectDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params; // Resuelves el id en la página

  return <ProjectDetail id={id} />;
}