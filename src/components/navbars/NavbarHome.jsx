import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';



export default function NavbarHome() { 

    return (
        <nav className="fixed top-0 left-0 w-full z-50 py-4 px-8 background-color-nav-scrolled bg-opacity-80 shadow text-white-400">
            <div className="flex justify-between items-center">
                <div className="text-3xl text-white">
                    <img
                        src="/logos/logo-blanco.png"
                        alt="Comida casera"
                        className="w-10 h-10 object-contain"
                    />
                </div>
                <div className="hidden lg:flex space-x-6 text-white font-bold">
                    <Link href="/generarRecetas" className="hover:text-red-200">
                        Generar Recetas
                    </Link>
                    <Link href="/favoritos" className="hover:text-red-200">
                        Favoritos
                    </Link>
                    <Link href="/perfil" className="hover:text-red-200">
                        perfil
                    </Link>
                    <Link href="/logout" className="hover:text-red-200">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}