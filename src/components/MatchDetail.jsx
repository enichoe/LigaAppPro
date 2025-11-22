import React from 'react';

const MatchEvent = ({ player, eventType }) => {
  const eventIcons = {
    goal: '⚽',
    yellow: '🟨',
    red: '🟥',
  };

  return (
    <div className="flex items-center gap-2">
      <span>{eventIcons[eventType]}</span>
      <span>{player.nombre}</span>
    </div>
  );
};

export default function MatchDetail({ match, teamA, teamB, playersA, playersB, onBack }) {
  // Simulación de eventos del partido
  const eventsA = playersA.filter(p => p.goles > 0 || p.amarillas > 0 || p.rojas > 0);
  const eventsB = playersB.filter(p => p.goles > 0 || p.amarillas > 0 || p.rojas > 0);

  return (
    <div className="p-4 md:p-6">
      <button onClick={onBack} className="btn-secondary mb-4">
        &larr; Volver a la lista
      </button>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-800">Detalles del Partido</h1>
        <p className="text-lg text-600">{match.fecha} - {match.horario}</p>
        <p className="text-md text-500">{match.ubicacion}</p>
      </header>
      <div className="card">
        <div className="flex justify-around items-center mb-8">
          <div className="text-center">
            <img src={teamA.logo} alt={`${teamA.nombre} logo`} className="w-24 h-24 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">{teamA.nombre}</h2>
          </div>
          <div className="text-5xl font-bold">
            {match.estado === 'finalizado' ? `${match.golesA} - ${match.golesB}` : 'VS'}
          </div>
          <div className="text-center">
            <img src={teamB.logo} alt={`${teamB.nombre} logo`} className="w-24 h-24 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">{teamB.nombre}</h2>
          </div>
        </div>

        {match.estado === 'finalizado' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">Eventos del Partido</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                {eventsA.map(p => (
                  <div key={p.id}>
                    {Array.from({ length: p.goles }).map((_, i) => <MatchEvent key={`g-${p.id}-${i}`} player={p} eventType="goal" />)}
                    {Array.from({ length: p.amarillas }).map((_, i) => <MatchEvent key={`y-${p.id}-${i}`} player={p} eventType="yellow" />)}
                    {Array.from({ length: p.rojas }).map((_, i) => <MatchEvent key={`r-${p.id}-${i}`} player={p} eventType="red" />)}
                  </div>
                ))}
              </div>
              <div className="text-right">
                {eventsB.map(p => (
                  <div key={p.id}>
                    {Array.from({ length: p.goles }).map((_, i) => <MatchEvent key={`g-${p.id}-${i}`} player={p} eventType="goal" />)}
                    {Array.from({ length: p.amarillas }).map((_, i) => <MatchEvent key={`y-${p.id}-${i}`} player={p} eventType="yellow" />)}
                    {Array.from({ length: p.rojas }).map((_, i) => <MatchEvent key={`r-${p.id}-${i}`} player={p} eventType="red" />)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
