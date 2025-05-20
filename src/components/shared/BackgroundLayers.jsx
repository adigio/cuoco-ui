export default function BackgroundLayers() {
  return (
    <div className="overflow-hidden pointer-events-none flex justify-between items-center px-10">
      <img
        src="/tomate.png"
        alt="tomate 1"
        className="w-40 h-40 object-contain opacity-100 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer pointer-events-auto"
      />
      <img
        src="/palta.png"
        alt="palta 2"
        className="w-40 h-40 object-contain opacity-100 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer pointer-events-auto"
      />
      <img
        src="/limon.png"
        alt="limon 3"
        className="w-30 h-30 object-contain opacity-100 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer pointer-events-auto"
      />
    </div>
  );
}
