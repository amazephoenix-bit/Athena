import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, size = 'md', hideClose = false }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = { sm: 440, md: 560, lg: 720, xl: 900, full: '95vw' };
  const maxW = sizes[size] || sizes.md;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
    >
      <div
        className="modal-enter w-full overflow-auto rounded-2xl border border-white/10 bg-[#14171f] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: maxW, maxHeight: '90vh' }}
      >
        {(title || !hideClose) && (
          <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
            {title && <h2 className="m-0 text-lg font-semibold tracking-tight text-slate-50">{title}</h2>}
            {!hideClose && (
              <button type="button" onClick={onClose} className="icon-btn">
                <X size={16} />
              </button>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
