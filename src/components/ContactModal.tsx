import React, { useState, useEffect } from 'react';
import { X, Mail, Check, Copy, Send, Sparkles, MapPin, Phone, Github,  Linkedin,  ExternalLink } from 'lucide-react';

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Software Engineer',
    customService:'',
    company: '',
    message: '',
  });

  const emailAddress = 'josephrthayil93@gmail.com';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // setSubmitted(false);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const selectedService =
          formData.service === 'Other'
            ? formData.customService
            : formData.service;

        const subject = `Portfolio Inquiry - ${selectedService}`;

        const body = `
      Name: ${formData.name}
      Email: ${formData.email}
      Company: ${formData.company || 'Not provided'}
      Opportunity: ${selectedService}

      Message:
      ${formData.message}
      `;

        const mailtoLink =
          `mailto:joseph.thayil2001@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-8 text-[#D7E2EA] shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#D7E2EA] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
            Inquiries &amp; Collaboration
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
          Let&apos;s Connect
        </h2>
        <p className="text-xs sm:text-sm text-[#D7E2EA]/75 font-light mb-6">
          Reach out for software engineering opportunities, professional collaborations, or simply to connect.
        </p>

        {/* Quick Email Banner */}
        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-left truncate">
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 block">
                Direct Email
              </span>
              <span className="text-xs sm:text-sm font-mono font-medium text-white truncate">
                {emailAddress}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy Email
              </>
            )}
          </button>
        </div>

        {/* Professional Contact Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          {/* Phone */}
          <a
            href="tel:+917030874544"
            className="group flex items-center gap-3 p-4 rounded-xl
            bg-white/[0.03] border border-white/10
            hover:border-purple-500/50 hover:bg-purple-500/5
            transition-all duration-300"
          >
            <div className="p-2.5 rounded-lg bg-white/5
              group-hover:bg-purple-500/20 transition-colors">
              <Phone className="w-5 h-5 text-purple-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider
                text-white/40">Call me</p>
              <p className="text-xs font-semibold text-white">
                +91 7030874544
              </p>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/DarkraiBeast?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 rounded-xl
            bg-white/[0.03] border border-white/10
            hover:border-purple-500/50 hover:bg-purple-500/5
            transition-all duration-300"
          >
            <div className="p-2.5 rounded-lg bg-white/5
              group-hover:bg-purple-500/20 transition-colors">
              <Github className="w-5 h-5 text-purple-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider
                text-white/40">GitHub</p>
              <p className="text-xs font-semibold text-white">
                View Projects
              </p>
            </div>
            <ExternalLink className="w-3 h-3 text-white/30 ml-auto" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/joseph-roy-thayil-84544a208/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 rounded-xl
            bg-white/[0.03] border border-white/10
            hover:border-purple-500/50 hover:bg-purple-500/5
            transition-all duration-300"
          >
            <div className="p-2.5 rounded-lg bg-white/5
              group-hover:bg-purple-500/20 transition-colors">
              <Linkedin className="w-5 h-5 text-purple-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider
                text-white/40">LinkedIn</p>
              <p className="text-xs font-semibold text-white">
                Connect with me
              </p>
            </div>
            <ExternalLink className="w-3 h-3 text-white/30 ml-auto" />
          </a>

        </div>


        {/* Form or Confirmation */}
        {submitted ? (
        <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center flex flex-col items-center gap-4">

          <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
            <Check className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-white uppercase">
            Email Application Opened!
          </h3>

          <p className="text-sm text-emerald-100/80 max-w-sm">
            Your email application should have opened with your inquiry details.
            Please review and send the email to complete your inquiry.
          </p>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-2 rounded-full border border-emerald-400/30 text-emerald-300 text-xs uppercase tracking-wider"
          >
            Send Another Message
          </button>

        </div>
      ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-white/70 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors placeholder:text-white/30"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-white/70 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors placeholder:text-white/30"
                />
              </div>
            </div>

            {/* Opportunity Type */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-white/70 mb-1.5">
                Opportunity Type
              </label>

              <select
                value={formData.service}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    service: e.target.value,
                    customService: '',
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400"
              >
                <option value="Software Engineer">Software Engineer</option>
                <option value=".NET Developer">.NET Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Freelance / Project Collaboration">
                  Freelance / Project Collaboration
                </option>
                <option value="Internship Opportunity">
                  Internship Opportunity
                </option>
                <option value="Other">Other (Please Specify)</option>
              </select>
            </div>

            {/* Custom Opportunity */}
            {formData.service === 'Other' && (
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-white/70 mb-1.5">
                  Specify Opportunity Type
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter your opportunity type..."
                  value={formData.customService}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customService: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400"
                />
              </div>
            )}

            {/* Company */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-white/70 mb-1.5">
                Company / Organization (Optional)
              </label>

              <input
                type="text"
                placeholder="Enter company name..."
                value={formData.company}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    company: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-white/70 mb-1.5">
                Project Scope / Message
              </label>
              <textarea
                rows={3}
                required
                placeholder="Tell me about the opportunity, role, or how we can connect..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors placeholder:text-white/30 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-xs text-white/50">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Panjim, Goa, India (UTC+5:30)</span>
              </div>

              <button
                type="submit"
                className="px-8 py-3 rounded-full text-white font-medium uppercase tracking-widest text-xs transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center gap-2"
                style={{
                  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                  outline: '2px solid #ffffff',
                  outlineOffset: '-3px',
                }}
              >
                <Send className="w-3.5 h-3.5" /> Send Email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
