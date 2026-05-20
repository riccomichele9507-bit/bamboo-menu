import { useEffect, useRef, useState } from "react";
import { categories, getCategoryName, type Lang } from "../lib/menu-data";

type Props = { lang: Lang };

export function CategoryNav({ lang }: Props) {
  const [active, setActive] = useState(categories[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollRef.current?.querySelector(`[data-cat="${active}"]`);
    if (el && scrollRef.current) {
      const c = scrollRef.current;
      const r = (el as HTMLElement).getBoundingClientRect();
      const cr = c.getBoundingClientRect();
      if (r.left < cr.left + 16 || r.right > cr.right - 16) {
        c.scrollTo({
          left:
            (el as HTMLElement).offsetLeft -
            c.clientWidth / 2 +
            (el as HTMLElement).clientWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [active]);

  function go(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 110;
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <nav
      style={{
        position: "sticky",
        top: "56px",
        zIndex: 40,
        background: "rgba(11,14,12,0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(201,162,90,0.08)",
      }}
    >
      <div
        ref={scrollRef}
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <ul
          style={{
            display: "flex",
            gap: "6px",
            padding: "10px 16px",
            minWidth: "max-content",
            margin: 0,
            listStyle: "none",
          }}
        >
          {categories.map((c) => {
            const isActive = c.id === active;
            return (
              <li key={c.id}>
                <button
                  data-cat={c.id}
                  onClick={() => go(c.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "999px",
                    border: isActive
                      ? "1px solid rgba(201,162,90,0.6)"
                      : "1px solid rgba(201,162,90,0.15)",
                    background: isActive
                      ? "rgba(201,162,90,0.18)"
                      : "rgba(255,255,255,0.04)",
                    color: isActive ? "#c9a25a" : "rgba(243,238,226,0.55)",
                    fontSize: "13px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ fontSize: "16px", lineHeight: 1 }}>{c.emoji}</span>
                  <span>{getCategoryName(c, lang)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
