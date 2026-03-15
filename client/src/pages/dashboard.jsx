import { useUser } from '@clerk/react';
import { useUserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { Code2, History, Shield, Zap, ArrowRight, Lock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();
  const { credits } = useUserContext();

  return (
    <div style={{padding: '3rem', maxWidth: '900px'}}>

      {/* Header */}
      <div style={{marginBottom: '3.5rem'}} className="opacity-0 animate-fade-in-up" style2={{animationFillMode:'forwards'}}>
        <p style={{color: '#60a5fa', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem'}}>Welcome back 👋</p>
        <h1 style={{fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1rem', fontFamily: 'Syne, sans-serif'}}>
          {user?.firstName || 'Developer'}
        </h1>
        <p style={{color: '#6b7280', fontSize: '1.125rem'}}>Ready to write more secure code today?</p>
      </div>

      {/* Stats */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3.5rem'}}>
        {[
          { icon: Zap, label: 'Credits Left', value: credits, sub: 'of 5 free', color: '#60a5fa', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
          { icon: Shield, label: 'Plan', value: 'Free', sub: '5 analyses included', color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)' },
          { icon: Code2, label: 'Languages', value: '10+', sub: 'supported', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)' },
        ].map(({ icon: Icon, label, value, sub, color, bg, border }) => (
          <div key={label} style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '2rem'}}>
            <div style={{width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'}}>
              <Icon size={18} style={{color}} />
            </div>
            <div style={{fontSize: '2.5rem', fontWeight: 900, color, marginBottom: '0.5rem', fontFamily: 'Syne, sans-serif'}}>{value}</div>
            <div style={{fontSize: '0.875rem', color: '#9ca3af'}}>{label}</div>
            <div style={{fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem'}}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{marginBottom: '3.5rem'}}>
        <p style={{fontSize: '0.7rem', fontWeight: 600, color: '#6b7280', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem'}}>Quick Actions</p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem'}}>
          {[
            { icon: Code2, title: 'Analyze Code', desc: 'Paste code and get instant AI security report', link: '/analyze', gradient: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(8,145,178,0.08))', border: 'rgba(59,130,246,0.2)', iconColor: '#60a5fa', iconBg: 'rgba(59,130,246,0.1)' },
            { icon: History, title: 'View History', desc: 'Browse all your past code analyses', link: '/history', gradient: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(219,39,119,0.08))', border: 'rgba(167,139,250,0.2)', iconColor: '#a78bfa', iconBg: 'rgba(167,139,250,0.1)' },
          ].map(({ icon: Icon, title, desc, link, gradient, border, iconColor, iconBg }) => (
            <Link key={title} to={link} style={{background: gradient, border: `1px solid ${border}`, borderRadius: '1rem', padding: '2rem', display: 'block', textDecoration: 'none', position: 'relative', transition: 'all 0.2s ease'}}>
              <div style={{width: '3rem', height: '3rem', borderRadius: '0.75rem', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'}}>
                <Icon size={22} style={{color: iconColor}} />
              </div>
              <h3 style={{fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem'}}>{title}</h3>
              <p style={{color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.6}}>{desc}</p>
              <ArrowRight size={16} style={{position: 'absolute', bottom: '2rem', right: '2rem', color: '#4b5563'}} />
            </Link>
          ))}
        </div>
      </div>

      {/* Security Tip */}
      <div style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(234,179,8,0.15)', borderRadius: '1rem', padding: '1.75rem', display: 'flex', alignItems: 'flex-start', gap: '1.25rem'}}>
        <div style={{width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
          <Lock size={16} style={{color: '#facc15'}} />
        </div>
        <div>
          <p style={{fontSize: '0.875rem', fontWeight: 600, color: '#facc15', marginBottom: '0.5rem'}}>Security Tip of the Day</p>
          <p style={{fontSize: '0.875rem', color: '#9ca3af', lineHeight: 1.7}}>Always use parameterized queries instead of string concatenation to prevent SQL injection attacks. Never trust user input directly in database queries.</p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;