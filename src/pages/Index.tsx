import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "cases" | "reference" | "contacts" | "settings";

const navItems = [
  { id: "home" as Section, label: "Главная", icon: "Scale" },
  { id: "cases" as Section, label: "История дел", icon: "FolderOpen" },
  { id: "reference" as Section, label: "Справочник", icon: "BookOpen" },
  { id: "contacts" as Section, label: "Юристы", icon: "Users" },
  { id: "settings" as Section, label: "Настройки", icon: "Settings" },
];

const statsData = [
  { label: "Дел обработано", value: "47", icon: "FileText", delta: "+3 за месяц" },
  { label: "Статей в базе", value: "1 240", icon: "BookMarked", delta: "УК, КоАП, ГК" },
  { label: "Консультаций", value: "12", icon: "MessageSquare", delta: "Следующая: 10 апр" },
  { label: "Уведомлений", value: "5", icon: "Bell", delta: "2 срочных" },
];

const recentCases = [
  { id: "№ 2024-089", title: "Трудовой спор с работодателем", article: "ст. 77 ТК РФ", status: "active", date: "28 мар 2026", lawyer: "Иванов А.С." },
  { id: "№ 2024-071", title: "Защита прав потребителей", article: "ст. 18 ЗОЗПП", status: "closed", date: "15 фев 2026", lawyer: "Петрова М.В." },
  { id: "№ 2024-063", title: "ДТП — возмещение ущерба", article: "ст. 1064 ГК РФ", status: "urgent", date: "02 янв 2026", lawyer: "Соколов Д.И." },
];

const allCases = [
  { id: "№ 2024-089", title: "Трудовой спор с работодателем", article: "ст. 77 ТК РФ", status: "active", date: "28 мар 2026", lawyer: "Иванов А.С.", desc: "Незаконное увольнение, требование восстановления на работе и выплаты компенсации за вынужденный прогул." },
  { id: "№ 2024-071", title: "Защита прав потребителей", article: "ст. 18 ЗОЗПП", status: "closed", date: "15 фев 2026", lawyer: "Петрова М.В.", desc: "Возврат товара ненадлежащего качества, взыскание стоимости товара и неустойки." },
  { id: "№ 2024-063", title: "ДТП — возмещение ущерба", article: "ст. 1064 ГК РФ", status: "urgent", date: "02 янв 2026", lawyer: "Соколов Д.И.", desc: "Взыскание ущерба с виновника ДТП, утраченного заработка и морального вреда." },
  { id: "№ 2023-214", title: "Наследственный спор", article: "ст. 1152 ГК РФ", status: "closed", date: "10 дек 2025", lawyer: "Иванов А.С.", desc: "Оспаривание завещания, признание права на обязательную долю в наследстве." },
  { id: "№ 2023-198", title: "Раздел имущества при разводе", article: "ст. 38 СК РФ", status: "closed", date: "01 ноя 2025", lawyer: "Петрова М.В.", desc: "Раздел совместно нажитого имущества супругов: квартира, автомобиль, вклады." },
  { id: "№ 2023-156", title: "Административный штраф", article: "ст. 12.9 КоАП", status: "closed", date: "14 окт 2025", lawyer: "Соколов Д.И.", desc: "Обжалование постановления об административном правонарушении." },
];

const articles = [
  { code: "ст. 158 УК РФ", title: "Кража", category: "Уголовное", punishment: "До 2 лет лишения свободы (ч.1)", desc: "Тайное хищение чужого имущества." },
  { code: "ст. 159 УК РФ", title: "Мошенничество", category: "Уголовное", punishment: "До 2 лет (ч.1) / До 10 лет (ч.4)", desc: "Хищение чужого имущества путём обмана или злоупотребления доверием." },
  { code: "ст. 1064 ГК РФ", title: "Общие основания ответственности", category: "Гражданское", punishment: "Полное возмещение вреда", desc: "Вред, причинённый личности или имуществу гражданина, подлежит возмещению в полном объёме." },
  { code: "ст. 77 ТК РФ", title: "Основания расторжения договора", category: "Трудовое", punishment: "Выходное пособие / компенсация", desc: "Общие основания прекращения трудового договора." },
  { code: "ст. 18 ЗОЗПП", title: "Права потребителя при недостатках", category: "Потребительское", punishment: "Возврат стоимости + неустойка 1%/день", desc: "Потребитель вправе потребовать замены товара или возврата уплаченной суммы." },
  { code: "ст. 12.9 КоАП", title: "Превышение скорости", category: "Административное", punishment: "500 — 5000 руб. / лишение прав", desc: "Превышение установленной скорости движения транспортного средства." },
  { code: "ст. 228 УК РФ", title: "Незаконный оборот наркотиков", category: "Уголовное", punishment: "До 3 лет (ч.1) / До 15 лет (ч.5)", desc: "Незаконные приобретение, хранение, перевозка, изготовление, переработка наркотических средств." },
  { code: "ст. 38 СК РФ", title: "Раздел общего имущества", category: "Семейное", punishment: "Раздел в равных долях (по умолчанию)", desc: "Раздел общего имущества супругов может быть произведён как в период брака, так и после его расторжения." },
];

