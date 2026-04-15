import Image from 'next/image';

export const Logo = () => (
  <Image
    src="/logo/mini-logo.svg"
    alt="Logo"
    width={100}
    height={40}
  />
);