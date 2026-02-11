export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <div>Project: {params.slug}</div>;
}
