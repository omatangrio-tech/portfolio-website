'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, staggerChildren: 0.1 }
  }
};

const childVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleInputRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionVariants}
      className="w-full py-24 bg-surface"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div variants={childVariants} className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-400 rounded-full mx-auto md:mx-0" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left: Contact Info */}
          <div className="flex flex-col gap-8">
            <motion.p variants={childVariants} className="text-xl text-gray-300 font-medium leading-relaxed">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </motion.p>
            
            <div className="flex flex-col gap-6">
              {[
                { icon: Mail, label: 'Email', value: 'omatangrio@gmail.com', href: 'mailto:omatangrio@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 6353826919', href: 'tel:+916353826919' },
                { icon: Linkedin, label: 'LinkedIn', value: 'patel-om-9b8a6b33a', href: 'https://www.linkedin.com/in/patel-om-9b8a6b33a/' },
                { icon: Github, label: 'GitHub', value: 'omatangrio-tech', href: 'https://github.com/omatangrio-tech' }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={childVariants}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background border border-white/5 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all group"
                >
                  <div className="w-12 h-12 bg-surface-light rounded-lg flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <motion.div variants={childVariants} className="bg-background p-8 rounded-2xl border border-white/10 shadow-2xl relative">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-transparent"
                />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: focusedInput === 'name' ? '100%' : 0 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-cyan-400 rounded-b-lg"
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-transparent"
                />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: focusedInput === 'email' ? '100%' : 0 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-cyan-400 rounded-b-lg"
                />
              </div>

              <div className="relative">
                <textarea
                  placeholder="Your Message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  onFocus={() => setFocusedInput('message')}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-transparent resize-none"
                />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: focusedInput === 'message' ? '100%' : 0 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-cyan-400 rounded-b-lg"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                onClick={handleInputRipple}
                className="relative overflow-hidden w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-lg flex justify-center items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </span>
              </button>

              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-center text-sm"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-center text-sm"
                >
                  Something went wrong. Please try again.
                </motion.div>
              )}

            </form>
          </motion.div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          background-color: rgba(255, 255, 255, 0.3);
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}} />
    </motion.section>
  );
}
