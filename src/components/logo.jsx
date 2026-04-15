import Image from 'next/image';

export const MiniLogo = () => (
<Image
  src="/logo/logo.svg"
  alt="Logo"
  width={300}
  height={200}
  className="w-full max-w-xs"
/>
);