export default function ContainerShadow({ children, customClass }) {
  return (
    <div className={`bg-white rounded shadow p-4 ${customClass}`}>
      {children}
    </div>
  );
}
