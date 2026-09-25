import { CaseStudyClient } from "./CaseStudyClient"

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <CaseStudyClient slug={slug} />
}