const lawyers = [
  { name: "Иванов Андрей Сергеевич", spec: "Трудовые споры, Семейное право", exp: "14 лет", rating: "4.9", cases: 230, price: "3 000 ₽/час", avail: "Доступен", avatar: "ИА" },
  { name: "Петрова Мария Владимировна", spec: "Защита потребителей, Гражданское право", exp: "9 лет", rating: "4.8", cases: 178, price: "2 500 ₽/час", avail: "Доступен", avatar: "ПМ" },
  { name: "Соколов Дмитрий Игоревич", spec: "ДТП, Административное право, Уголовное", exp: "17 лет", rating: "5.0", cases: 312, price: "4 000 ₽/час", avail: "Занят", avatar: "СД" },
  { name: "Никитина Ольга Павловна", spec: "Наследство, Недвижимость, Сделки", exp: "11 лет", rating: "4.7", cases: 195, price: "3 500 ₽/час", avail: "Доступен", avatar: "НО" },
];

const notifications = [
  { type: "urgent", text: "Срок подачи апелляции по делу № 2024-063 истекает через 3 дня", time: "Сегодня" },
  { type: "info", text: "Обновление: поправки в ст. 159 УК РФ вступили в силу", time: "2 апр" },
  { type: "info", text: "Консультация с Ивановым А.С. — 10 апреля в 14:00", time: "1 апр" },
  { type: "urgent", text: "Требуется подпись документов по делу № 2024-089", time: "31 мар" },
  { type: "info", text: "Новый прецедент по трудовым спорам добавлен в справочник", time: "28 мар" },
];

