import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer
      className="py-6 px-4"
      style={{ backgroundColor: "#f37b6a", zIndex: "1" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/logos/logo-blanco.png"
              alt="Logo Cuoco"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/cuoco.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-white hover:underline"
        >
          <FaInstagram className="text-xl" />
          <div className="text-sm">
            <p className="font-semibold">Seguinos en:</p>
            <p>@cuoco.ar</p>
          </div>
        </a>

        {/* Email */}
        <div className="flex items-center space-x-2 text-white">
          <FaEnvelope className="text-xl" />
          <div className="text-sm">
            <p className="font-semibold">Contactanos</p>
            <p>cuoco.8bits@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
