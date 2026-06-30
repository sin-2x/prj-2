import { memo, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LoveLetter.module.css";

const LETTER_TEXT = `Сен менің өмірімдегі ең ерекше жансың.

Өмірде кейде адамдар қателеседі...
Мен де қателестім.
Бірақ мен ешқашан сезімімді жоғалтқан емеспін.

Уақыт өтті.
Бірақ жүрегімдегі орның өзгерген жоқ.

Бұл сайт...
Саған деген шынайы сезімімнің кішкентай дәлелі.`;

function LoveLetter() {
  const rootRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!rootRef.current || !cardRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 90, opacity: 0, rotate: -3 },
        {
          y: 0,
          opacity: 1,
          rotate: -0.5,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 65%",
            once: true,
            onEnter: () => {
              let index = 0;
              const timer = window.setInterval(() => {
                index += 1;
                setTypedText(LETTER_TEXT.slice(0, index));
                if (index >= LETTER_TEXT.length) window.clearInterval(timer);
              }, 28);
            },
          },
        },
      );
    }, rootRef);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.letterSection} id="letter" ref={rootRef} aria-label="Love letter">
      <div className={styles.card} ref={cardRef}>
        <div className={styles.seal} aria-hidden="true">
          ❤
        </div>
        <p className={styles.letterText}>
          {typedText}
          <span className={styles.cursor} aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}

export default memo(LoveLetter);
