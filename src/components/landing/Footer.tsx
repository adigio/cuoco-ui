import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
      <footer className="background-color-primary py-8 mt-6 relative" style={{ zIndex: "1", backgroundColor: "#f37b6a" }}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Columna 1: Icono y texto */}
          <div className="flex items-center space-x-2">
            <Link href="/home">
              <Image
                src="/logos/logo-blanco.png"
                alt="Icono de soporte"
                width={40}
                height={40}
                className="object-contain"
              />
            </Link>
            <div>
              <h2 className="text-white text-lg font-bold">Soporte</h2>
              <p className="text-white text-sm">Sobre Nosotros</p>
            </div>
          </div>
  
          {/* Columna 2: Enlace de redes sociales */}
          <div className="text-right">
            <p className="text-white text-sm">
              Síguenos y descubrí cómo transformar tu cocina todos los días.
            </p>
            <p className="text-white text-sm font-semibold">
              @cuoco
            </p>
          </div>
        </div>
      </footer>
    );
  }
  