import { memo, useRef, useState } from "react";
import Particles from "@tsparticles/react";
import { FaBorderAll, FaImages } from "react-icons/fa";
import { petalParticles } from "../../config/particles/petalParticles";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { useParticlesEngine } from "../../hooks/useParticlesEngine";
import styles from "./Gallery.module.css";

const galleryItems = [
  { title: "Естелік 01", caption: "Осы жерге ең сүйікті фотоңды қос." },
  { title: "Естелік 02", caption: "Әр сурет бір жылы сезімді сақтайды." },
  { title: "Естелік 03", caption: "Кішкентай сәттер де жүректе қалады." },
  { title: "Естелік 04", caption: "Бұл бөлім толықтай Динараға арналсын." },
];

function Gallery() {
  const rootRef = useRef<HTMLElement | null>(null);
  const ready = useParticlesEngine();
  const [grid, setGrid] = useState(false);
  useGsapReveal(rootRef, `.${styles.card}`);

  return (
    <section className={styles.gallery} ref={rootRef} aria-label="Gallery">
      {ready && <Particles className={styles.petals} options={{ ...petalParticles, particles: { ...petalParticles.particles, number: { value: 10 } } }} />}
      <div className={styles.header}>
        <p>Gallery</p>
        <h2>Естеліктерге арналған орын</h2>
        <button className={styles.toggle} type="button" onClick={() => setGrid((value) => !value)} aria-label="Toggle gallery layout">
          {grid ? <FaImages /> : <FaBorderAll />}
        </button>
      </div>
      <div className={grid ? styles.grid : styles.carousel}>
        {galleryItems.map((item, index) => (
          <article className={styles.card} key={item.title}>
            <div className={styles.photo} role="img" aria-label={`${item.title} placeholder`}>
              <span>{index + 1}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.caption}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default memo(Gallery);
