// Server Component — can export generateStaticParams
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";
import { CaseStudyClient } from "./CaseStudyClient";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <CaseStudyClient project={project} />;
}
