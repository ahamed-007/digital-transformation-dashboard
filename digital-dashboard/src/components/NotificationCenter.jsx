import { useState, useRef, useEffect } from 'react';
import { NOTIFICATIONS } from '../data';

export default function NotificationCenter({ apiData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(apiData?.notifications || NOTIFICATIONS);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  };

  return (
    <div className="notification-wrapper" ref={dropdownRef}>
      <button className="nav-icon-btn notification-btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="material-icons">notifications</span>
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notif-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && <button onClick={markAllRead}>Mark all read</button>}
          </div>
          <div className="notif-list">
            {notifications.length === 0 ? (
              <p className="notif-empty">No new notifications</p>
            ) : (
              notifications.map(n => (
                <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                  <div className={`notif-icon ${n.type}`}>{getIcon(n.type)}</div>
                  <div className="notif-content">
                    <p className="notif-title">{n.title}</p>
                    <p className="notif-message">{n.message}</p>
                    <span className="notif-time">{n.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="notif-footer">
            <button>View all activity</button>
          </div>
        </div>
      )}
    </div>
  );
}
