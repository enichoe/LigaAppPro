import React, {useState} from 'react'
import PublicView from './components/PublicView'
import AdminLogin from './components/AdminLogin'
import AdminPanel from './components/AdminPanel'
import { DATA } from './data/mock'
import TeamDetail from './components/TeamDetail'
import MatchDetail from './components/MatchDetail'
import Footer from './components/Footer'

export default function App(){
  const [view, setView] = useState('public') // 'public', 'login', 'admin'
  const [data, setData] = useState(DATA)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [selectedMatch, setSelectedMatch] = useState(null)

  const handleSelectTeam = (teamId) => {
    setSelectedTeam(teamId)
  }

  const handleSelectMatch = (matchId) => {
    setSelectedMatch(matchId)
  }

  const login = (user, pass)=>{
    if(user==='admin' && pass==='1234'){ setView('admin'); return true }
    return false
  }

  const logout = ()=> setView('public')

  const updateData = (next)=> {
    console.log('data updated', next)
    setData(next)
  }

  const renderNav = ()=>{
    return (
      <nav className='bg-slate-900 text-white p-4 flex justify-between items-center shadow-md'>
        <h1 className='text-xl font-bold cursor-pointer hover:text-cyan-400 transition-colors' onClick={()=>{setView('public'); setSelectedTeam(null); setSelectedMatch(null)}}>LigaProApp</h1>
        {view !== 'admin' && <button onClick={()=>setView('login')} className='btn-secondary'>Admin Login</button>}
      </nav>
    )
  }

  const renderView = ()=>{
    const team = data.teams.find(t => t.id === selectedTeam)
    if(team){
      const players = data.players.filter(p => p.equipoId === team.id)
      return <TeamDetail team={team} players={players} onBack={()=>{setSelectedTeam(null); setSelectedMatch(null)}} />
    }

    const match = data.matches.find(m => m.id === selectedMatch)
    if(match){
      const teamA = data.teams.find(t => t.id === match.equipoA)
      const teamB = data.teams.find(t => t.id === match.equipoB)
      const playersA = data.players.filter(p => p.equipoId === teamA.id)
      const playersB = data.players.filter(p => p.equipoId === teamB.id)
      return <MatchDetail match={match} teamA={teamA} teamB={teamB} playersA={playersA} playersB={playersB} onBack={()=>{setSelectedTeam(null); setSelectedMatch(null)}} />
    }

    if(view === 'public') return <PublicView data={data} onSelectTeam={handleSelectTeam} onSelectMatch={handleSelectMatch} />
    if(view === 'login') return <AdminLogin onLogin={login} />
    if(view === 'admin') return <AdminPanel data={data} updateData={updateData} onLogout={logout} />
  }

  return (
    <div className='dark bg-gray-900 min-h-screen'>
      {renderNav()}
      <main>
        {renderView()}
      </main>
      <Footer />
    </div>
  )
}
