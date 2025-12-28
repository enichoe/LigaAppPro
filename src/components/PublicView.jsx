import React from 'react'

const getTeam = (id, teams) => {
  const safeId = (id && typeof id === 'object') ? id._id : id;
  return teams.find(t => t.id === safeId)
}
const getId = (item) => (item && typeof item === 'object') ? item._id : item;

const calculateStandings = (teams, matches) => {
  const standings = teams.map(team => ({
    ...team,
    pj: 0,
    g: 0,
    e: 0,
    p: 0,
    gf: 0,
    gc: 0,
    dg: 0,
    pts: 0,
  }));

  matches.filter(m => m.estado === 'finalizado').forEach(match => {
    // Usar getId para extraer el ID si viene populado
    const idA = getId(match.equipoA);
    const idB = getId(match.equipoB);

    const teamA = standings.find(t => t.id === idA);
    const teamB = standings.find(t => t.id === idB);

    if (teamA && teamB) {
      teamA.pj += 1;
      teamB.pj += 1;
      teamA.gf += match.golesA;
      teamB.gf += match.golesB;
      teamA.gc += match.golesB;
      teamB.gc += match.golesA;
      teamA.dg = teamA.gf - teamA.gc;
      teamB.dg = teamB.gf - teamB.gc;

      if (match.golesA > match.golesB) {
        teamA.g += 1;
        teamB.p += 1;
        teamA.pts += 3;
      } else if (match.golesA < match.golesB) {
        teamB.g += 1;
        teamA.p += 1;
        teamB.pts += 3;
      } else {
        teamA.e += 1;
        teamB.e += 1;
        teamA.pts += 1;
        teamB.pts += 1;
      }
    }
  });

  return standings.sort((a, b) => b.pts - a.pts || b.dg - a.dg);
};


