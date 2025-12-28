import React, { useState } from 'react'
import { api } from '../services/api' // Importar api

export default function AdminLogin({ onLogin }) {
  const [u, setU] = useState(''), [p, setP] = useState('')
  const [err, setErr] = useState('')

  const submit = async () => { // Async
    try {
      await api.login(u, p)
      onLogin() // Notificar a App que login fue exitoso
    } catch (e) {
      setErr(e.message)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-md card'>
        <h2 className='text-xl font-bold mb-4'>Login administrador</h2>
        <input className='input mb-2' placeholder='Usuario' value={u} onChange={e => setU(e.target.value)} />
        <input className='input mb-2' placeholder='Password' type='password' value={p} onChange={e => setP(e.target.value)} />
        {err && <div className='text-red-400 mb-2'>{err}</div>}
        <div className='flex gap-2'>
          <button onClick={submit} className='btn'>Entrar</button>
          <button onClick={() => window.location.reload()} className='px-3 py-2 rounded border'>Volver</button>
        </div>
      </div>
    </div>
  )
}
