export default function Footer() {
    return (
      <footer className="bg-red-300 py-8 mt-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Columna 1: Icono y texto */}
          <div className="flex items-center space-x-2">
            <img
              src="/log.png" // Ruta del logo o icono
              alt="Icono de soporte"
              className="w-8 h-8"
            />
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
              @planicocina
            </p>
          </div>
        </div>
      </footer>
    );
  }
  