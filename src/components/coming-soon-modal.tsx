// components/coming-soon-modal.tsx
"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function ComingSoonModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 max-w-md w-full relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-400 mb-6">
              This feature is currently under development. Stay tuned for updates!
            </p>
            
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function useComingSoon() {
  const [isOpen, setIsOpen] = useState(false);

  const showComingSoon = () => setIsOpen(true);
  const hideComingSoon = () => setIsOpen(false);

  const ComingSoonModal = () => (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 max-w-md w-full relative">
