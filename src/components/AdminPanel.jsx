import React, { useState } from 'react'
import TeamsAdmin from './admin/TeamsAdmin'
import PlayersAdmin from './admin/PlayersAdmin'
import MatchesAdmin from './admin/MatchesAdmin'
import SponsorsAdmin from './admin/SponsorsAdmin'

export default function AdminPanel({ data, onReload, onLogout }) {
  const [tab, setTab] = useState('teams')

  return (
    <div className='flex flex-col min-h-screen md:flex-row'>
      <aside className='w-full p-4 bg-slate-900 border-b border-slate-800 md:w-64 md:border-r md:border-b-0'>
        <h2 className='text-lg font-bold mb-4'>Admin Panel</h2>
        <nav className='flex flex-col gap-2 md:flex-col'>
          <button onClick={() => setTab('teams')} className='text-left p-2 rounded hover:bg-slate-800/50'>Equipos</button>
          <button onClick={() => setTab('players')} className='text-left p-2 rounded hover:bg-slate-800/50'>Jugadores</button>
          <button onClick={() => setTab('matches')} className='text-left p-2 rounded hover:bg-slate-800/50'>Partidos</button>
          <button onClick={() => setTab('sponsors')} className='text-left p-2 rounded hover:bg-slate-800/50'>Auspiciadores</button>
          <button onClick={onLogout} className='text-left p-2 rounded text-sm text-red-400'>Cerrar sesión</button>
        </nav>
      </aside>
      <main className='flex-1 p-4 md:p-6 overflow-auto'>
        {tab === 'teams' && <TeamsAdmin data={data} onReload={onReload} />}
        {tab === 'players' && <PlayersAdmin data={data} onReload={onReload} />}
        {tab === 'matches' && <MatchesAdmin data={data} onReload={onReload} />}
        {tab === 'sponsors' && <SponsorsAdmin data={data} onReload={onReload} />}
      </main>
    </div>
  )
}
