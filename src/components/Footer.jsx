import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white p-4 text-center shadow-md mt-8">
      <p>&copy; {new Date().getFullYear()} LigaProApp. Todos los derechos reservados.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="hover:text-cyan-400 transition-colors">Facebook</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">Instagram</a>
      </div>
    </footer>
  );
}