export default function PublicView({ data, onSelectTeam, onSelectMatch }) {
  const { teams, players, matches, groups } = data;

  const upcomingMatches = matches.filter(m => m.estado === 'proximo').sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const topScorers = [...players].sort((a, b) => b.goles - a.goles).slice(0, 5);
  const topYellowCards = [...players].sort((a, b) => b.amarillas - a.amarillas).slice(0, 5);
  const topRedCards = [...players].sort((a, b) => b.rojas - a.rojas).slice(0, 5);

  // Asumimos que hay al menos 2 grupos, tomamos sus IDs reales de la BD
  const groupAId = groups[0]?.id;
  const groupBId = groups[1]?.id;

  const standingsA = calculateStandings(teams.filter(t => t.grupoId === groupAId), matches);
  const standingsB = calculateStandings(teams.filter(t => t.grupoId === groupBId), matches);

  const semiFinals = [
    { match: 1, teamA: standingsA[0], teamB: standingsB[1] },
    { match: 2, teamA: standingsB[0], teamB: standingsA[1] },
  ]

  return (
    <div className='p-4 md:p-6  min-h-screen'>
      <header className='text-center mb-8'>
        <h1 className='text-4xl font-bold text-800'>III TORNEO INTERNO PROMO 1996 Claretiano</h1>
        <p className='text-lg text-600'>Verano apertura 2026</p>
        <p className='text-lg text-600'>Resultados y estadísticas del torneo</p>

      </header>

      <div className='grid md:grid-cols-3 gap-8'>

        <div className='md:col-span-2 space-y-8'>
          {/* Standings */}
          <section>
            <h2 className='text-2xl font-semibold mb-4'>Tabla de Posiciones</h2>
            {groups.map(group => {
              const groupTeams = teams.filter(t => t.grupoId === group.id);
              const standings = calculateStandings(groupTeams, matches);
              return (
                <div key={group.id} className='card mb-6 transform hover:scale-105 transition-transform duration-300'>
                  <h3 className='font-bold text-xl mb-3 p-2 rounded bg-gray-800 text-white'>{group.nombre}</h3>
                  <div className='overflow-x-auto'>
                    <table className='w-full text-sm text-left'>
                      <thead className='bg-gray-700'>
                        <tr>
                          <th className='p-2'>Equipo</th>
                          <th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>PTS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {standings.map((t, index) => {
                          const isQualified = index < 2;
                          return (
                            <tr key={t.id} className={`border-b ${isQualified ? 'bg-green-900/50' : (index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900')} hover:bg-gray-700`}>
                              <td className='p-2 flex items-center gap-2'>
                                <img src={t.logo} className='w-5 h-5 cursor-pointer transform hover:rotate-12 transition-transform' onClick={() => onSelectTeam(t.id)} />
                                <span className='font-semibold'>{t.nombre}</span>
                              </td>
                              <td>{t.pj}</td><td>{t.g}</td><td>{t.e}</td><td>{t.p}</td><td>{t.gf}</td><td>{t.gc}</td><td>{t.dg}</td><td className='font-bold'>{t.pts}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })}
          </section>

          {/* Finished Matches */}
          <section>
            <h2 className='text-2xl font-semibold mb-4'>Partidos Finalizados</h2>
            <div className='space-y-4'>
              {matches.filter(m => m.estado === 'finalizado').map(m => {
                const teamA = (m.equipoA && typeof m.equipoA === 'object') ? m.equipoA : getTeam(m.equipoA, teams);
                const teamB = (m.equipoB && typeof m.equipoB === 'object') ? m.equipoB : getTeam(m.equipoB, teams);
                if (!teamA || !teamB) return null;
                return (
                  <div key={m.id} className='card p-4 cursor-pointer hover:bg-gray-800' onClick={() => onSelectMatch(m.id)}>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-2 font-semibold'>
                        <img src={teamA.logo} className='w-6 h-6' /> {teamA.nombre}
                      </div>
                      <div className='text-xl font-bold'>{m.golesA}</div>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                      <div className='flex items-center gap-2 font-semibold'>
                        <img src={teamB.logo} className='w-6 h-6' /> {teamB.nombre}
                      </div>
                      <div className='text-xl font-bold'>{m.golesB}</div>
                    </div>
                    <div className='text-xs text-gray-400 mt-2 text-center'>{m.fecha} - {m.ubicacion}</div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Semifinals */}
          <section className='card transform hover:scale-105 transition-transform duration-300'>
            <h2 className='text-2xl font-semibold mb-4'>Posibles Semifinales</h2>
            <div className='space-y-4'>
              {semiFinals.map(sf => (
                sf.teamA && sf.teamB && (
                  <div key={sf.match} className='p-3 rounded-lg bg-gray-800'>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-2'><img src={sf.teamA.logo} className='w-6 h-6' /> {sf.teamA.nombre}</div>
                      <div className='font-bold'>VS</div>
                      <div className='flex items-center gap-2'>{sf.teamB.nombre} <img src={sf.teamB.logo} className='w-6 h-6' /></div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>
        </div>

        <div className='space-y-8'>
          {/* Upcoming Matches */}
          <section className='card transform hover:scale-105 transition-transform duration-300'>
            <h2 className='text-2xl font-semibold mb-4'>Próximos Partidos 🥅</h2>
            <div className='space-y-4'>
              {upcomingMatches.map(m => {
                // Si ya viene populado, usamos el objeto directo, si no buscamos por ID
                const teamA = (m.equipoA && typeof m.equipoA === 'object') ? m.equipoA : getTeam(m.equipoA, teams);
                const teamB = (m.equipoB && typeof m.equipoB === 'object') ? m.equipoB : getTeam(m.equipoB, teams);

                if (!teamA || !teamB) return null;
                return (
                  <div key={m.id} className='p-3 rounded-lg cursor-pointer hover:bg-gray-800' onClick={() => onSelectMatch(m.id)}>
                    <div className='text-xs text-gray-500'>{m.fecha} - {m.horario}</div>
                    <div className='text-xs text-gray-500 mb-1'>{m.ubicacion}</div>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-2'><img src={teamA.logo} className='w-6 h-6' /> {teamA.nombre}</div>
                      <div className='font-bold'>VS</div>
                      <div className='flex items-center gap-2'>{teamB.nombre} <img src={teamB.logo} className='w-6 h-6' /></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Top Scorers */}
          <section className='card transform hover:scale-105 transition-transform duration-300'>
            <h2 className='text-2xl font-semibold mb-4'>Goleadores ⚽</h2>
            <ul className='space-y-2'>
              {topScorers.map(p => {
                const team = getTeam(p.equipoId, teams);
                return (
                  <li key={p.id} className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <img src={p.image || p.foto} className='w-8 h-8 rounded-full object-cover' />
                      <div>
                        <div>{p.nombre}</div>
                        <div className='text-xs text-gray-500'>{team?.nombre}</div>
                      </div>
                    </div>
                    <div className='font-bold text-lg'>{p.goles}</div>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Tarjetas Amarillas */}
          <section className='card transform hover:scale-105 transition-transform duration-300'>
            <h2 className='text-2xl font-semibold mb-4'>Tarjetas Amarillas 🟨</h2>
            <ul className='space-y-2'>
              {topYellowCards.map(p => {
                const team = getTeam(p.equipoId, teams);
                return (
                  <li key={p.id} className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <img src={p.image || p.foto} className='w-8 h-8 rounded-full object-cover' />
                      <div>
                        <div>{p.nombre}</div>
                        <div className='text-xs text-gray-500'>{team?.nombre}</div>
                      </div>
                    </div>
                    <div className='font-bold text-lg'>{p.amarillas} 🟨</div>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Tarjetas Rojas */}
          <section className='card transform hover:scale-105 transition-transform duration-300'>
            <h2 className='text-2xl font-semibold mb-4'>Tarjetas Rojas 🟥</h2>
            <ul className='space-y-2'>
              {topRedCards.map(p => {
                const team = getTeam(p.equipoId, teams);
                return (
                  <li key={p.id} className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <img src={p.image || p.foto} className='w-8 h-8 rounded-full object-cover' />
                      <div>
                        <div>{p.nombre}</div>
                        <div className='text-xs text-gray-500'>{team?.nombre}</div>
                      </div>
                    </div>
                    <div className='font-bold text-lg'>{p.rojas} 🟥</div>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>

      </div>
    </div>
  )
}
