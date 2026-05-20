import { getCategoryName, getItemsByCategory, type Category, type Lang } from "../lib/menu-data";
import { MenuItemCard } from "./MenuItemCard";

type Props = {
  category: Category;
  lang: Lang;
};

export function CategorySection({ category, lang }: Props) {
  const items = getItemsByCategory(category.id);

  return (
    <section id={category.id} style={{ marginBottom: "32px" }}>
      {/* Category heading */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "4px",
          paddingBottom: "10px",
          borderBottom: "1px solid rgba(201,162,90,0.2)",
        }}
      >
        <span style={{ fontSize: "22px", lineHeight: 1 }}>{category.emoji}</span>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "26px",
            fontWeight: 500,
            fontStyle: "italic",
            color: "#c9a25a",
            margin: 0,
            letterSpacing: "0.02em",
          }}
        >
          {getCategoryName(category, lang)}
        </h2>
      </div>

      {/* Items */}
      <div>
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} lang={lang} />
        ))}
      </div>
    </section>
  );
}
