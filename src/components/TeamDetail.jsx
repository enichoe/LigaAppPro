import React from 'react';

export default function TeamDetail({ team, players, onBack }) {
  return (
    <div className="p-4 md:p-6">
      <button onClick={onBack} className="btn-secondary mb-4">
        &larr; Volver a la lista
      </button>
      <header className="text-center mb-8">
        <img src={team.logo} alt={`${team.nombre} logo`} className="w-24 h-24 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-800">{team.nombre}</h1>
      </header>
      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Jugadores</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="p-2">Nombre</th>
                <th>Edad</th>
                <th>Posición</th>
                <th>Goles</th>
                <th>Amarillas</th>
                <th>Rojas</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {players.map(p => {
                const isSuspended = p.amarillas > 3 || p.rojas > 0;
                return (
                  <tr key={p.id} className="border-b">
                    <td className="p-2 flex items-center gap-4">
                      <img src={p.foto} className="w-12 h-12 rounded-full object-cover" />
                      <span className="font-semibold">{p.nombre}</span>
                    </td>
                    <td>{p.edad}</td>
                    <td>{p.posicion}</td>
                    <td>{p.goles}</td>
                    <td>{p.amarillas}</td>
                    <td>{p.rojas}</td>
                    <td>
                      {p.lesionado && <span className="text-red-500 font-bold">Lesionado</span>}
                      {isSuspended && <span className="text-orange-500 font-bold">Suspendido</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