const categoryColors: Record<string, string> = {
  "Уголовное": "text-red-400 bg-red-400/10 border-red-400/25",
  "Гражданское": "text-blue-400 bg-blue-400/10 border-blue-400/25",
  "Трудовое": "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
  "Потребительское": "text-purple-400 bg-purple-400/10 border-purple-400/25",
  "Административное": "text-orange-400 bg-orange-400/10 border-orange-400/25",
  "Семейное": "text-pink-400 bg-pink-400/10 border-pink-400/25",
};

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [articleFilter, setArticleFilter] = useState("Все");

  const filteredArticles = articles.filter(a =>
    (articleFilter === "Все" || a.category === articleFilter) &&
    (a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const articleCategories = ["Все", "Уголовное", "Гражданское", "Трудовое", "Семейное", "Административное", "Потребительское"];

  return (
    <div className="flex h-screen bg-background overflow-hidden font-body">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col
        bg-[hsl(220,15%,7%)] border-r border-border
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="px-6 py-7 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(43,74%,58%) 0%, hsl(35,65%,45%) 100%)" }}>
              <Icon name="Scale" size={16} className="text-[hsl(220,15%,8%)]" />
            </div>
            <div>
              <div className="font-display text-lg leading-tight text-foreground">ЮрАссистент</div>
              <div className="text-xs text-muted-foreground font-body font-light tracking-widest uppercase">Pro</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-all duration-200 text-left ${
                activeSection === item.id
                  ? "text-[hsl(43,74%,58%)] border-l-2 border-[hsl(43,74%,58%)] bg-[hsl(43,74%,58%,0.08)] pl-[14px]"
                  : "text-muted-foreground border-l-2 border-transparent hover:text-foreground hover:bg-[hsl(43,74%,58%,0.05)]"
              }`}
            >
              <Icon name={item.icon} size={17} />
              <span className="font-body font-normal">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-4 py-5 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[hsl(220,12%,18%)] flex items-center justify-center text-xs font-medium text-muted-foreground border border-border">
              АП
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-foreground truncate">Алексей Попов</div>
              <div className="text-xs text-muted-foreground truncate">Подписка Pro</div>
            </div>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border flex items-center gap-4 px-6 flex-shrink-0">
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon name="Menu" size={20} />
          </button>
          <div className="flex-1">
            <h1 className="font-display text-xl text-foreground">
              {navItems.find(n => n.id === activeSection)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Bell" size={19} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center text-[hsl(220,15%,8%)] font-bold" style={{ background: "linear-gradient(135deg, hsl(43,74%,58%) 0%, hsl(35,65%,45%) 100%)" }}>5</span>
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="HelpCircle" size={19} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "hsl(220,10%,22%) hsl(220,15%,8%)" }}>

          {/* HOME */}
          {activeSection === "home" && (
            <div className="p-6 space-y-8 animate-[fade-in_0.4s_ease_forwards] max-w-6xl mx-auto">
              <div className="relative overflow-hidden rounded border border-border bg-[hsl(220,13%,10%)] p-8">
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, hsl(43,74%,58%,0.12) 0%, transparent 60%)" }} />
                <div className="relative">
                  <div className="text-xs font-body font-light tracking-[0.2em] uppercase text-muted-foreground mb-2">Добро пожаловать</div>
                  <h2 className="font-display text-4xl text-foreground mb-1">Алексей Попов</h2>
                  <p className="text-muted-foreground text-sm font-light mb-6">Ваш правовой ассистент готов к работе. Все данные синхронизированы.</p>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => setActiveSection("cases")}
                      className="text-[hsl(220,15%,8%)] text-sm font-medium px-5 py-2.5 rounded transition-opacity hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, hsl(43,74%,58%) 0%, hsl(35,65%,45%) 100%)" }}
                    >
                      Новое дело
                    </button>
                    <button
                      onClick={() => setActiveSection("reference")}
                      className="bg-[hsl(220,12%,16%)] text-foreground text-sm px-5 py-2.5 rounded border border-border hover:border-[hsl(43,74%,58%,0.4)] transition-colors"
                    >
                      Справочник статей
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat, i) => (
                  <div key={i} className="rounded p-5 border border-border hover:border-[hsl(43,74%,58%,0.35)] transition-colors" style={{ background: "linear-gradient(145deg, hsl(220,13%,12%) 0%, hsl(220,13%,10%) 100%)" }}>
                    <div className="w-9 h-9 rounded mb-3 flex items-center justify-center" style={{ background: "hsl(43,74%,58%,0.1)" }}>
                      <Icon name={stat.icon} size={17} className="text-[hsl(43,74%,58%)]" />
                    </div>
                    <div className="font-display text-3xl text-foreground mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                    <div className="text-xs text-[hsl(43,74%,62%)] font-light">{stat.delta}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded p-6 border border-border bg-[hsl(220,13%,11%)]">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display text-lg text-foreground">Последние дела</h3>
                    <button onClick={() => setActiveSection("cases")} className="text-xs text-[hsl(43,74%,62%)] hover:opacity-70 transition-opacity flex items-center gap-1">
                      Все дела <Icon name="ChevronRight" size={13} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recentCases.map((c) => (
                      <div key={c.id} className="flex items-start gap-4 p-4 rounded bg-[hsl(220,12%,14%)] border border-transparent hover:border-[hsl(43,74%,58%,0.2)] transition-colors cursor-pointer">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs text-muted-foreground font-mono">{c.id}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${
                              c.status === "active" ? "text-[hsl(43,74%,65%)] bg-[hsl(43,74%,58%,0.15)] border-[hsl(43,74%,58%,0.3)]" :
                              c.status === "urgent" ? "text-red-400 bg-red-400/15 border-red-400/30" :
                              "text-muted-foreground bg-[hsl(220,8%,20%)] border-[hsl(220,10%,25%)]"
                            }`}>
                              {c.status === "active" ? "Активно" : c.status === "urgent" ? "Срочно" : "Закрыто"}
                            </span>
                          </div>
                          <div className="text-sm text-foreground mb-1 truncate">{c.title}</div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="text-[hsl(43,74%,62%)]">{c.article}</span>
                            <span>{c.lawyer}</span>
                            <span>{c.date}</span>
                          </div>
                        </div>
                        <Icon name="ChevronRight" size={15} className="text-muted-foreground mt-1 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded p-6 border border-border bg-[hsl(220,13%,11%)]">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display text-lg text-foreground">Уведомления</h3>
                    <span className="text-xs text-[hsl(43,74%,62%)] bg-[hsl(43,74%,58%,0.1)] px-2 py-0.5 rounded">5</span>
                  </div>
                  <div className="space-y-4">
                    {notifications.map((n, i) => (
                      <div key={i} className="flex gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${n.type === "urgent" ? "bg-red-400" : "bg-[hsl(43,74%,58%)]"}`} />
                        <div>
                          <div className="text-xs text-foreground leading-relaxed">{n.text}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{n.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CASES */}
          {activeSection === "cases" && (
            <div className="p-6 space-y-6 animate-[fade-in_0.4s_ease_forwards] max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Всего дел: {allCases.length}</p>
                <div className="flex gap-3">
                  <button className="text-xs text-muted-foreground flex items-center gap-1.5 bg-[hsl(220,12%,14%)] border border-border px-3 py-2 rounded hover:border-[hsl(43,74%,58%,0.3)] transition-colors">
                    <Icon name="Download" size={13} />
                    Экспорт PDF
                  </button>
                  <button className="text-[hsl(220,15%,8%)] text-xs font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity flex items-center gap-1.5" style={{ background: "linear-gradient(135deg, hsl(43,74%,58%) 0%, hsl(35,65%,45%) 100%)" }}>
                    <Icon name="Plus" size={13} />
                    Новое дело
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {allCases.map((c) => (
                  <div key={c.id} className="rounded p-5 border border-border bg-[hsl(220,12%,14%)] hover:border-[hsl(43,74%,58%,0.25)] transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="text-xs text-muted-foreground font-mono">{c.id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${
                            c.status === "active" ? "text-[hsl(43,74%,65%)] bg-[hsl(43,74%,58%,0.15)] border-[hsl(43,74%,58%,0.3)]" :
                            c.status === "urgent" ? "text-red-400 bg-red-400/15 border-red-400/30" :
                            "text-muted-foreground bg-[hsl(220,8%,20%)] border-[hsl(220,10%,25%)]"
                          }`}>
                            {c.status === "active" ? "Активно" : c.status === "urgent" ? "Срочно" : "Закрыто"}
                          </span>
                          <span className="text-xs text-[hsl(43,74%,62%)]">{c.article}</span>
                        </div>
                        <div className="text-base text-foreground mb-2">{c.title}</div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{c.desc}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5"><Icon name="User" size={12} />{c.lawyer}</span>
                          <span className="flex items-center gap-1.5"><Icon name="Calendar" size={12} />{c.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                          <Icon name="FileText" size={13} />
                          PDF
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REFERENCE */}
          {activeSection === "reference" && (
            <div className="p-6 space-y-6 animate-[fade-in_0.4s_ease_forwards] max-w-5xl mx-auto">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск по статьям, прецедентам, ключевым словам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[hsl(220,12%,14%)] border border-border rounded pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(43,74%,58%,0.5)] transition-colors"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <Icon name="X" size={14} />
                  </button>
                )}
              </div>

              <div className="flex gap-2 flex-wrap">
                {articleCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setArticleFilter(cat)}
                    className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                      articleFilter === cat
                        ? "text-[hsl(220,15%,8%)] border-transparent font-medium"
                        : "bg-[hsl(220,12%,14%)] text-muted-foreground border-border hover:border-[hsl(43,74%,58%,0.3)]"
                    }`}
                    style={articleFilter === cat ? { background: "linear-gradient(135deg, hsl(43,74%,58%) 0%, hsl(35,65%,45%) 100%)" } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="text-xs text-muted-foreground">Найдено: {filteredArticles.length} статей</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.map((art, i) => (
                  <div key={i} className="rounded p-5 border border-border bg-[hsl(220,13%,11%)] hover:border-[hsl(43,74%,58%,0.25)] transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <span className="font-mono text-sm text-[hsl(43,74%,62%)] font-medium">{art.code}</span>
                      <span className={`text-xs px-2 py-0.5 rounded border ${categoryColors[art.category] || "text-muted-foreground"}`}>
                        {art.category}
                      </span>
                    </div>
                    <div className="font-display text-base text-foreground mb-2">{art.title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{art.desc}</p>
                    <div className="h-px mb-3" style={{ background: "linear-gradient(90deg, transparent, hsl(43,74%,58%,0.4), transparent)" }} />
                    <div className="flex items-center gap-2">
                      <Icon name="Gavel" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{art.punishment}</span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <Icon name="Search" size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">По вашему запросу ничего не найдено</p>
                </div>
              )}
            </div>
          )}

          {/* CONTACTS */}
          {activeSection === "contacts" && (
            <div className="p-6 space-y-6 animate-[fade-in_0.4s_ease_forwards] max-w-5xl mx-auto">
              <div className="rounded p-5 border border-border bg-[hsl(220,13%,11%)] flex items-center gap-4">
                <div className="w-10 h-10 rounded flex items-center justify-center" style={{ background: "hsl(43,74%,58%,0.1)" }}>
                  <Icon name="Video" size={18} className="text-[hsl(43,74%,62%)]" />
                </div>
                <div>
                  <div className="text-sm text-foreground">Онлайн-консультации</div>
                  <div className="text-xs text-muted-foreground">Запись к любому специалисту — видео или чат</div>
                </div>
                <button className="ml-auto text-[hsl(220,15%,8%)] text-xs font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, hsl(43,74%,58%) 0%, hsl(35,65%,45%) 100%)" }}>
                  Записаться
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {lawyers.map((l, i) => (
                  <div key={i} className="rounded p-6 border border-border bg-[hsl(220,13%,11%)] hover:border-[hsl(43,74%,58%,0.25)] transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded bg-[hsl(220,12%,18%)] border border-border flex items-center justify-center text-sm font-medium text-muted-foreground flex-shrink-0">
                        {l.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-base text-foreground leading-tight mb-1">{l.name}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">{l.spec}</div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${
                        l.avail === "Доступен"
                          ? "text-[hsl(43,74%,65%)] bg-[hsl(43,74%,58%,0.15)] border-[hsl(43,74%,58%,0.3)]"
                          : "text-muted-foreground bg-[hsl(220,8%,20%)] border-[hsl(220,10%,25%)]"
                      }`}>
                        {l.avail}
                      </span>
                    </div>
                    <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, transparent, hsl(43,74%,58%,0.4), transparent)" }} />
                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                      <div>
                        <div className="font-display text-lg text-foreground">{l.exp}</div>
                        <div className="text-xs text-muted-foreground">Опыт</div>
                      </div>
                      <div>
                        <div className="font-display text-lg text-foreground">{l.rating}</div>
                        <div className="text-xs text-muted-foreground">Рейтинг</div>
                      </div>
                      <div>
                        <div className="font-display text-lg text-foreground">{l.cases}</div>
                        <div className="text-xs text-muted-foreground">Дел</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[hsl(43,74%,62%)]">{l.price}</span>
                      <div className="flex gap-2">
                        <button className="text-xs bg-[hsl(220,12%,16%)] border border-border text-foreground px-3 py-1.5 rounded hover:border-[hsl(43,74%,58%,0.4)] transition-colors flex items-center gap-1.5">
                          <Icon name="MessageSquare" size={12} />
                          Чат
                        </button>
                        <button className="text-[hsl(220,15%,8%)] text-xs font-medium px-3 py-1.5 rounded hover:opacity-90 transition-opacity flex items-center gap-1.5" style={{ background: "linear-gradient(135deg, hsl(43,74%,58%) 0%, hsl(35,65%,45%) 100%)" }}>
                          <Icon name="Calendar" size={12} />
                          Записаться
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeSection === "settings" && (
            <div className="p-6 space-y-6 animate-[fade-in_0.4s_ease_forwards] max-w-3xl mx-auto">

              <div className="rounded p-6 border border-border bg-[hsl(220,13%,11%)]">
                <h3 className="font-display text-lg text-foreground mb-5">Профиль</h3>
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded bg-[hsl(220,12%,18%)] border-2 border-[hsl(43,74%,58%,0.3)] flex items-center justify-center text-xl font-medium text-muted-foreground">
                    АП
                  </div>
                  <div>
                    <div className="text-base text-foreground mb-1">Алексей Попов</div>
                    <div className="text-xs text-muted-foreground mb-2">a.popov@email.com</div>
                    <button className="text-xs text-[hsl(43,74%,62%)] hover:opacity-70 transition-opacity">Изменить фото</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Имя", val: "Алексей" },
                    { label: "Фамилия", val: "Попов" },
                    { label: "Email", val: "a.popov@email.com" },
                    { label: "Телефон", val: "+7 (900) 123-45-67" },
                  ].map((f, i) => (
                    <div key={i}>
                      <div className="text-xs text-muted-foreground mb-1.5">{f.label}</div>
                      <input
                        defaultValue={f.val}
                        className="w-full bg-[hsl(220,12%,14%)] border border-border rounded px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[hsl(43,74%,58%,0.5)] transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="text-[hsl(220,15%,8%)] text-sm font-medium px-5 py-2.5 rounded hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, hsl(43,74%,58%) 0%, hsl(35,65%,45%) 100%)" }}>
                    Сохранить изменения
                  </button>
                </div>
              </div>

              <div className="rounded p-6 border border-border bg-[hsl(220,13%,11%)]">
                <h3 className="font-display text-lg text-foreground mb-5">Уведомления</h3>
                <div className="space-y-4">
                  {[
                    { label: "Обновления законодательства", sub: "Изменения в статьях и нормах", on: true },
                    { label: "Напоминания о датах", sub: "Сроки подачи документов", on: true },
                    { label: "Новые прецеденты", sub: "В справочнике появились новые дела", on: false },
                    { label: "Email-рассылка", sub: "Еженедельный дайджест", on: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.sub}</div>
                      </div>
                      <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.on ? "bg-[hsl(43,74%,45%)]" : "bg-[hsl(220,10%,25%)]"}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${item.on ? "translate-x-5" : "translate-x-0.5"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded p-6 border border-border bg-[hsl(220,13%,11%)]">
                <h3 className="font-display text-lg text-foreground mb-5">Синхронизация и экспорт</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-[hsl(220,12%,14%)] rounded border border-border">
                    <div className="flex items-center gap-3">
                      <Icon name="Cloud" size={16} className="text-[hsl(43,74%,62%)]" />
                      <div>
                        <div className="text-sm text-foreground">Облачная синхронизация</div>
                        <div className="text-xs text-muted-foreground">Последняя: сегодня в 09:42</div>
                      </div>
                    </div>
                    <span className="text-xs text-[hsl(43,74%,65%)] bg-[hsl(43,74%,58%,0.15)] border border-[hsl(43,74%,58%,0.3)] px-2 py-0.5 rounded-full">Активна</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[hsl(220,12%,14%)] rounded border border-border">
                    <div className="flex items-center gap-3">
                      <Icon name="FileDown" size={16} className="text-[hsl(43,74%,62%)]" />
                      <div>
                        <div className="text-sm text-foreground">Экспорт всех дел</div>
                        <div className="text-xs text-muted-foreground">PDF или DOCX архив</div>
                      </div>
                    </div>
                    <button className="text-xs bg-[hsl(220,12%,16%)] border border-border text-foreground px-3 py-1.5 rounded hover:border-[hsl(43,74%,58%,0.4)] transition-colors">
                      Экспортировать
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded p-6 border border-border bg-[hsl(220,13%,11%)]">
                <h3 className="font-display text-lg text-foreground mb-5">Подписка</h3>
                <div className="flex items-center justify-between p-4 rounded border border-[hsl(43,74%,58%,0.3)] bg-[hsl(43,74%,58%,0.05)]">
                  <div>
                    <div className="text-sm text-[hsl(43,74%,62%)] font-medium">Pro — активна</div>
                    <div className="text-xs text-muted-foreground">Следующее списание: 5 мая 2026</div>
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Управление</button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}