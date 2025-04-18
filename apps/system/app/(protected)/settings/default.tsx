import { redirect } from 'next/navigation';

export default function Default() {
  redirect('/settings/general');
  return null;
}
