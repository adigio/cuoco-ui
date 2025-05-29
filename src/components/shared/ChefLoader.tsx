import './ChefLoader.css';

export default function ChefLoader({ text = null }: {text ?: string | null}) { 
  return (
    <div className="loader-container">
      <img src="/iso_coral.png"   className="loader-image" />
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
}