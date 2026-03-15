import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axiosInstance from '../lib/axios';
import { History as HistoryIcon, Code2, Clock, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react';

const severityConfig = {
  critical: { color: '#f87171', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', icon: AlertTriangle },
  high: { color: '#fb923c', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)', icon: AlertTriangle },
  medium: { color: '#facc15', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.2)', icon: AlertTriangle },
  low: { color: '#4ade80', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', icon: CheckCircle },
};

const History = () => {
  const { getToken } = useAuth();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const token = await getToken();
      const res = await axiosInstance.get('/api/ai/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalyses(res.data.analyses);
      if (res.data.analyses.length > 0) setSelected(res.data.analyses[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  if (loading) return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
      <div style={{width: '40px', height: '40px', border: '2px solid rgba(59,130,246,0.2)', borderTop: '2px solid #3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}} />
    </div>
  );

  return (
    <div style={{padding: '3rem 4rem'}}>

      {/* Header */}
      <div style={{marginBottom: '2.5rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.75rem'}}>
          <HistoryIcon size={28} style={{color: '#60a5fa'}} />
          <h1 style={{fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em'}}>History</h1>
        </div>
        <p style={{color: '#6b7280', fontSize: '1rem'}}>{analyses.length} analyses found</p>
      </div>

      {analyses.length === 0 ? (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 0', textAlign: 'center'}}>
          <div style={{width: '64px', height: '64px', borderRadius: '1rem', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'}}>
            <Code2 size={28} style={{color: 'rgba(59,130,246,0.3)'}} />
          </div>
          <p style={{color: '#6b7280'}}>No analyses yet</p>
          <p style={{color: '#4b5563', fontSize: '0.875rem', marginTop: '0.5rem'}}>Go to Analyze Code to get started!</p>
        </div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '1.5rem'}}>

          {/* List */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', maxHeight: 'calc(100vh - 200px)'}}>
            {analyses.map((item) => {
              const config = severityConfig[item.severity];
              const Icon = config.icon;
              const isSelected = selected?._id === item._id;
              return (
                <div
                  key={item._id}
                  onClick={() => setSelected(item)}
                  style={{
                    background: isSelected ? 'rgba(59,130,246,0.05)' : 'rgba(255,255,255,0.02)',
                    border: isSelected ? '1px solid rgba(59,130,246,0.35)' : '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '0.875rem', padding: '1.25rem', cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem'}}>
                    <span style={{fontSize: '0.75rem', fontWeight: 600, color: '#60a5fa', fontFamily: 'JetBrains Mono, monospace'}}>{item.language}</span>
                    <span style={{display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', padding: '0.25rem 0.625rem', borderRadius: '999px', background: config.bg, color: config.color, border: `1px solid ${config.border}`}}>
                      <Icon size={10} />
                      {item.severity}
                    </span>
                  </div>
                  <p style={{color: '#6b7280', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0.625rem'}}>{item.code.substring(0, 60)}...</p>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.375rem'}}>
                      <Clock size={11} style={{color: '#4b5563'}} />
                      <span style={{color: '#4b5563', fontSize: '0.7rem'}}>{formatDate(item.createdAt)}</span>
                    </div>
                    <ChevronRight size={13} style={{color: isSelected ? '#60a5fa' : '#374151'}} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail */}
          <div>
            {selected && (() => {
              const config = severityConfig[selected.severity];
              const Icon = config.icon;
              return (
                <div style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.875rem', overflow: 'hidden', position: 'sticky', top: '2rem'}}>
                  <div style={{padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.625rem'}}>
                      <span style={{fontSize: '0.875rem', fontWeight: 700, color: '#60a5fa', fontFamily: 'JetBrains Mono, monospace'}}>{selected.language}</span>
                      <span style={{color: '#4b5563', fontSize: '0.75rem'}}>Analysis</span>
                    </div>
                    <span style={{display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', padding: '0.375rem 0.875rem', borderRadius: '999px', background: config.bg, color: config.color, border: `1px solid ${config.border}`}}>
                      <Icon size={11} />
                      {selected.severity} risk
                    </span>
                  </div>
                  <div style={{padding: '1.5rem', color: '#d1d5db', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.8, whiteSpace: 'pre-wrap', overflowY: 'auto', maxHeight: '600px'}}>
                    {selected.result}
                  </div>
                </div>
              );
            })()}
          </div>

        </div>
      )}
    </div>
  );
};

export default History;