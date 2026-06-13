import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './styles/Sidebar.css';

const icons = {
  home: <><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-7h6v7"/></>,
  tasks: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
  food: <><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M17 3c-2 3-2 7 0 9v9M17 3c3 3 3 7 0 9"/></>,
  chat: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/><path d="M8 9h8M8 13h5"/></>,
  video: <><rect x="3" y="5" width="14" height="14" rx="2"/><path d="m17 10 4-2v8l-4-2z"/></>,
  blog: <><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
};

const Icon = ({ name }) => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {icons[name] || icons.home}
  </svg>
);

const menus = {
  client: [
    ['/client/dashboard', 'האזור האישי', 'home'],
    ['/client/tasks', 'משימות ואימונים', 'tasks'],
    ['/client/food-plan', 'תוכנית תזונה', 'food'],
    ['/client/videos', 'ספריית וידאו', 'video'],
    ['/client/blogs', 'תוכן מקצועי', 'blog'],
  ],
  trainer: [
    ['/trainer/dashboard', 'סקירה כללית', 'home'],
    ['/trainer/videos', 'ספריית וידאו', 'video'],
    ['/trainer/tasks', 'ניהול משימות', 'tasks'],
    ['/trainer/blogs', 'תוכן ומאמרים', 'blog'],
  ],
  nutritionist: [
    ['/nutritionist/dashboard', 'סקירה כללית', 'home'],
    ['/nutritionist/clients', 'ניהול מטופלים', 'users'],
    ['/nutritionist/tasks', 'ניהול משימות', 'tasks'],
    ['/nutritionist/blogs', 'תוכן ומאמרים', 'blog'],
  ],
  admin: [
    ['/admin/dashboard', 'ניהול משתמשים', 'users'],
    ['/admin/tasks', 'ניהול משימות', 'tasks'],
    ['/admin/blogs', 'ניהול תוכן', 'blog'],
    ['/admin/videos', 'ניהול סרטונים', 'video'],
  ],
};

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const items = menus[user?.role] || [];
  if (!items.length) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-label">מרכז שליטה</div>
      <nav className="sidebar-menu" aria-label="ניווט ראשי">
        {items.map(([to, label, icon]) => (
          <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
            <Icon name={icon} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-support">
        <span className="support-dot" />
        <div><strong>המערכת פעילה</strong><small>כל השירותים זמינים</small></div>
      </div>
    </aside>
  );
};

export default Sidebar;
