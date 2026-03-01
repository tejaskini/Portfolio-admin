import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl animate-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;