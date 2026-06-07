import { fullstackProjects } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return fullstackProjects.map((p) => ({ slug: p.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = fullstackProjects.find((p) => p.slug === params.slug);
  return <ProjectDetailClient slug={params.slug} />;
}
