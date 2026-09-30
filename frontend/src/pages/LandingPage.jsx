import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ChevronDown, Sparkles, Star, ArrowRight, X, Wand2, Shield, Eye } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedPrompt, setSelectedPrompt] = useState(
    'Ethereal cosmic synthesis of human consciousness and neural light, violet aurora stardust, photorealistic 8k'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewResult, setPreviewResult] = useState(null);

  const samplePrompts = [
    {
      title: 'Cosmic Genesis',
      prompt: 'Two ethereal hands reaching across nebula stardust, luminous violet lightning, cinematic Renaissance lighting',
      image: '/hero-art.jpg',
      tag: 'Neural Synthesis'
    },
    {
      title: 'Athena AI Twin',
      prompt: 'Photorealistic cyberpunk digital twin, ultra-detailed violet iris, ambient holographic reflections, soft rim light',
      image: '/hero-art.jpg',
      tag: 'Digital Avatar'
    },
    {
      title: 'Bioluminescent Dream',
      prompt: 'Ancient marble sculpture dissolving into glowing purple flora and stardust particles in deep void',
      image: '/hero-art.jpg',
      tag: 'Generative Art'
    }
  ];

  const handleSimulateGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setPreviewResult('/hero-art.jpg');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#06040a] text-neutral-100 font-sans relative overflow-x-hidden selection:bg-purple-600/30 selection:text-purple-200">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top-center soft violet nebula glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-purple-900/20 via-violet-950/15 to-transparent blur-[140px] rounded-full" />
        {/* Deep ambient dark backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(91,33,182,0.12)_0%,rgba(6,4,10,0.95)_75%,#040307_100%)]" />
        {/* Subtle celestial dust overlay */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 40px 70px, rgba(216,180,254,0.8), rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 90px 40px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 160px 120px, rgba(192,132,252,0.7), rgba(0,0,0,0))`,
            backgroundSize: '220px 220px'
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* ============================================================ */}
        {/* NAVIGATION BAR                                               */}
        {/* ============================================================ */}
        <header className="w-full flex items-center justify-between py-2">
          {/* Brand Name: ATHENA (Editorial wide-spaced) */}
          <Link
            to="/"
            className="text-white text-base sm:text-lg font-medium tracking-[0.28em] hover:text-purple-200 transition-colors uppercase select-none"
          >
            ATHENA
          </Link>

          {/* Centered Floating Pill Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#13101c]/80 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] text-[13px] text-neutral-300">
            {['Home', 'How It Works', 'Philosophy', 'Use Cases'].map((tab, idx, arr) => (
              <div key={tab} className="flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                    if (tab === 'How It Works') setShowPromptModal(true);
                  }}
                  className={`px-3 py-1 rounded-full transition-all duration-200 ${
                    activeTab === tab
                      ? 'text-white font-medium bg-white/[0.08]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
                {idx < arr.length - 1 && (
                  <span className="mx-1.5 text-neutral-600 text-[10px] select-none">•</span>
                )}
              </div>
            ))}
          </nav>

          {/* Right Navigation Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-1 text-xs text-neutral-300 cursor-pointer hover:text-white transition-colors">
              <span className="font-medium tracking-wider">EN</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </div>

            {/* Search Icon */}
            <button
              type="button"
              onClick={() => setShowPromptModal(true)}
              aria-label="Search or explore prompts"
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Direct App Launch Button */}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-neutral-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3 h-3 text-neutral-400" />
            </button>
          </div>
        </header>

        {/* ============================================================ */}
        {/* HERO SECTION CONTENT                                         */}
        {/* ============================================================ */}
        <main className="flex-1 flex flex-col items-center justify-center text-center mt-8 sm:mt-12 lg:mt-16 max-w-5xl mx-auto px-2">
          {/* Availability-Style Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#181228]/85 border border-purple-500/30 text-purple-200 text-[11px] font-medium tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)] mb-6 sm:mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400 shadow-[0_0_8px_#a855f7]" />
            </span>
            <span>AI IMAGE GENERATOR</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[72px] text-neutral-100 font-normal tracking-[-0.015em] leading-[1.14] max-w-4xl mx-auto">
            A New Kind of Intelligence
            <br />
            <span className="italic font-light text-neutral-200">– Human at Heart</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 sm:mt-7 max-w-2xl mx-auto text-neutral-400 text-sm sm:text-base md:text-[17px] font-light leading-relaxed tracking-wide">
            Athena is a collaborative AI designed to elevate thought, co-create ideas, and synthesize hyper-realistic imagination. It's in sync with how you think, dream, and feel.
          </p>

          {/* Call to Action Button */}
          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPromptModal(true)}
              className="group relative inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-neutral-950 font-medium text-sm sm:text-[15px] tracking-tight transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_35px_rgba(255,255,255,0.22)] hover:shadow-[0_0_45px_rgba(255,255,255,0.38)] cursor-pointer"
            >
              <span>See How It Works</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="sm:hidden text-xs text-neutral-400 hover:text-white underline underline-offset-4 py-1"
            >
              Go to Dashboard
            </button>
          </div>

          {/* ============================================================ */}
          {/* CENTERPIECE ARTWORK: RE-CREATION OF TWO HANDS IN COSMOS      */}
          {/* ============================================================ */}
          <div className="w-full mt-6 sm:mt-10 md:mt-12 relative flex items-center justify-center">
            {/* Visual Container with Vignette and Purple Aura */}
            <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden group">
              {/* Violet back-light bloom */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/25 via-transparent to-transparent pointer-events-none z-10" />

              {/* Edge vignette masks for seamless blend into dark background */}
              <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_80px_35px_#06040a]" />

              {/* Master Artwork */}
              <img
                src="/hero-art.jpg"
                alt="Athena AI Creative Synthesis — Ethereal hands reaching in deep space with purple and violet stardust"
                className="w-full h-auto max-h-[460px] md:max-h-[520px] object-cover object-center filter brightness-[0.98] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                loading="eager"
              />

              {/* Interactive prompt trigger badge floating over art */}
              <button
                type="button"
                onClick={() => setShowPromptModal(true)}
                className="absolute bottom-6 right-6 z-20 hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-neutral-200 hover:text-white hover:bg-black/80 hover:border-purple-500/50 transition-all duration-200 shadow-xl"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" />
                <span>Explore Creative Models</span>
              </button>
            </div>
          </div>
        </main>

        {/* ============================================================ */}
        {/* FOOTER / SOCIAL PROOF BAR                                    */}
        {/* ============================================================ */}
        <footer className="w-full pt-8 sm:pt-12 pb-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs sm:text-[13px] text-neutral-400">
          <span className="font-light tracking-wide">Reviews 1,042</span>

          {/* 5 Amber Star Rating Badges */}
          <div className="flex items-center gap-1.5" aria-label="Rated 5 out of 5 stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className="w-5 h-5 rounded-[4px] bg-[#ea580c] flex items-center justify-center shadow-sm"
              >
                <Star className="w-3 h-3 text-white fill-white" />
              </div>
            ))}
          </div>

          <span className="font-light tracking-wide text-neutral-300">Excellent Score</span>
        </footer>
      </div>

      {/* ============================================================ */}
      {/* INTERACTIVE "SEE HOW IT WORKS" MODAL                         */}
      {/* ============================================================ */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#0f0c18] border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-left">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowPromptModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Athena AI Visual Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white font-normal">
              Experience Visual Co-Creation
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1 mb-6">
              Prompt Athena's generative intelligence or test curated twin aesthetic presets.
            </p>

            {/* Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
              {samplePrompts.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setSelectedPrompt(item.prompt)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPrompt === item.prompt
                      ? 'bg-purple-950/40 border-purple-500 text-white'
                      : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-purple-500/30'
                  }`}
                >
                  <span className="inline-block text-[10px] text-purple-300 uppercase tracking-widest font-mono mb-1">
                    {item.tag}
                  </span>
                  <div className="text-xs font-medium text-white">{item.title}</div>
                </button>
              ))}
            </div>

            {/* Prompt Input Box */}
            <div className="relative mb-5">
              <textarea
                value={selectedPrompt}
                onChange={(e) => setSelectedPrompt(e.target.value)}
                rows={3}
                placeholder="Describe your vision..."
                className="w-full bg-[#171324] border border-white/15 rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Powered by Athena Multi-Agent Orchestrator</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSimulateGenerate}
                  disabled={isGenerating}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-colors disabled:opacity-50"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>{isGenerating ? 'Synthesizing...' : 'Synthesize Image'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPromptModal(false);
                    navigate('/login');
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors"
                >
                  <span>Launch Twin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Preview image if synthesized */}
            {previewResult && (
              <div className="mt-5 p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center gap-4">
                <img
                  src={previewResult}
                  alt="Generated Preview"
                  className="w-16 h-16 rounded-lg object-cover border border-purple-500/30"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-purple-200 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    Synthesis Rendered in 8K Neural Resolution
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                    {selectedPrompt}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
