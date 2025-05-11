import styles from './SobrePlanicocina.module.css';

export default function SobrePlanicocina() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <img src="/comida.png" alt="Comida casera" className={styles.image} />
        <div className={styles.textContent}>
        <h2 className="text-center text-5xl m-5 mb-8 font-bold">Sobre Planicocina</h2>
          <p className="text-center  m-5 mb-8">
            Somos una aplicación desarrollada por estudiantes de la Universidad Nacional de La Matanza
            con el objetivo de ayudarte a aprovechar mejor tus alimentos, ahorrar tiempo y disfrutar
            de la comida casera sin complicarte.
          </p>
        </div>
      </div>
      {/* opcional si querés fondo decorativo con ingredientes */}
      <img src="/decorativos.png" className={styles.decorativos} alt="decoración de ingredientes" />
    </section>
  );
}