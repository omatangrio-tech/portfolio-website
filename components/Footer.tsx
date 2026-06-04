'use client';

import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/10 bg-background text-gray-400">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          Designed & Built by Patel Om © {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/omatangrio-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/patel-om-9b8a6b33a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            <Linkedin size={20} />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
