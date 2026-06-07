import { fullstackProjects } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return fullstackProjects.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}
