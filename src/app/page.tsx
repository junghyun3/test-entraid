import Link from 'next/link';
import paths from '@/paths';

export default function Page() {

  return (
    <div>
      <Link href={paths.adminShow()}>Go to Admin Show Page</Link>
      <br />
      <Link href={paths.guestShow()}>Go to Guest Show Page</Link>
    </div>
  );
}