import { useState } from 'react';
import { MessageCircle, X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl p-5 w-72 border"
            style={{ borderColor: 'var(--light-border)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--medihub-blue)' }}>
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="font-heading font-semibold text-sm" style={{ color: 'var(--midnight-navy)' }}>MedTech Support</p>
                <p className="text-xs flex items-center gap-1" style={{ color: 'var(--surgical-teal)' }}>
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--surgical-teal)' }}></span> Email us anytime
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4 font-body">Hello! 👋 How can we help you today? Send us an email and our healthcare solutions team will get back to you promptly.</p>
            <a
              href="mailto:info@medtechspecialdevice.com"
              className="flex items-center gap-2 w-full py-3 px-4 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: 'var(--medihub-blue)' }}
            >
              <Mail size={16} />
              info@medtechspecialdevice.com
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300"
        style={{ background: 'var(--medihub-blue)', boxShadow: '0 4px 20px rgba(0,91,170,0.4)' }}
        aria-label={open ? 'Close chat' : 'Contact MedTech Support'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}