import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative w-[100px] h-[33px] overflow-hidden hidden md:block cursor-pointer"
    >
      <Image
        alt="logo"
        priority={true}
        className="object-contain"
        fill
        src="/images/logo.png"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </Link>
  );
};

export default Logo;
