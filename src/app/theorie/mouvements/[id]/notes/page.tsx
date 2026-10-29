import { redirect } from 'next/navigation';

export default function NotesPage({ params }: { params: { id: string } }) {
  redirect(`/theorie/mouvements/${params.id}`);
}
