export default function DataPage({ params }: { params: { slug: string } }) {
  return <div>Data application: {params.slug}</div>
}
