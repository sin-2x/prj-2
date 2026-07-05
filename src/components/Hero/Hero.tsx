import { memo, useEffect, useMemo, useRef, useState } from "react";
import Particles from "@tsparticles/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronRight, FaFeatherAlt, FaHeart, FaQuoteLeft, FaStar } from "react-icons/fa";
import { petalParticles } from "../../config/particles/petalParticles";
import { useParticlesEngine } from "../../hooks/useParticlesEngine";
import styles from "./Hero.module.css";

type Scene = {
  kicker: string;
  title: string;
  lines: string[];
  tone?: "poem" | "letter" | "short";
};

const scenes: Scene[] = [
  {
    kicker: "",
    title: "Сағыныштың алғашқы сөзі",
    tone: "poem",
    lines: [
      "Шағаладай сені аңсап шарқ ұрармын,",
      "Теңіз болып тулаймын, талпынамын.",
      "Қалаң неге әдемі, айтайын ба?",
      "Себебі бұл шаһарда сен тұрасың.",
      "Өзге түгіл, өзім де сенбей далмын,",
      "Сағыныштың дертінен емдейді ал кім?",
      "Гүлдер неге әдемі, білесің бе?",
      "Себебі қолында тұр сендей жанның.",
      "Әуелейтін мәңгілік сезімге әнсің,",
      "Шербет-шекер қылығың, сөзің бал шын.",
      "Өмір неге аяулы, білесің бе?",
      "Себебі бұл ғаламда өзің барсың.",
    ],
  },
  {
    kicker: "",
    title: "",
    tone: "poem",
    lines: [
      "Сен – жүректің ең асыл тілегі едің,",
      "Саған қарай тартады жүрек лебін.",
      "Ғашықтықтың ақ жолын бірге бассақ,",
      "Тәңір жазған бағым деп білер едім.",
      "Қолыңды бер, аттайық ақ таңдарға,",
      "Айналсын бақ мәңгілік дастандарға.",
      "Сен деп соққан мынау бір нәзік жүрек,",
      "Төзе білер талайлы соқпақтарға.",
      "Сен бар жерде – нұр толған әлемімсің,",
      "Сенсіз өмір – мазмұнсыз өлеңімсің.",
      "Тағдырыма бақыт боп жазылған соң,",
      "Сүйіп өту – ең асыл өренім шын.",
    ],
  },
  {
    kicker: "",
    title: "",
    tone: "letter",
    lines: [
      "Сәлем, қалайсың?",
      "Сені мүлдем ұмыта алмайтынымды өзіме өзім күнде дәлелдеп жүрген сияқтымын.",
      "Кішкентай баладай үміттеніп, әр таң сайын сенен бір хабар келер ме екен деп оянамын.",
      "2025 жылдың жазында саған ештеңе жаза алмадым. Тіпті бір ғана нүкте де жібере алмадым.",
      "Тек Instagram парақшаңды қайта-қайта ашып қарай беретінмін. Күн сайын кіріп, бір өзгеріс бар ма екен деп үнсіз қарайтынмын.",
      "Ал қазір сол уақыттан да ауыр күйдемін.",
      "Бұл жаз ондай болмайды деп ойлап едім.",
      "Ал сен болсаң, «Сені ұмыта алмаймын» дегеніме сенбейтін едің.",
      "Қызық... Егер сол кездегі мені біреу сырттан көрсе, мені түсінбей қалар еді.",
      "Саған бәрін түсіндіруге тырысқанымда: «Кішкене ауырмайсыз ба?» деп сұрағаның әлі есімде.",
      "Иә, мүмкін сырт көзге солай көрінер. Бірақ бұл олай емес.",
      "Бұл — сағыныш.",
      "Бұл — күн сайын сені ойлау.",
      "Бұл — сенен бір хабар күтумен ояну.",
      "Бұл — жүректің тыныштық таппауы.",
      "Мен осы уақытқа дейін сен берген үмітпен, сен сыйлаған кішкентай үміттермен өмір сүріп келдім.",
      "Егер кінә менен болса...",
      "Мені кешіре салшы.",
      "Кезінде дайындық курсында математика пәнінен 200 дарынды оқушының ішінде бірінші орында тұрдым.",
      "Университетте де өз мамандығым бойынша 150 үздік студенттің арасынан алғашқы үштіктің қатарында болдым. Халықаралық олимпиадаларға қатыстым.",
      "Ақылмен шешілетін талай қиындықты жеңдім.",
      "Бірақ бір нәрсені түсіндім.",
      "Мүмкін, мен әлсіз емес шығармын.",
      "Бұл — жай ғана шынайы сезім шығар.",
      "Шынайы сүйген адамды әлсіз дейді екен, онда сол әлсіздігімнен ұялмаймын.",
      "Өйткені жүрек ақылға бағынбайды екен.",
      "Адам өз жүрегіне ұмыт — деп бұйрық бере алмайды екен.",
      "Мен де бере алмадым.",
      "Мен сені таза ниетпен, Алланың разылығын тілеп жақсы көрдім.",
      "Сондықтан сені әлі күнге дейін дәл сол қалпы жақсы көремін.",
    ],
  },
  {
    kicker: "Шын көңілден",
    title: "Сен бар болғаның үшін",
    tone: "short",
    lines: [
      "Сен ең әдемі жансың.",
      "Сен тағы да ерекше жансың.",
      "Бақыт деген – бұл өзің.",
      "Бұл ғалам сен бар болғаның үшін әдемі.",
    ],
  },
];

