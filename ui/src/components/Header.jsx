const HEADER_CONFIG = {
  reviews: { icon: "🎬", title: "영화 리뷰 앱" },
  admin: { icon: "⚙️", title: "관리자 페이지" },
};

export default function Header({ activeNav, onNavigate, variant = "reviews" }) {
  const { icon, title } = HEADER_CONFIG[variant] || HEADER_CONFIG.reviews;

  return (
    <header className="site-header">
      <div className="site-header__brand">
        <span className="site-header__icon" aria-hidden="true">
          {icon}
        </span>
        <h1 className="site-header__title">{title}</h1>
      </div>      <nav className="site-header__nav" aria-label="주요 메뉴">
        <button
          type="button"
          className={
            activeNav === "reviews"
              ? "site-header__link active"
              : "site-header__link"
          }
          onClick={() => onNavigate("reviews")}
        >
          영화 리뷰
        </button>
        <button
          type="button"
          className={
            activeNav === "admin"
              ? "site-header__link active"
              : "site-header__link"
          }
          onClick={() => onNavigate("admin")}
        >
          관리자
        </button>
      </nav>
    </header>
  );
}
