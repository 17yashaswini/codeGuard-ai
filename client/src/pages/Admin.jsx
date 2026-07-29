import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/react';
import axiosInstance from '../lib/axios';
import { Users, Code2, Shield, AlertTriangle, CheckCircle, Clock, BarChart3 } from 'lucide-react';

const ADMIN_USER_ID = 'user_3AwRywHlRyIuEMqgv0P5p1NiUCw';

const severityColors = {
  critical: { color: '#f87171', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' },
  high: { color: '#fb923c', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.2)' },
  medium: { color: '#facc15', bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.2)' },
  low: { color: '#4ade80', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)' },
};

const Admin = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      const token = await getToken();
      const res = await axiosInstance.get('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data.stats);
    } catch (error) {
      console.error('Admin error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  if (user?.id !== ADMIN_USER_ID) {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: '1rem'}}>
        <Shield size={48} style={{color: '#ef4444'}} />
        <h1 style={{fontSize: '1.5rem', fontWeight: 700, color: '#f87171'}}>Access Denied</h1>
        <p style={{color: '#6b7280'}}>You don't have permission to view this page</p>
      </div>
    );
  }

  if (loading) return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
      <div style={{width: '40px', height: '40px', border: '2px solid rgba(59,130,246,0.2)', borderTop: '2px solid #3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}} />
    </div>
  );

  return (
    <div style={{padding: '3rem 4rem', maxWidth: '1200px'}}>

      {/* Header */}
      <div style={{marginBottom: '3rem'}}>
        <p style={{color: '#f87171', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem'}}>Admin Only 🔐</p>
        <h1 style={{fontSize: '3rem', fontWeight: 900, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em', marginBottom: '0.5rem'}}>Admin Dashboard</h1>
        <p style={{color: '#6b7280'}}>Overview of all users and analyses</p>
      </div>

      {/* Stats Cards */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem'}}>
        {[
          { icon: Users, label: 'Total Users', value: stats?.totalUsers || 0, color: '#60a5fa', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
          { icon: Code2, label: 'Total Analyses', value: stats?.totalAnalyses || 0, color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)' },
          { icon: BarChart3, label: 'Credits Used', value: stats?.totalCreditsUsed || 0, color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)' },
        ].map(({ icon: Icon, label, value, color, bg, border }) => (
          <div key={label} style={{background: 'rgba(255,255,255,0.02)', border: `1px solid ${border}`, borderRadius: '1rem', padding: '2rem'}}>
            <div style={{width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'}}>
              <Icon size={18} style={{color}} />
            </div>
            <div style={{fontSize: '2.5rem', fontWeight: 900, color, marginBottom: '0.5rem', fontFamily: 'Syne, sans-serif'}}>{value}</div>
            <div style={{fontSize: '0.875rem', color: '#9ca3af'}}>{label}</div>
          </div>
        ))}
      </div>

      {/* Severity Breakdown */}
      <div style={{marginBottom: '3rem'}}>
        <h2 style={{fontSize: '1rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem'}}>Severity Breakdown</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem'}}>
          {['critical', 'high', 'medium', 'low'].map(sev => {
            const count = stats?.severityCounts?.find(s => s._id === sev)?.count || 0;
            const config = severityColors[sev];
            return (
              <div key={sev} style={{background: config.bg, border: `1px solid ${config.border}`, borderRadius: '0.875rem', padding: '1.5rem', textAlign: 'center'}}>
                <div style={{fontSize: '2rem', fontWeight: 900, color: config.color, fontFamily: 'Syne, sans-serif'}}>{count}</div>
                <div style={{fontSize: '0.8rem', color: config.color, textTransform: 'capitalize', marginTop: '0.25rem'}}>{sev}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Users */}
      <div style={{marginBottom: '3rem'}}>
        <h2 style={{fontSize: '1rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem'}}>Recent Users</h2>
        <div style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', overflow: 'hidden'}}>
          {stats?.recentUsers?.map((u, i) => (
            <div key={u._id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: i < stats.recentUsers.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'}}>
              <div>
                <p style={{fontWeight: 600, fontSize: '0.875rem'}}>{u.name || 'Unknown'}</p>
                <p style={{color: '#6b7280', fontSize: '0.75rem'}}>{u.email}</p>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
                <div style={{textAlign: 'right'}}>
                  <p style={{fontSize: '0.75rem', color: '#6b7280'}}>Credits</p>
                  <p style={{color: '#60a5fa', fontWeight: 700}}>{u.credits}</p>
                </div>
                <div style={{textAlign: 'right'}}>
                  <p style={{fontSize: '0.75rem', color: '#6b7280'}}>Joined</p>
                  <p style={{fontSize: '0.75rem', color: '#9ca3af'}}>{formatDate(u.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Analyses */}
      <div>
        <h2 style={{fontSize: '1rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem'}}>Recent Analyses</h2>
        <div style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', overflow: 'hidden'}}>
          {stats?.recentAnalyses?.map((a, i) => {
            const config = severityColors[a.severity];
            return (
              <div key={a._id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: i < stats.recentAnalyses.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'}}>
                <div style={{flex: 1, marginRight: '1rem'}}>
                  <p style={{fontSize: '0.75rem', color: '#60a5fa', fontFamily: 'JetBrains Mono, monospace', marginBottom: '0.25rem'}}>{a.language}</p>
                  <p style={{color: '#6b7280', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '400px'}}>{a.code.substring(0, 60)}...</p>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                  <span style={{fontSize: '0.7rem', padding: '0.25rem 0.75rem', borderRadius: '999px', background: config.bg, color: config.color, border: `1px solid ${config.border}`}}>{a.severity}</span>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.375rem'}}>
                    <Clock size={11} style={{color: '#4b5563'}} />
                    <span style={{color: '#4b5563', fontSize: '0.7rem'}}>{formatDate(a.createdAt)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Admin;