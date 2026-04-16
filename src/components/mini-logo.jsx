import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => (
  <Link href={"/"}>
    <Image
      src="/logo/mini-logo.svg"
      alt="Logo"
      width={100}
      height={40}
    />
  </Link>
);