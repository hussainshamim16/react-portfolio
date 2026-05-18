import { useState } from 'react';
import { personal } from '../data/portfolio';
import { db } from '../data/scroll'; // Aapka firebase config file
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // 1. Firebase "contactMessages" collection mein data add karein
      await addDoc(collection(db, "contactMessages"), {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        createdAt: serverTimestamp(), // Time track karne ke liye
      });

      // 2. Success state set karein
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error("Error sending message: ", error);
      setStatus('error');
      alert("Something went wrong. Please try again.");
    }
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    // { icon: '📞', label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
    { icon: '📍', label: 'Location', value: personal.location, href: null },
  ];

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            Contact
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Let&apos;s Work Together</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item) => (
              <div key={item.label} className="glass rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-slate-500 text-xs mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-white font-medium hover:text-blue-400 transition-colors text-sm">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white font-medium text-sm">{item.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="glass rounded-2xl p-5">
              <div className="text-slate-400 text-sm mb-4">Connect with me</div>
              <div className="flex gap-3">
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-xl bg-blue-600/15 hover:bg-blue-600 border border-blue-500/20 text-blue-400 hover:text-white text-center text-sm font-medium transition-all duration-200"
                >
                  LinkedIn
                </a>
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-center text-sm font-medium transition-all duration-200"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 pulse-glow inline-block" />
                <span className="text-white font-medium text-sm">Available for Work</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Currently accepting freelance projects and full-time opportunities. Response time: within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-8">
              {status === 'sent' ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-slate-400">
                    Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus(null)}
                    className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Inquiry"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell me about your project..."
                      className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}