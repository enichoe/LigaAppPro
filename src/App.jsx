import React, { useState, useEffect } from 'react'
import PublicView from './components/PublicView'
import AdminLogin from './components/AdminLogin'
import AdminPanel from './components/AdminPanel'
import { api } from './services/api'
import TeamDetail from './components/TeamDetail'
import MatchDetail from './components/MatchDetail'
import Footer from './components/Footer'

export default function App() {
  const [view, setView] = useState('public') // 'public', 'login', 'admin'
  const [data, setData] = useState({ groups: [], teams: [], players: [], matches: [], sponsors: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const newData = await api.getAllData()
    setData(newData)
    setLoading(false)
  }
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [selectedMatch, setSelectedMatch] = useState(null)

  const handleSelectTeam = (teamId) => {
    setSelectedTeam(teamId)
  }

  const handleSelectMatch = (matchId) => {
    setSelectedMatch(matchId)
  }

  const login = () => {
    setView('admin')
    loadData()
  }

  const logout = () => {
    api.logout()
    setView('public')
  }


  const renderNav = () => {
    return (
      <nav className='bg-slate-900 text-white p-4 flex justify-between items-center shadow-md'>
        <h1 className='text-xl font-bold cursor-pointer hover:text-cyan-400 transition-colors' onClick={() => { setView('public'); setSelectedTeam(null); setSelectedMatch(null) }}>LigaProApp</h1>
        {view !== 'admin' && <button onClick={() => setView('login')} className='btn-secondary'>Admin Login</button>}
      </nav>
    )
  }

  const renderView = () => {
    const team = data.teams.find(t => t.id === selectedTeam)
    if (team) {
      const players = data.players.filter(p => p.equipoId === team.id)
      return <TeamDetail team={team} players={players} onBack={() => { setSelectedTeam(null); setSelectedMatch(null) }} />
    }

    const match = data.matches.find(m => m.id === selectedMatch)
    if (match) {
      const teamA = data.teams.find(t => t.id === match.equipoA)
      const teamB = data.teams.find(t => t.id === match.equipoB)
      const playersA = data.players.filter(p => p.equipoId === teamA.id)
      const playersB = data.players.filter(p => p.equipoId === teamB.id)
      return <MatchDetail match={match} teamA={teamA} teamB={teamB} playersA={playersA} playersB={playersB} onBack={() => { setSelectedTeam(null); setSelectedMatch(null) }} />
    }

    if (view === 'public') {
      if (loading) return <div className="text-white p-10 text-center">Cargando datos...</div>
      return <PublicView data={data} onSelectTeam={handleSelectTeam} onSelectMatch={handleSelectMatch} />
    }
    if (view === 'login') return <AdminLogin onLogin={login} />
    if (view === 'admin') return <AdminPanel data={data} onReload={loadData} onLogout={logout} />
  }

  return (
    <div className='dark bg-gray-900 min-h-screen flex flex-col'>
      {renderNav()}
      <main className='flex-1'>
        {renderView()}
      </main>
      {view === 'public' && data.sponsors && data.sponsors.length > 0 && (
        <section className='p-4 md:p-6 bg-gray-900'>
          <div className='max-w-7xl mx-auto card transform hover:scale-105 transition-transform duration-300'>
            <h2 className='text-2xl font-semibold mb-4 text-emerald-400 text-center'>Nuestros Auspiciadores 🤝</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center'>
              {data.sponsors.map(sponsor => (
                <a
                  key={sponsor.id}
                  href={sponsor.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-center p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300 w-full max-w-xs'
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.nombre}
                    className='h-16 object-contain'
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  )
}
