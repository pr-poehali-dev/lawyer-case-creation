import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "cases" | "reference" | "contacts" | "settings";

interface Case {
  id: string;
  title: string;
  article: string;
  status: "active" | "urgent" | "closed";
  date: string;
  lawyer: string;
  desc: string;
}

interface NotificationItem {
  type: "urgent" | "info";
  text: string;
  time: string;
  read: boolean;
}

const navItems = [
  { id: "home" as Section, label: "Главная", icon: "Scale" },
  { id: "cases" as Section, label: "История дел", icon: "FolderOpen" },
  { id: "reference" as Section, label: "Справочник", icon: "BookOpen" },
  { id: "contacts" as Section, label: "Юристы", icon: "Users" },
  { id: "settings" as Section, label: "Настройки", icon: "Settings" },
];

const initialCases: Case[] = [
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

const categoryColors: Record<string, string> = {
  "Уголовное": "text-red-400 bg-red-400/10 border-red-400/25",
  "Гражданское": "text-blue-400 bg-blue-400/10 border-blue-400/25",
  "Трудовое": "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
  "Потребительское": "text-purple-400 bg-purple-400/10 border-purple-400/25",
  "Административное": "text-orange-400 bg-orange-400/10 border-orange-400/25",
  "Семейное": "text-pink-400 bg-pink-400/10 border-pink-400/25",
};

const GoldBtn = ({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <button
    onClick={onClick}
    className={`text-[hsl(220,15%,8%)] font-medium rounded hover:opacity-90 transition-opacity ${className}`}
    style={{ background: "linear-gradient(135deg, hsl(43,74%,58%) 0%, hsl(35,65%,45%) 100%)" }}
  >
    {children}
  </button>
);

const GhostBtn = ({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <button
    onClick={onClick}
    className={`bg-[hsl(220,12%,16%)] text-foreground border border-border rounded hover:border-[hsl(43,74%,58%,0.4)] transition-colors ${className}`}
  >
    {children}
  </button>
);

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; cls: string }> = {
    active: { label: "Активно", cls: "text-[hsl(43,74%,65%)] bg-[hsl(43,74%,58%,0.15)] border-[hsl(43,74%,58%,0.3)]" },
    urgent: { label: "Срочно", cls: "text-red-400 bg-red-400/15 border-red-400/30" },
    closed: { label: "Закрыто", cls: "text-muted-foreground bg-[hsl(220,8%,20%)] border-[hsl(220,10%,25%)]" },
  };
  const s = map[status] ?? map.closed;
  return <span className={`text-xs px-2 py-0.5 rounded-full border ${s.cls}`}>{s.label}</span>;
};

const Divider = () => (
  <div className="h-px my-0" style={{ background: "linear-gradient(90deg, transparent, hsl(43,74%,58%,0.4), transparent)" }} />
);

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [articleFilter, setArticleFilter] = useState("Все");

  // Cases state
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [showNewCase, setShowNewCase] = useState(false);
  const [newCase, setNewCase] = useState({ title: "", article: "", desc: "", lawyer: "Иванов А.С.", status: "active" as Case["status"] });
  const [caseSuccess, setCaseSuccess] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { type: "urgent", text: "Срок подачи апелляции по делу № 2024-063 истекает через 3 дня", time: "Сегодня", read: false },
    { type: "info", text: "Обновление: поправки в ст. 159 УК РФ вступили в силу", time: "2 апр", read: false },
    { type: "info", text: "Консультация с Ивановым А.С. — 10 апреля в 14:00", time: "1 апр", read: false },
    { type: "urgent", text: "Требуется подпись документов по делу № 2024-089", time: "31 мар", read: false },
    { type: "info", text: "Новый прецедент по трудовым спорам добавлен в справочник", time: "28 мар", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Booking state
  const [bookingLawyer, setBookingLawyer] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({ date: "", time: "", topic: "" });
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Profile state
  const [profile, setProfile] = useState({ firstName: "Алексей", lastName: "Попов", email: "a.popov@email.com", phone: "+7 (900) 123-45-67" });
  const [profileSaved, setProfileSaved] = useState(false);

  // Notification toggles
  const [notifSettings, setNotifSettings] = useState([
    { label: "Обновления законодательства", sub: "Изменения в статьях и нормах", on: true },
    { label: "Напоминания о датах", sub: "Сроки подачи документов", on: true },
    { label: "Новые прецеденты", sub: "В справочнике появились новые дела", on: false },
    { label: "Email-рассылка", sub: "Еженедельный дайджест", on: false },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredArticles = articles.filter(a =>
    (articleFilter === "Все" || a.category === articleFilter) &&
    (a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const articleCategories = ["Все", "Уголовное", "Гражданское", "Трудовое", "Семейное", "Административное", "Потребительское"];

  function handleCreateCase() {
    if (!newCase.title.trim() || !newCase.article.trim()) return;
    const today = new Date();
    const dateStr = today.toLocaleDateString("ru-RU", { day: "2-digit", month: "short", year: "numeric" });
    const newId = `№ ${today.getFullYear()}-${String(cases.length + 100).padStart(3, "0")}`;
    const created: Case = { id: newId, title: newCase.title, article: newCase.article, desc: newCase.desc, lawyer: newCase.lawyer, status: newCase.status, date: dateStr };
    setCases([created, ...cases]);
    setNewCase({ title: "", article: "", desc: "", lawyer: "Иванов А.С.", status: "active" });
    setShowNewCase(false);
    setCaseSuccess(true);
    setTimeout(() => setCaseSuccess(false), 3000);
    setActiveSection("cases");
  }

  function handleBooking() {
    if (!bookingForm.date || !bookingForm.time || !bookingForm.topic.trim()) return;
    const newNotif: NotificationItem = {
      type: "info",
      text: `Консультация с ${bookingLawyer} — ${bookingForm.date} в ${bookingForm.time}`,
      time: "Только что",
      read: false,
    };
    setNotifications([newNotif, ...notifications]);
    setBookingSuccess(bookingLawyer);
    setBookingLawyer(null);
    setBookingForm({ date: "", time: "", topic: "" });
  }

  function handleSaveProfile() {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  }

  function markAllRead() {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  }

  const navTo = (s: Section) => { setActiveSection(s); setSidebarOpen(false); };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-body">

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Notifications panel overlay */}
      {showNotifications && <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />}

      {/* NEW CASE MODAL */}
      {showNewCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="w-full max-w-lg bg-[hsl(220,13%,11%)] border border-border rounded-lg p-6 animate-[fade-in_0.25s_ease_forwards]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl text-foreground">Новое дело</h3>
              <button onClick={() => setShowNewCase(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Название дела *</label>
                <input
                  value={newCase.title}
                  onChange={e => setNewCase({ ...newCase, title: e.target.value })}
                  placeholder="Например: Трудовой спор с работодателем"
                  className="w-full bg-[hsl(220,12%,14%)] border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(43,74%,58%,0.5)] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Статья *</label>
                <input
                  value={newCase.article}
                  onChange={e => setNewCase({ ...newCase, article: e.target.value })}
                  placeholder="Например: ст. 77 ТК РФ"
                  className="w-full bg-[hsl(220,12%,14%)] border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(43,74%,58%,0.5)] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Описание</label>
                <textarea
                  value={newCase.desc}
                  onChange={e => setNewCase({ ...newCase, desc: e.target.value })}
                  placeholder="Краткое описание ситуации..."
                  rows={3}
                  className="w-full bg-[hsl(220,12%,14%)] border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(43,74%,58%,0.5)] transition-colors resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Юрист</label>
                  <select
                    value={newCase.lawyer}
                    onChange={e => setNewCase({ ...newCase, lawyer: e.target.value })}
                    className="w-full bg-[hsl(220,12%,14%)] border border-border rounded px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[hsl(43,74%,58%,0.5)] transition-colors"
                  >
                    {lawyers.map(l => <option key={l.name} value={l.name.split(" ").slice(0, 2).join(" ")}>{l.name.split(" ").slice(0, 2).join(" ")}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Статус</label>
                  <select
                    value={newCase.status}
                    onChange={e => setNewCase({ ...newCase, status: e.target.value as Case["status"] })}
                    className="w-full bg-[hsl(220,12%,14%)] border border-border rounded px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[hsl(43,74%,58%,0.5)] transition-colors"
                  >
                    <option value="active">Активно</option>
                    <option value="urgent">Срочно</option>
                    <option value="closed">Закрыто</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <GoldBtn onClick={handleCreateCase} className="flex-1 py-2.5 text-sm">
                Создать дело
              </GoldBtn>
              <GhostBtn onClick={() => setShowNewCase(false)} className="px-5 py-2.5 text-sm">
                Отмена
              </GhostBtn>
            </div>
            {(!newCase.title.trim() || !newCase.article.trim()) && (
              <p className="text-xs text-muted-foreground mt-2 text-center">* Заполните название и статью</p>
            )}
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookingLawyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="w-full max-w-md bg-[hsl(220,13%,11%)] border border-border rounded-lg p-6 animate-[fade-in_0.25s_ease_forwards]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl text-foreground">Запись на консультацию</h3>
              <button onClick={() => setBookingLawyer(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[hsl(220,12%,14%)] rounded mb-4">
              <div className="w-9 h-9 rounded bg-[hsl(220,12%,20%)] border border-border flex items-center justify-center text-xs text-muted-foreground flex-shrink-0">
                {lawyers.find(l => l.name === bookingLawyer)?.avatar}
              </div>
              <div>
                <div className="text-sm text-foreground">{bookingLawyer}</div>
                <div className="text-xs text-muted-foreground">{lawyers.find(l => l.name === bookingLawyer)?.spec}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Дата *</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full bg-[hsl(220,12%,14%)] border border-border rounded px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[hsl(43,74%,58%,0.5)] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Время *</label>
                  <select
                    value={bookingForm.time}
                    onChange={e => setBookingForm({ ...bookingForm, time: e.target.value })}
                    className="w-full bg-[hsl(220,12%,14%)] border border-border rounded px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[hsl(43,74%,58%,0.5)] transition-colors"
                  >
                    <option value="">Выберите</option>
                    {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Тема консультации *</label>
                <input
                  value={bookingForm.topic}
                  onChange={e => setBookingForm({ ...bookingForm, topic: e.target.value })}
                  placeholder="Кратко опишите вопрос..."
                  className="w-full bg-[hsl(220,12%,14%)] border border-border rounded px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(43,74%,58%,0.5)] transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <GoldBtn
                onClick={handleBooking}
                className={`flex-1 py-2.5 text-sm ${(!bookingForm.date || !bookingForm.time || !bookingForm.topic.trim()) ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Подтвердить запись
              </GoldBtn>
              <GhostBtn onClick={() => setBookingLawyer(null)} className="px-5 py-2.5 text-sm">
                Отмена
              </GhostBtn>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING SUCCESS */}
      {bookingSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[hsl(220,13%,13%)] border border-[hsl(43,74%,58%,0.4)] rounded-lg p-4 flex items-center gap-3 animate-[fade-in_0.3s_ease_forwards] max-w-sm">
          <Icon name="CheckCircle" size={18} className="text-[hsl(43,74%,58%)] flex-shrink-0" />
          <div>
            <div className="text-sm text-foreground">Запись подтверждена</div>
            <div className="text-xs text-muted-foreground">Консультация с {bookingSuccess} добавлена в уведомления</div>
          </div>
          <button onClick={() => setBookingSuccess(null)} className="text-muted-foreground hover:text-foreground ml-1">
            <Icon name="X" size={14} />
          </button>
        </div>
      )}

      {/* CASE SUCCESS */}
      {caseSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[hsl(220,13%,13%)] border border-[hsl(43,74%,58%,0.4)] rounded-lg p-4 flex items-center gap-3 animate-[fade-in_0.3s_ease_forwards]">
          <Icon name="CheckCircle" size={18} className="text-[hsl(43,74%,58%)] flex-shrink-0" />
          <div className="text-sm text-foreground">Дело успешно создано</div>
          <button onClick={() => setCaseSuccess(false)} className="text-muted-foreground hover:text-foreground ml-1">
            <Icon name="X" size={14} />
          </button>
        </div>
      )}

      {/* PROFILE SAVED */}
      {profileSaved && (
        <div className="fixed bottom-6 right-6 z-50 bg-[hsl(220,13%,13%)] border border-[hsl(43,74%,58%,0.4)] rounded-lg p-4 flex items-center gap-3 animate-[fade-in_0.3s_ease_forwards]">
          <Icon name="CheckCircle" size={18} className="text-[hsl(43,74%,58%)] flex-shrink-0" />
          <div className="text-sm text-foreground">Профиль сохранён</div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col bg-[hsl(220,15%,7%)] border-r border-border transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="px-6 py-7 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(43,74%,58%) 0%, hsl(35,65%,45%) 100%)" }}>
              <Icon name="Scale" size={16} className="text-[hsl(220,15%,8%)]" />
            </div>
            <div>
              <div className="font-display text-lg leading-tight text-foreground">ЮрАссистент</div>
              <div className="text-xs text-muted-foreground font-light tracking-widest uppercase">Pro</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => navTo(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-all duration-200 text-left ${
                activeSection === item.id
                  ? "text-[hsl(43,74%,58%)] border-l-2 border-[hsl(43,74%,58%)] bg-[hsl(43,74%,58%,0.08)]"
                  : "text-muted-foreground border-l-2 border-transparent hover:text-foreground hover:bg-[hsl(43,74%,58%,0.05)]"
              }`}
            >
              <Icon name={item.icon} size={17} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 py-5 border-t border-border">
          <button onClick={() => navTo("settings")} className="flex items-center gap-3 w-full text-left hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded bg-[hsl(220,12%,18%)] flex items-center justify-center text-xs font-medium text-muted-foreground border border-border">АП</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-foreground truncate">{profile.firstName} {profile.lastName}</div>
              <div className="text-xs text-muted-foreground truncate">Подписка Pro</div>
            </div>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border flex items-center gap-4 px-6 flex-shrink-0">
          <button className="lg:hidden text-muted-foreground hover:text-foreground transition-colors" onClick={() => setSidebarOpen(true)}>
            <Icon name="Menu" size={20} />
          </button>
          <div className="flex-1">
            <h1 className="font-display text-xl text-foreground">{navItems.find(n => n.id === activeSection)?.label}</h1>
          </div>
          <div className="flex items-center gap-3 relative">
            {/* Notifications bell */}
            <button
              className="relative text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Icon name="Bell" size={19} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center text-[hsl(220,15%,8%)] font-bold" style={{ background: "linear-gradient(135deg, hsl(43,74%,58%) 0%, hsl(35,65%,45%) 100%)" }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute top-10 right-0 z-50 w-80 bg-[hsl(220,13%,11%)] border border-border rounded-lg shadow-2xl animate-[fade-in_0.2s_ease_forwards]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <span className="text-sm text-foreground font-medium">Уведомления</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-[hsl(43,74%,62%)] hover:opacity-70 transition-opacity">
                      Прочитать все
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n, i) => (
                    <div
                      key={i}
                      onClick={() => setNotifications(notifications.map((x, j) => j === i ? { ...x, read: true } : x))}
                      className={`flex gap-3 px-4 py-3 cursor-pointer hover:bg-[hsl(220,12%,14%)] transition-colors border-b border-border last:border-0 ${!n.read ? "bg-[hsl(43,74%,58%,0.04)]" : ""}`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${n.type === "urgent" ? "bg-red-400" : "bg-[hsl(43,74%,58%)]"} ${n.read ? "opacity-30" : ""}`} />
                      <div className="flex-1">
                        <div className={`text-xs leading-relaxed ${n.read ? "text-muted-foreground" : "text-foreground"}`}>{n.text}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "hsl(220,10%,22%) hsl(220,15%,8%)" }}>

          {/* ─── HOME ─── */}
          {activeSection === "home" && (
            <div className="p-6 space-y-8 animate-[fade-in_0.4s_ease_forwards] max-w-6xl mx-auto">
              <div className="relative overflow-hidden rounded border border-border bg-[hsl(220,13%,10%)] p-8">
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, hsl(43,74%,58%,0.12) 0%, transparent 60%)" }} />
                <div className="relative">
                  <div className="text-xs font-light tracking-[0.2em] uppercase text-muted-foreground mb-2">Добро пожаловать</div>
                  <h2 className="font-display text-4xl text-foreground mb-1">{profile.firstName} {profile.lastName}</h2>
                  <p className="text-muted-foreground text-sm font-light mb-6">Ваш правовой ассистент готов к работе. Все данные синхронизированы.</p>
                  <div className="flex gap-3 flex-wrap">
                    <GoldBtn onClick={() => setShowNewCase(true)} className="text-sm px-5 py-2.5">
                      Новое дело
                    </GoldBtn>
                    <GhostBtn onClick={() => navTo("reference")} className="text-sm px-5 py-2.5">
                      Справочник статей
                    </GhostBtn>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Дел обработано", value: String(cases.length), icon: "FileText", delta: `${cases.filter(c => c.status === "active").length} активных` },
                  { label: "Статей в базе", value: "1 240", icon: "BookMarked", delta: "УК, КоАП, ГК" },
                  { label: "Консультаций", value: "12", icon: "MessageSquare", delta: "Следующая: 10 апр" },
                  { label: "Уведомлений", value: String(unreadCount), icon: "Bell", delta: `${notifications.filter(n => n.type === "urgent" && !n.read).length} срочных` },
                ].map((stat, i) => (
                  <div key={i} className="rounded p-5 border border-border hover:border-[hsl(43,74%,58%,0.35)] transition-colors cursor-pointer" style={{ background: "linear-gradient(145deg, hsl(220,13%,12%) 0%, hsl(220,13%,10%) 100%)" }}
                    onClick={() => { if (i === 0) navTo("cases"); if (i === 3) setShowNotifications(true); }}>
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
                    <button onClick={() => navTo("cases")} className="text-xs text-[hsl(43,74%,62%)] hover:opacity-70 transition-opacity flex items-center gap-1">
                      Все дела <Icon name="ChevronRight" size={13} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {cases.slice(0, 3).map(c => (
                      <div key={c.id} onClick={() => navTo("cases")} className="flex items-start gap-4 p-4 rounded bg-[hsl(220,12%,14%)] border border-transparent hover:border-[hsl(43,74%,58%,0.2)] transition-colors cursor-pointer">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs text-muted-foreground font-mono">{c.id}</span>
                            <StatusBadge status={c.status} />
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
                    <span className="text-xs text-[hsl(43,74%,62%)] bg-[hsl(43,74%,58%,0.1)] px-2 py-0.5 rounded">{unreadCount}</span>
                  </div>
                  <div className="space-y-4">
                    {notifications.slice(0, 5).map((n, i) => (
                      <div key={i} className="flex gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${n.type === "urgent" ? "bg-red-400" : "bg-[hsl(43,74%,58%)]"} ${n.read ? "opacity-30" : ""}`} />
                        <div>
                          <div className={`text-xs leading-relaxed ${n.read ? "text-muted-foreground" : "text-foreground"}`}>{n.text}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{n.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── CASES ─── */}
          {activeSection === "cases" && (
            <div className="p-6 space-y-6 animate-[fade-in_0.4s_ease_forwards] max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Всего дел: <span className="text-foreground">{cases.length}</span></p>
                <div className="flex gap-3">
                  <GhostBtn className="text-xs flex items-center gap-1.5 px-3 py-2">
                    <Icon name="Download" size={13} />
                    Экспорт PDF
                  </GhostBtn>
                  <GoldBtn onClick={() => setShowNewCase(true)} className="text-xs px-4 py-2 flex items-center gap-1.5">
                    <Icon name="Plus" size={13} />
                    Новое дело
                  </GoldBtn>
                </div>
              </div>
              <div className="space-y-3">
                {cases.map(c => (
                  <div key={c.id} className="rounded p-5 border border-border bg-[hsl(220,12%,14%)] hover:border-[hsl(43,74%,58%,0.25)] transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="text-xs text-muted-foreground font-mono">{c.id}</span>
                          <StatusBadge status={c.status} />
                          <span className="text-xs text-[hsl(43,74%,62%)]">{c.article}</span>
                        </div>
                        <div className="text-base text-foreground mb-2">{c.title}</div>
                        {c.desc && <p className="text-xs text-muted-foreground leading-relaxed mb-3">{c.desc}</p>}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5"><Icon name="User" size={12} />{c.lawyer}</span>
                          <span className="flex items-center gap-1.5"><Icon name="Calendar" size={12} />{c.date}</span>
                        </div>
                      </div>
                      <button className="text-xs text-muted-foreground hover:text-[hsl(43,74%,62%)] flex items-center gap-1 transition-colors flex-shrink-0">
                        <Icon name="FileText" size={13} />
                        PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── REFERENCE ─── */}
          {activeSection === "reference" && (
            <div className="p-6 space-y-6 animate-[fade-in_0.4s_ease_forwards] max-w-5xl mx-auto">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск по статьям, прецедентам, ключевым словам..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
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
                    className={`text-xs px-3 py-1.5 rounded border transition-colors ${articleFilter === cat ? "text-[hsl(220,15%,8%)] border-transparent font-medium" : "bg-[hsl(220,12%,14%)] text-muted-foreground border-border hover:border-[hsl(43,74%,58%,0.3)]"}`}
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
                      <span className={`text-xs px-2 py-0.5 rounded border ${categoryColors[art.category] || "text-muted-foreground"}`}>{art.category}</span>
                    </div>
                    <div className="font-display text-base text-foreground mb-2">{art.title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{art.desc}</p>
                    <Divider />
                    <div className="flex items-center gap-2 mt-3">
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

          {/* ─── CONTACTS ─── */}
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
                <GoldBtn onClick={() => setBookingLawyer(lawyers[0].name)} className="ml-auto text-xs px-4 py-2">
                  Записаться
                </GoldBtn>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {lawyers.map((l, i) => (
                  <div key={i} className="rounded p-6 border border-border bg-[hsl(220,13%,11%)] hover:border-[hsl(43,74%,58%,0.25)] transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded bg-[hsl(220,12%,18%)] border border-border flex items-center justify-center text-sm font-medium text-muted-foreground flex-shrink-0">{l.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-base text-foreground leading-tight mb-1">{l.name}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">{l.spec}</div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${l.avail === "Доступен" ? "text-[hsl(43,74%,65%)] bg-[hsl(43,74%,58%,0.15)] border-[hsl(43,74%,58%,0.3)]" : "text-muted-foreground bg-[hsl(220,8%,20%)] border-[hsl(220,10%,25%)]"}`}>
                        {l.avail}
                      </span>
                    </div>
                    <Divider />
                    <div className="grid grid-cols-3 gap-3 my-4 text-center">
                      <div><div className="font-display text-lg text-foreground">{l.exp}</div><div className="text-xs text-muted-foreground">Опыт</div></div>
                      <div><div className="font-display text-lg text-foreground">{l.rating}</div><div className="text-xs text-muted-foreground">Рейтинг</div></div>
                      <div><div className="font-display text-lg text-foreground">{l.cases}</div><div className="text-xs text-muted-foreground">Дел</div></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[hsl(43,74%,62%)]">{l.price}</span>
                      <div className="flex gap-2">
                        <GhostBtn className="text-xs px-3 py-1.5 flex items-center gap-1.5">
                          <Icon name="MessageSquare" size={12} />
                          Чат
                        </GhostBtn>
                        <GoldBtn
                          onClick={() => l.avail === "Доступен" ? setBookingLawyer(l.name) : undefined}
                          className={`text-xs px-3 py-1.5 flex items-center gap-1.5 ${l.avail !== "Доступен" ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <Icon name="Calendar" size={12} />
                          Записаться
                        </GoldBtn>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SETTINGS ─── */}
          {activeSection === "settings" && (
            <div className="p-6 space-y-6 animate-[fade-in_0.4s_ease_forwards] max-w-3xl mx-auto">
              <div className="rounded p-6 border border-border bg-[hsl(220,13%,11%)]">
                <h3 className="font-display text-lg text-foreground mb-5">Профиль</h3>
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded bg-[hsl(220,12%,18%)] border-2 border-[hsl(43,74%,58%,0.3)] flex items-center justify-center text-xl font-medium text-muted-foreground">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </div>
                  <div>
                    <div className="text-base text-foreground mb-1">{profile.firstName} {profile.lastName}</div>
                    <div className="text-xs text-muted-foreground mb-2">{profile.email}</div>
                    <button className="text-xs text-[hsl(43,74%,62%)] hover:opacity-70 transition-opacity">Изменить фото</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {([
                    { label: "Имя", key: "firstName" as const },
                    { label: "Фамилия", key: "lastName" as const },
                    { label: "Email", key: "email" as const },
                    { label: "Телефон", key: "phone" as const },
                  ] as { label: string; key: keyof typeof profile }[]).map(f => (
                    <div key={f.key}>
                      <label className="text-xs text-muted-foreground mb-1.5 block">{f.label}</label>
                      <input
                        value={profile[f.key]}
                        onChange={e => setProfile({ ...profile, [f.key]: e.target.value })}
                        className="w-full bg-[hsl(220,12%,14%)] border border-border rounded px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[hsl(43,74%,58%,0.5)] transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <GoldBtn onClick={handleSaveProfile} className="text-sm px-5 py-2.5">
                    Сохранить изменения
                  </GoldBtn>
                </div>
              </div>

              <div className="rounded p-6 border border-border bg-[hsl(220,13%,11%)]">
                <h3 className="font-display text-lg text-foreground mb-5">Уведомления</h3>
                <div className="space-y-4">
                  {notifSettings.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.sub}</div>
                      </div>
                      <button
                        onClick={() => setNotifSettings(notifSettings.map((x, j) => j === i ? { ...x, on: !x.on } : x))}
                        className={`w-10 h-5 rounded-full relative transition-colors ${item.on ? "bg-[hsl(43,74%,45%)]" : "bg-[hsl(220,10%,25%)]"}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${item.on ? "translate-x-5" : "translate-x-0.5"}`} />
                      </button>
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
                    <GhostBtn className="text-xs px-3 py-1.5">Экспортировать</GhostBtn>
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
                  <GhostBtn className="text-xs px-3 py-1.5">Управление</GhostBtn>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
