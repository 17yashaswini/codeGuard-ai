import { Link, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { useUserContext } from '../context/UserContext';
import { LayoutDashboard, Code2, History, Shield, Zap } from 'lucide-react';

const Layout = ({ children }) => {
  const { credits } = useUserContext();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/analyze', label: 'Analyze Code', icon: Code2 },
    { path: '/history', label: 'History', icon: History },
  ];

  return (
    <div style={{display: 'flex', minHeight: '100vh', background: '#050810', color: 'white'}}>

      {/* Background grid */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Sidebar */}
      <aside style={{
        position: 'relative', zIndex: 10, width: '260px', display: 'flex',
        flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.05)',
        background: '#070b14', flexShrink: 0
      }}>

        {/* Logo */}
        <div style={{padding: '1.75rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.625rem'}}>
            <div style={{width: '2rem', height: '2rem', borderRadius: '0.5rem', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Shield size={15} style={{color: '#60a5fa'}} />
            </div>
            <span style={{fontWeight: 700, fontSize: '1rem', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em'}}>
              Code<span style={{color: '#60a5fa'}}>Guard</span>
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{flex: 1, padding: '1rem'}}>
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem 1rem', borderRadius: '0.75rem',
                  marginBottom: '0.25rem', textDecoration: 'none',
                  fontSize: '0.875rem', fontWeight: 500,
                  transition: 'all 0.2s ease',
                  background: isActive ? 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.08))' : 'transparent',
                  border: isActive ? '1px solid rgba(59,130,246,0.25)' : '1px solid transparent',
                  color: isActive ? '#60a5fa' : '#6b7280',
                }}
              >
                <Icon size={16} />
                {label}
                {isActive && <div style={{marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#60a5fa'}} />}
              </Link>
            );
          })}
        </nav>

        {/* Credits + User */}
        <div style={{padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
          <div style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1rem'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem'}}>
              <span style={{fontSize: '0.7rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.375rem'}}>
                <Zap size={10} style={{color: '#60a5fa'}} />
                Credits
              </span>
              <span style={{fontSize: '0.7rem', color: '#4b5563'}}>/ 5 total</span>
            </div>
            <div style={{display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '0.75rem'}}>
              <span style={{fontSize: '2rem', fontWeight: 900, color: '#60a5fa', fontFamily: 'Syne, sans-serif', lineHeight: 1}}>{credits}</span>
              <span style={{fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.15rem'}}>remaining</span>
            </div>
            <div style={{height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', overflow: 'hidden'}}>
              <div style={{height: '100%', width: `${(credits / 5) * 100}%`, background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', borderRadius: '999px', transition: 'width 0.5s ease'}} />
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.25rem'}}>
            <UserButton afterSignOutUrl="/" />
            <span style={{fontSize: '0.75rem', color: '#6b7280'}}>My Account</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{position: 'relative', zIndex: 10, flex: 1, overflow: 'auto'}}>
        {children}
      </main>

    </div>
  );
};

export default Layout;