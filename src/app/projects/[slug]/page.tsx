import { ReqProject } from "../ReqProjects";

export default async function Projects({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  return <ReqProject id={slug} />;
}