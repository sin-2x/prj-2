import { RefObject, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsapReveal(ref: RefObject<HTMLElement | null>, selector: string) {
  useEffect(() => {
    if (!ref.current) return;

    const context = gsap.context(() => {
      gsap.from(selector, {
        y: 34,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.16,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 72%",
        },
      });
    }, ref);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [ref, selector]);
}
