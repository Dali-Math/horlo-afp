export default function LocalePage({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <div>
      <h1>Home - {params.locale}</h1>
    </div>
  );
}
