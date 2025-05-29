// components/Container.jsx
export default function Container({ children }) {
  return (
    <div className="w-full min-h-screen max-w-[1200px] mx-auto px-6 relative" style={{ zIndex: "1" }}>
      {children}
    </div>
  );
}
