import Link from 'next/link';
import Image from 'next/image';
import logo from '~/public/images/logo/site-logo.webp';
export function AppLogo({
  href,
  label,
  className,
}: {
  href?: string | null;
  className?: string;
  label?: string;
}) {
  if (href === null) {
    return <Image src={logo} alt="Logo" className={className} />;
  }

  return (
    <Link aria-label={label ?? 'Home Page'} href={href ?? '/'}>
      <Image src={logo} height={60} alt="Logo" className={className} />
    </Link>
  );
}