function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const ready = useParticlesEngine();
  const [sceneIndex, setSceneIndex] = useState(0);
  const scene = scenes[sceneIndex];
  const isLastScene = sceneIndex === scenes.length - 1;
  const progress = useMemo(() => ((sceneIndex + 1) / scenes.length) * 100, [sceneIndex]);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        `.${styles.sceneHeader}`,
        { opacity: 0, y: -18, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
      );
      gsap.fromTo(
        `.${styles.poemLine}`,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
      );
      gsap.fromTo(
        `.${styles.actionRow}`,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75, delay: 0.3, ease: "power3.out" },
      );
    }, cardRef);

    return () => context.revert();
  }, [sceneIndex]);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.to(`.${styles.particles}`, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(`.${styles.floatIcon}`, {
        y: -12,
        rotate: 8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.35,
      });
    }, rootRef);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleNext = () => {
    if (!isLastScene) {
      setSceneIndex((index) => index + 1);
    }
  };

  return (
    <section className={styles.hero} ref={rootRef} aria-label="Poetic opening for Dinara">
      {ready && <Particles className={styles.particles} options={petalParticles} />}
      <div className={styles.orbOne} aria-hidden="true" />
      <div className={styles.orbTwo} aria-hidden="true" />
      <FaHeart className={`${styles.floatIcon} ${styles.heartIcon}`} aria-hidden="true" />
      <FaStar className={`${styles.floatIcon} ${styles.starIcon}`} aria-hidden="true" />
      <FaFeatherAlt className={`${styles.floatIcon} ${styles.featherIcon}`} aria-hidden="true" />

      <div className={styles.inner} ref={cardRef}>
        <div className={styles.progress} aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>

        {(scene.kicker || scene.title) && (
          <div className={styles.sceneHeader}>
            <span className={styles.quoteBadge}>
              <FaQuoteLeft />
            </span>
            {scene.kicker && <p className={styles.kicker}>{scene.kicker}</p>}
            {scene.title && <h1 className={styles.title}>{scene.title}</h1>}
          </div>
        )}

        <div
          className={[
            styles.poem,
            scene.lines.length > 6 ? styles.scrollPoem : "",
            scene.tone === "letter" ? styles.letterText : "",
            scene.tone === "short" ? styles.shortText : "",
          ].join(" ")}
        >
          {scene.lines.map((line) => (
            <p className={styles.poemLine} key={line}>
              {line}
            </p>
          ))}
        </div>

        {scene.lines.length > 6 && <p className={styles.scrollHint}>Төмен сырғытып оқы</p>}

        {!isLastScene && (
          <div className={styles.actionRow}>
            <button className={styles.continueButton} type="button" onClick={handleNext} aria-label="Келесі">
              <FaHeart />
              Келесі
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(Hero);
