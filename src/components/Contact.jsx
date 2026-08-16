import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, Sparkles, Github, Linkedin, Award, MessageSquare, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalDetails } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalDetails.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setErrorMsg('');

    try {
      // Send form data directly to Formspree endpoint
      const response = await fetch('https://formspree.io/f/mgawydel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message
        })
      });

      if (response.ok) {
        // Trigger celebration confetti
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff6b00', '#ff8800', '#ffa033', '#ffffff']
          });
        } catch (err) {
          // ignore canvas error
        }

        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        if (data && data.errors) {
          setErrorMsg(data.errors.map(err => err.message).join(', '));
        } else {
          setErrorMsg('Failed to send message. Falling back to email client...');
          window.location.href = `mailto:${personalDetails.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(formData.message)}`;
        }
      }
    } catch (err) {
      setErrorMsg('Network error. Launching email app fallback...');
      window.location.href = `mailto:${personalDetails.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(formData.message)}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b001a] border border-[#ff6b0033] text-xs font-semibold text-[#ff8800] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Let's Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Get In <span className="orange-gradient-text">Touch</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Whether you have a software engineering opportunity, internship query, or algorithm collaboration, I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Email Copy */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Copy Email Box */}
            <div className="glass-panel-orange p-6 rounded-3xl space-y-4 relative overflow-hidden orange-border-glow">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#ff6b0025] text-[#ff8800] border border-[#ff6b0044]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Direct Email</h3>
                  <p className="text-xs text-slate-400">Click below to copy my address</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#07080e] border border-[#ff6b0044]">
                <span className="font-mono text-sm text-[#ff8800] font-semibold truncate pr-2">
                  {personalDetails.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl bg-[#ff6b00] text-white text-xs font-bold hover:bg-[#ff8800] transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Details Cards */}
            <div className="space-y-3">
              <div className="glass-panel p-4 rounded-2xl border border-[#1f2438] flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#07080e] text-[#ff8800] border border-[#1f2438]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">PHONE</div>
                  <div className="text-sm font-semibold text-white">{personalDetails.phone}</div>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-[#1f2438] flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#07080e] text-[#ff8800] border border-[#1f2438]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">LOCATION</div>
                  <div className="text-sm font-semibold text-white">{personalDetails.location}</div>
                </div>
              </div>
            </div>

            {/* Social Links Matrix */}
            <div className="glass-panel p-6 rounded-2xl border border-[#1f2438] space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Coding Profiles & Networks
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={personalDetails.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#07080e] border border-[#1f2438] hover:border-[#ff6b0044] text-xs font-semibold text-slate-200 hover:text-[#ff8800] transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4 text-[#ff8800]" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalDetails.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#07080e] border border-[#1f2438] hover:border-[#ff6b0044] text-xs font-semibold text-slate-200 hover:text-[#ff8800] transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4 text-[#ff8800]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalDetails.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#07080e] border border-[#1f2438] hover:border-[#ff6b0044] text-xs font-semibold text-slate-200 hover:text-[#ff8800] transition-colors flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-[#ff8800]" />
                  <span>LeetCode</span>
                </a>
                <a
                  href={personalDetails.socials.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#07080e] border border-[#1f2438] hover:border-[#ff6b0044] text-xs font-semibold text-slate-200 hover:text-[#ff8800] transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#ff8800]" />
                  <span>Codeforces</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-[#1f2438] space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-[#1f2438]">
              <MessageSquare className="w-6 h-6 text-[#ff8800]" />
              <h3 className="text-xl font-bold text-white">Send a Message</h3>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-[#ff6b001a] border border-[#ff6b0044] rounded-2xl animate-in zoom-in-95">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#ff8800] text-white flex items-center justify-center shadow-lg shadow-[#ff6b0055]">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Delivered to Inbox!</h4>
                <p className="text-xs text-slate-300">
                  Thank you for reaching out. Your message has been sent directly to <strong className="text-[#ff8800]">itzgaurav003@gmail.com</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#07080e] border border-[#1f2438] text-xs font-semibold text-slate-300 hover:text-white hover:border-[#ff6b00]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#07080e] border border-[#1f2438] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6b00]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#07080e] border border-[#1f2438] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6b00]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Internship Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#07080e] border border-[#1f2438] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6b00]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hi Gaurav, I'd like to discuss an opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#07080e] border border-[#1f2438] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6b00]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-base font-bold rounded-xl text-white bg-gradient-to-r from-[#ff6b00] to-[#ff8800] hover:from-[#ff8800] hover:to-[#ff4500] shadow-lg shadow-[#ff6b0040] hover:shadow-xl hover:shadow-[#ff6b0060] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
