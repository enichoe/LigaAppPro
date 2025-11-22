import React, {useState} from 'react'
import TeamsAdmin from './admin/TeamsAdmin'
import PlayersAdmin from './admin/PlayersAdmin'
import MatchesAdmin from './admin/MatchesAdmin'

export default function AdminPanel({data, updateData, onLogout}){
  const [tab, setTab] = useState('teams')
  const save = (next)=> updateData(next)
  return (
    <div className='flex h-screen'>
      <aside className='w-64 p-4 bg-slate-900 border-r border-slate-800'>
        <h2 className='text-lg font-bold mb-4'>Admin Panel</h2>
        <nav className='flex flex-col gap-2'>
          <button onClick={()=>setTab('teams')} className='text-left p-2 rounded hover:bg-slate-800/50'>Equipos</button>
          <button onClick={()=>setTab('players')} className='text-left p-2 rounded hover:bg-slate-800/50'>Jugadores</button>
          <button onClick={()=>setTab('matches')} className='text-left p-2 rounded hover:bg-slate-800/50'>Partidos</button>
          <button onClick={onLogout} className='text-left p-2 rounded text-sm text-red-400'>Cerrar sesión</button>
        </nav>
      </aside>
      <main className='flex-1 p-6 overflow-auto'>
        {tab==='teams' && <TeamsAdmin data={data} onSave={save} />}
        {tab==='players' && <PlayersAdmin data={data} onSave={save} />}
        {tab==='matches' && <MatchesAdmin data={data} onSave={save} />}
      </main>
    </div>
  )
}
