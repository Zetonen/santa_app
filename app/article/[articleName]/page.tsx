export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleName: string }>;
}) {
  const articleName = (await params).articleName;
  return <p>Text: {articleName}</p>;
}
