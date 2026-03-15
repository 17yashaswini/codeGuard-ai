import { useState } from 'react';
import { useAuth } from '@clerk/react';
import { useUserContext } from '../context/UserContext';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';
import { Code2, Shield, AlertTriangle, CheckCircle, Zap, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const LANGUAGES = ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'TypeScript'];

const severityConfig = {
  critical: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', color: '#f87171', icon: AlertTriangle, label: 'Critical Risk' },
  high: { bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)', color: '#fb923c', icon: AlertTriangle, label: 'High Risk' },
  medium: { bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.25)', color: '#facc15', icon: AlertTriangle, label: 'Medium Risk' },
  low: { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)', color: '#4ade80', icon: CheckCircle, label: 'Low Risk' },
};

const Analyze = () => {
  const { getToken } = useAuth();
  const { credits, refreshCredits } = useUserContext();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [result, setResult] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return toast.error('Please paste some code first!');
    if (credits <= 0) return toast.error('No credits remaining!');
    setLoading(true);
    setResult(null);
    try {
      const token = await getToken();
      const res = await axiosInstance.post('/api/ai/analyze', { code, language }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data.result);
      setSeverity(res.data.severity);
      await refreshCredits();
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const config = severity ? severityConfig[severity] : null;

  return (
    <div style={{padding: '3rem 4rem', maxWidth: '1200px'}}>

      {/* Header */}
      <div style={{marginBottom: '2.5rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.75rem'}}>
          <Code2 size={28} style={{color: '#60a5fa'}} />
          <h1 style={{fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em'}}>Analyze Code</h1>
        </div>
        <p style={{color: '#6b7280', fontSize: '1rem'}}>Paste your code and get instant AI security analysis</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>

        {/* Input */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>

          {/* Language + Credits row */}
          <div style={{display: 'flex', gap: '0.875rem', alignItems: 'center'}}>
            <div style={{position: 'relative', flex: 1}}>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '0.875rem 1rem', color: 'white', fontSize: '0.875rem', appearance: 'none', cursor: 'pointer', outline: 'none'}}
              >
                {LANGUAGES.map(lang => <option key={lang} value={lang} style={{background: '#0a0d1a'}}>{lang}</option>)}
              </select>
              <ChevronDown size={15} style={{position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none'}} />
            </div>
            <div style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap'}}>
              <Zap size={13} style={{color: '#60a5fa'}} />
              <span style={{color: '#60a5fa', fontWeight: 700, fontSize: '0.875rem'}}>{credits}</span>
              <span style={{color: '#6b7280', fontSize: '0.875rem'}}>credits</span>
            </div>
          </div>

          {/* Code editor */}
          <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: '2.5rem', display: 'flex', alignItems: 'center', padding: '0 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', borderRadius: '0.875rem 0.875rem 0 0', zIndex: 1}}>
              <div style={{display: 'flex', gap: '0.375rem'}}>
                <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(239,68,68,0.5)'}} />
                <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(234,179,8,0.5)'}} />
                <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(34,197,94,0.5)'}} />
              </div>
              <span style={{color: '#4b5563', fontSize: '0.75rem', marginLeft: '0.75rem', fontFamily: 'JetBrains Mono, monospace'}}>{language.toLowerCase()}_snippet</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`// Paste your ${language} code here...`}
              style={{width: '100%', height: '360px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.875rem', paddingTop: '3rem', padding: '3rem 1.25rem 1.25rem', color: '#d1d5db', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', lineHeight: 1.7, resize: 'none', outline: 'none', boxSizing: 'border-box'}}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || credits <= 0}
            style={{
              width: '100%', padding: '1rem', borderRadius: '0.875rem',
              background: loading || credits <= 0 ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #2563eb, #0891b2)',
              color: loading || credits <= 0 ? '#4b5563' : 'white',
              fontWeight: 600, fontSize: '0.9rem', border: 'none', cursor: loading || credits <= 0 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? (
              <>
                <div style={{width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.2)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}} />
                Analyzing with Gemini AI...
              </>
            ) : (
              <>
                <Shield size={17} />
                Analyze Code
                <span style={{opacity: 0.6, fontSize: '0.75rem'}}>(1 credit)</span>
              </>
            )}
          </button>
        </div>

        {/* Result */}
        <div>
          {result ? (
            <div style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.875rem', overflow: 'hidden', height: '100%'}}>
              <div style={{padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <h2 style={{fontWeight: 700, fontSize: '0.875rem'}}>Analysis Result</h2>
                {config && (
                  <span style={{display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.875rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, background: config.bg, color: config.color, border: `1px solid ${config.border}`}}>
                    <config.icon size={12} />
                    {config.label}
                  </span>
                )}
              </div>
              <div style={{padding: '1.5rem', overflowY: 'auto', maxHeight: '460px'}}>
  <ReactMarkdown
    components={{
      h1: ({children}) => <h1 style={{fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem', marginTop: '1rem', fontFamily: 'Syne, sans-serif', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem'}}>{children}</h1>,
      h2: ({children}) => <h2 style={{fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.75rem', marginTop: '1.25rem', fontFamily: 'Syne, sans-serif'}}>{children}</h2>,
      h3: ({children}) => <h3 style={{fontSize: '0.9rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem', marginTop: '1rem', fontFamily: 'Syne, sans-serif'}}>{children}</h3>,
      h4: ({children}) => <h4 style={{fontSize: '0.875rem', fontWeight: 700, color: '#60a5fa', marginBottom: '0.5rem', marginTop: '1rem'}}>{children}</h4>,
      p: ({children}) => <p style={{color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.8, marginBottom: '0.75rem'}}>{children}</p>,
      strong: ({children}) => <strong style={{color: '#f1f5f9', fontWeight: 700}}>{children}</strong>,
      ul: ({children}) => <ul style={{paddingLeft: '1.25rem', marginBottom: '0.75rem'}}>{children}</ul>,
      ol: ({children}) => <ol style={{paddingLeft: '1.25rem', marginBottom: '0.75rem'}}>{children}</ol>,
      li: ({children}) => <li style={{color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.8, marginBottom: '0.375rem'}}>{children}</li>,
      code: ({inline, children}) => inline
        ? <code style={{background: 'rgba(59,130,246,0.15)', color: '#93c5fd', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace'}}>{children}</code>
        : <code style={{display: 'block', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.5rem', padding: '1rem', color: '#93c5fd', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.7, overflowX: 'auto', marginBottom: '0.75rem'}}>{children}</code>,
      blockquote: ({children}) => <blockquote style={{borderLeft: '3px solid #3b82f6', paddingLeft: '1rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '0.75rem'}}>{children}</blockquote>,
    }}
  >
    {result}
  </ReactMarkdown>
</div>
            </div>
          ) : (
            <div style={{background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: '0.875rem', minHeight: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '3rem'}}>
              {loading ? (
                <>
                  <div style={{width: '48px', height: '48px', border: '2px solid rgba(59,130,246,0.2)', borderTop: '2px solid #3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '1.25rem'}} />
                  <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Analyzing your code...</p>
                  <p style={{color: '#4b5563', fontSize: '0.75rem', marginTop: '0.5rem'}}>This may take a few seconds</p>
                </>
              ) : (
                <>
                  <div style={{width: '56px', height: '56px', borderRadius: '1rem', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem'}}>
                    <Shield size={24} style={{color: 'rgba(59,130,246,0.3)'}} />
                  </div>
                  <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Results appear here</p>
                  <p style={{color: '#4b5563', fontSize: '0.75rem', marginTop: '0.5rem'}}>Paste code and click Analyze</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyze;