import Link from "next/link";

export default function NavbarLanding() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent py-4 px-8">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold text-white">
          <img
            src="/log.png"
            alt="Comida casera"
            className="w-20 h-20 object-contain"
          />
        </div>
        <div className="space-x-6 text-white">
          <Link href="/beneficios" className="hover:text-gray-400">
            Beneficios
          </Link>
          <Link href="/sobre-nosotros" className="hover:text-gray-400">
            Sobre nosotros
          </Link>
          <Link href="/iniciar-sesion" className="hover:text-gray-400">
            Iniciar Sesión
          </Link>
          <Link
            href="/registrarse"
            className="bg-white text-red-400 px-6 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
}
