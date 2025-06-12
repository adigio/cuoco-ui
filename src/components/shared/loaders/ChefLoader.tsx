import './ChefLoader.css';
import Image from 'next/image';

export default function ChefLoader({ text = null }: {text ?: string | null}) { 
  return (
    <div className="loader-container">
      <div className="relative w-[100px] h-[100px]">
        <Image 
          src="/iso_coral.png" 
          alt="Chef cargando..."
          fill
          className="loader-image"
        />
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
}