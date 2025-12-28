import React, { useState } from 'react'
import { api } from '../../services/api'

export default function TeamsAdmin({ data, onReload }) {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#000000')
  const [logo, setLogo] = useState('')
  const [grupoId, setGrupoId] = useState(data.groups[0]?.id || '')
  const [editingTeamId, setEditingTeamId] = useState(null)

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const add = async () => {
    if (!name || !grupoId) return
    try {


      // Voy a enviar ambos keys por seguridad momentanea: nombre y name.
      await api.createTeam({
        nombre: name, // Modelo
        name: name,   // Controller (posiblemente)
        logo,
        color,
        grupo: grupoId,
        players: []
      })
      onReload()
      setName('')
      setColor('#000000')
      setLogo('')
    } catch (e) {
      alert("Error al crear equipo: " + e.message)
    }
  }

  const remove = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este equipo?")) return;
    try {
      await api.deleteTeam(id)
      onReload()
    } catch (e) {
      alert("Error al eliminar: " + e.message)
    }
  }

  const startEdit = (team) => {
    setEditingTeamId(team.id)
    setName(team.nombre || team.name) // Manejo ambos por si acaso
    setColor(team.color)
    setLogo(team.logo)
    setGrupoId(team.grupo || team.grupoId) // Backend devuelve 'grupo' (ObjectId), frontend mock usaba 'grupoId'
  }

  const cancelEdit = () => {
    setEditingTeamId(null)
    setName('')
    setColor('#000000')
    setLogo('')
  }

  const handleUpdate = async () => {
    try {
      await api.updateTeam(editingTeamId, {
        nombre: name,
        name: name,
        color,
        logo,
        grupo: grupoId
      })
      onReload()
      cancelEdit()
    } catch (e) {
      alert("Error al actualizar: " + e.message)
    }
  }

  if (editingTeamId) {
    return (
      <div className="mb-6 p-5 bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700 space-y-4 shadow-lg">
        <h4 className="font-semibold text-lg mb-3 text-700">Editar Equipo</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
          <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre del equipo" />
          <select className="input" value={grupoId} onChange={e => setGrupoId(e.target.value)}>
            {data.groups.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
          </select>
          <input type="file" onChange={handleLogoChange} className="input" />
          <div className="flex items-center gap-2">
            <label>Color:</label>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="h-10 w-16" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <button onClick={handleUpdate} className="btn-primary">Guardar Cambios</button>
          <button onClick={cancelEdit} className="btn-secondary">Cancelar</button>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6 p-5 bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700 space-y-4 shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-800 border-b pb-2">⚽ Gestión de Equipos</h3>

      <div className="mb-6 p-5 bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700 space-y-4 shadow-lg">
        <h4 className="font-semibold text-lg mb-3 text-700">Agregar Nuevo Equipo</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
          <input
            className="input border-gray-300 focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nombre del equipo"
          />

          <select
            className="input border-gray-300 focus:ring-2 focus:ring-blue-400"
            value={grupoId}
            onChange={e => setGrupoId(e.target.value)}
          >
            <option value="">Seleccionar grupo</option>
            {data.groups.map(g => (
              <option key={g.id} value={g.id}>{g.nombre}</option>
            ))}
          </select>

          <input
            type="file"
            className="input border-gray-300 focus:ring-2 focus:ring-blue-400"
            onChange={handleLogoChange}
          />

          <div className="flex items-center gap-2 col-span-1">
            <label className="text-gray-300 font-medium">Color:</label>
            <input
              className="h-10 w-16 rounded cursor-pointer border border-gray-300"
              type="color"
              value={color}
              onChange={e => setColor(e.target.value)}
              title="Color del equipo"
            />
          </div>
        </div>

        <button
          onClick={add}
          className="btn w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Agregar Equipo
        </button>
      </div>

      <div className="space-y-3">
        {data.teams.map(t => (
          <div
            key={t.id}
            className="card flex flex-col md:flex-row justify-between items-center input col-span-2 placeholder-gray-400 text-white bg-gray-900 border-gray-700 rounded-lg p-2"
          >
            <div className="flex items-center gap-3">
              <img src={t.logo} alt={t.nombre} className="w-10 h-10 object-contain rounded-full border" />
              <div>
                <span style={{ color: t.color }} className="font-bold text-lg">{t.nombre || t.name}</span>
                <div className="text-sm text-gray-300">
                  {data.groups.find(g => g.id === (t.grupo || t.grupoId))?.nombre}
                </div>
              </div>
            </div>

            <div className="mt-2 md:mt-0">
              <button
                onClick={() => startEdit(t)}
                className="px-3 py-1 rounded-md border border-yellow-400 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all duration-200 mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => remove(t.id)}
                className="px-3 py-1 rounded-md border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}
