export default function CarrotLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <svg
        viewBox="0 0 200 300"
        className="w-32 h-48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="carrotFill">
            <rect x="0" y="300" width="200" height="0">
              <animate
                attributeName="y"
                from="300"
                to="100"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="height"
                from="0"
                to="200"
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>
          </clipPath>
        </defs>

        {/* Cuerpo de la zanahoria */}
        <path
          d="M100 280 C80 200, 60 120, 100 100 C140 120, 120 200, 100 280"
          fill="#f97316"
          clipPath="url(#carrotFill)"
        />
        <path
          d="M100 280 C80 200, 60 120, 100 100 C140 120, 120 200, 100 280"
          fill="none"
          stroke="#ea580c"
          strokeWidth="5"
        />

        {/* Hojas */}
        <path
          d="M100 100 C95 85, 105 70, 100 60"
          stroke="#16a34a"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M90 100 C85 85, 95 70, 90 60"
          stroke="#22c55e"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M110 100 C115 85, 105 70, 110 60"
          stroke="#22c55e"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <p className="mt-6 text-xl font-semibold text-orange-500 animate-pulse">
        Preparando tu receta...
      </p>
    </div>
  );
}
