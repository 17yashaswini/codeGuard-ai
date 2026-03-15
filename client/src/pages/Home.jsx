import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Shield, Code2, Zap, ChevronRight, Cpu, GitBranch } from 'lucide-react';

const Home = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-[#050810] text-white overflow-x-hidden">

      {/* Background Effects */}
      <div className="fixed inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="orb w-96 h-96 bg-blue-600/20 top-0 left-1/4 animate-float" />
      <div className="orb w-80 h-80 bg-cyan-600/15 bottom-1/4 right-1/4" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-12 py-6 border-b border-white/5">
        <div className="flex items-center gap-2 animate-fade-in">
          <div className="relative">
            <Shield className="text-blue-400" size={22} />
            <div className="absolute inset-0 animate-ping opacity-20">
              <Shield className="text-blue-400" size={22} />
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight" style={{fontFamily:'Syne,sans-serif'}}>
            Code<span className="text-blue-400">Guard</span> AI
          </span>
        </div>
        <Link
          to={isSignedIn ? '/dashboard' : '/sign-in'}
          className="btn-primary text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
        >
          {isSignedIn ? 'Dashboard' : 'Get Started'}
          <ChevronRight size={16} />
        </Link>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-12 pt-28 pb-24 w-full">
        <div className="opacity-0 animate-fade-in-up" style={{animationDelay:'0.1s', animationFillMode:'forwards'}}>
          <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-full text-sm font-medium mb-10">
            <Cpu size={14} />
            Powered by Google Gemini AI
          </span>
        </div>

        <h1 className="opacity-0 animate-fade-in-up text-6xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight max-w-4xl" style={{animationDelay:'0.2s', animationFillMode:'forwards', fontFamily:'Syne,sans-serif'}}>
          Detect Security
          <br />
          <span className="gradient-text">Vulnerabilities</span>
          <br />
          Instantly
        </h1>

        <p className="opacity-0 animate-fade-in-up text-gray-400 text-xl max-w-xl mb-12 leading-relaxed" style={{animationDelay:'0.3s', animationFillMode:'forwards'}}>
          Paste your code and get a detailed AI-powered security analysis in seconds.
          Find SQL injection, XSS, bugs and more before hackers do.
        </p>

        <div className="opacity-0 animate-fade-in-up flex flex-col sm:flex-row gap-4 items-center mb-20" style={{animationDelay:'0.4s', animationFillMode:'forwards'}}>
          <Link
            to={isSignedIn ? '/analyze' : '/sign-up'}
            className="btn-primary text-white px-10 py-4 rounded-xl text-base font-semibold flex items-center gap-2"
          >
            <Shield size={18} />
            Analyze Your Code Free
            <ChevronRight size={16} />
          </Link>
          <span className="text-gray-500 text-sm">5 free analyses • No credit card</span>
        </div>

        {/* Code Preview */}
        <div className="opacity-0 animate-fade-in-up w-full max-w-2xl mx-auto" style={{animationDelay:'0.5s', animationFillMode:'forwards'}}>
          <div className="glass rounded-2xl overflow-hidden border border-white/10 animate-glow">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="text-gray-500 text-xs ml-2 mono">vulnerability_scan.js</span>
            </div>
            <div className="p-6 text-left mono text-sm leading-loose">
              <div className="text-gray-500">// ⚠️ SQL Injection Detected — Line 3</div>
              <div className="text-red-400/80 mt-2">const query = <span className="text-yellow-400/80">`SELECT * FROM users WHERE id = <span className="text-red-400">${'${userId}'}</span>`</span>;</div>
              <div className="mt-4 text-green-400/80">// ✅ AI Suggestion: Use parameterized queries</div>
              <div className="text-blue-400/80 mt-1">const query = <span className="text-yellow-400/80">'SELECT * FROM users WHERE id = ?'</span>;</div>
              <div className="text-blue-400/80">db.execute(query, <span className="text-cyan-400/80">[userId]</span>);</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 w-full flex justify-center px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            { icon: Shield, title: 'Security Analysis', desc: 'Detects SQL injection, XSS, CSRF, insecure APIs and 50+ vulnerability types', color: 'blue', delay: '0.1s' },
            { icon: GitBranch, title: 'Bug Detection', desc: 'Finds logical errors, memory leaks and performance bottlenecks in your code', color: 'cyan', delay: '0.2s' },
            { icon: Zap, title: 'Instant Results', desc: 'Get structured analysis with severity levels and fix suggestions in seconds', color: 'purple', delay: '0.3s' },
          ].map(({ icon: Icon, title, desc, color, delay }) => (
            <div
              key={title}
              className="opacity-0 animate-fade-in-up glass glass-hover rounded-2xl p-8"
              style={{animationDelay: delay, animationFillMode: 'forwards'}}
            >
              <div className={`w-12 h-12 rounded-xl bg-${color}-500/10 flex items-center justify-center mb-5 border border-${color}-500/20`}>
                <Icon className={`text-${color}-400`} size={22} />
              </div>
              <h3 className="font-bold text-lg mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;