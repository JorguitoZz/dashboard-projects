'use client';
import { ProjectDetail } from "@/views/ProjectDetail";
import { useParams } from "next/navigation";

export default function ProjectDetailPage() {
  const params = useParams();
  // params.id contiene el valor de la URL
  return <ProjectDetail />;
}