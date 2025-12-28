import React, { useState } from 'react'
import { api } from '../../services/api'

const EMPTY_FORM = { nombre: '', edad: '', posicion: 'Delantero', equipoId: '', foto: '', goles: 0, amarillas: 0, rojas: 0, lesionado: false, suspendido: false }

export default function PlayersAdmin({ data, onReload }) {
  // Nota: data.players viene actualizado desde App.jsx gracias a onReload

  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [filterTeamId, setFilterTeamId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const playersPerPage = 5

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm({ ...form, foto: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!form.nombre || !form.equipoId) {
      alert("Falta nombre o equipo");
      return;
    }

    // Preparar objeto para API
    const playerData = {
      nombre: form.nombre,
      edad: parseInt(form.edad) || 0,
      posicion: form.posicion,
      equipo: form.equipoId, // API espera 'equipo' (ID o objeto, pero para crear mandamos ID)
      image: form.foto || 'assets/players/default.svg',
      goles: parseInt(form.goles) || 0,
      amarillas: parseInt(form.amarillas) || 0,
      rojas: parseInt(form.rojas) || 0,
      lesionado: !!form.lesionado,
      suspendido: !!form.suspendido
    }

    try {
      if (editingId) {
        await api.updatePlayer(editingId, { ...playerData })
      } else {
        await api.createPlayer(playerData)
      }
      onReload() // Recarga datos en App.jsx -> data.players se actualiza
      setForm(EMPTY_FORM)
      setEditingId(null)
    } catch (e) {
      alert("Error al guardar: " + e.message)
    }
  }

  const startEdit = (player) => {
    setEditingId(player.id)
    setForm({
      nombre: player.nombre,
      edad: player.edad,
      posicion: player.posicion,
      equipoId: player.equipoId || (player.equipo ? player.equipo._id : ''), // Manejar si viene populado o no
      foto: player.image || player.foto,
      goles: player.goles,
      amarillas: player.amarillas,
      rojas: player.rojas,
      lesionado: player.lesionado,
      suspendido: player.suspendido
    })
  }

  const cancelEdit = () => {
    setForm(EMPTY_FORM)
    setEditingId(null)
  }

  const remove = async (id) => {
    if (!window.confirm("¿Eliminar jugador?")) return;
    try {
      await api.deletePlayer(id)
      onReload()
    } catch (e) {
      alert("Error: " + e.message)
    }
  }

  const getTeamName = (id) => {
    const t = data.teams.find(x => x.id === id)
    return t ? (t.nombre || t.name) : 'Sin equipo'
  }

  return (
    <div className="p-4 text-white">
      <h3 className="text-3xl font-bold mb-6">⚽ Gestión de jugadores</h3>

      {/* FORMULARIO */}
      <div className="mb-6 p-5 bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700 space-y-4 shadow-lg">
        <h4 className="font-semibold text-xl border-b border-gray-700 pb-2">
          {editingId ? '✏️ Editando Jugador' : '➕ Agregar Nuevo Jugador'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="input placeholder-gray-400 text-white bg-gray-900 border-gray-700 rounded-lg p-2"
            placeholder="Nombre del jugador"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            className="input placeholder-gray-400 text-white bg-gray-900 border-gray-700 rounded-lg p-2"
            placeholder="Edad"
            type="number"
            value={form.edad}
            onChange={e => setForm({ ...form, edad: e.target.value })}
          />
          <select
            className="input bg-gray-900 text-white border-gray-700 rounded-lg p-2"
            value={form.posicion}
            onChange={e => setForm({ ...form, posicion: e.target.value })}
          >
            <option>Delantero</option>
            <option>Mediocampista</option>
            <option>Defensa</option>
            <option>Portero</option>
          </select>
          <select
            className="input bg-gray-900 text-white border-gray-700 rounded-lg p-2"
            value={form.equipoId}
            onChange={e => setForm({ ...form, equipoId: e.target.value })}
          >
            <option value="">-- Selecciona Equipo --</option>
            {data.teams.map(t => (
              <option key={t.id} value={t.id}>
                {t.nombre || t.name}
              </option>
            ))}
          </select>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Foto del Jugador</label>
            <input
              type="file"
              className="input w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handlePhotoChange}
            />
          </div>
          <div className="col-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Goles</label>
            <input
              className="input placeholder-gray-400 text-white bg-gray-900 border-gray-700 rounded-lg p-2"
              placeholder="Goles"
              type="number"
              value={form.goles}
              onChange={e => setForm({ ...form, goles: e.target.value })}
            />
          </div>
          <div className="col-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Amarillas</label>
            <input
              className="input placeholder-gray-400 text-white bg-gray-900 border-gray-700 rounded-lg p-2"
              placeholder="Amarillas"
              type="number"
              value={form.amarillas}
              onChange={e => setForm({ ...form, amarillas: e.target.value })}
            />
          </div>
          <div className="col-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Rojas</label>
            <input
              className="input placeholder-gray-400 text-white bg-gray-900 border-gray-700 rounded-lg p-2"
              placeholder="Rojas"
              type="number"
              value={form.rojas}
              onChange={e => setForm({ ...form, rojas: e.target.value })}
            />
          </div>
          <div className="col-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Estado</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={!!form.lesionado}
                  onChange={e => setForm({ ...form, lesionado: e.target.checked })}
                />
                Lesionado
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={!!form.suspendido}
                  onChange={e => setForm({ ...form, suspendido: e.target.checked })}
                />
                Suspendido
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
          >
            {editingId ? '💾 Guardar Cambios' : '➕ Agregar Jugador'}
          </button>

          {editingId && (
            <button
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* FILTRO, BÚSQUEDA Y LISTA DE JUGADORES */}
      <div>
        <div className="my-6 flex flex-wrap items-center gap-4">
          <h4 className="text-xl font-semibold">Lista de Jugadores</h4>
          <select
            className="input bg-gray-900 text-white border-gray-700 rounded-lg p-2 text-sm"
            value={filterTeamId}
            onChange={e => { setFilterTeamId(e.target.value); setCurrentPage(1); }}
          >
            <option value="">-- Filtrar por Equipo --</option>
            {data.teams.map(t => <option key={t.id} value={t.id}>{t.nombre || t.name}</option>)}
          </select>
          <input
            type="text"
            placeholder="Buscar jugador..."
            className="input bg-gray-900 text-white border-gray-700 rounded-lg p-2 text-sm"
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="space-y-3">
          {(() => {
            const filteredPlayers = data.players
              .filter(p => !filterTeamId || p.equipoId === filterTeamId)
              .filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

            const paginatedPlayers = filteredPlayers.slice((currentPage - 1) * playersPerPage, currentPage * playersPerPage);

            return paginatedPlayers.map(p => {
              const teamName = getTeamName(p.equipoId)
              return (
                <div
                  key={p.id}
                  className="bg-gray-800/70 p-4 rounded-xl flex flex-wrap justify-between items-center border border-gray-700 hover:bg-gray-800 transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.image || 'https://via.placeholder.com/150'}
                      alt={p.nombre}
                      className="w-14 h-14 rounded-full object-cover border border-gray-600"
                    />
                    <div>
                      <div className="font-semibold text-lg">{p.nombre}</div>
                      <div className="text-sm text-gray-400">
                        {p.posicion} • {teamName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <span>⚽ {p.goles || 0}</span>
                    <span className="text-yellow-400">🟨 {p.amarillas || 0}</span>
                    <span className="text-red-400">🟥 {p.rojas || 0}</span>
                    {p.lesionado && (
                      <span className="text-red-400 font-semibold">Lesionado</span>
                    )}
                    {p.suspendido && (
                      <span className="text-orange-400 font-semibold">Suspendido</span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => startEdit(p)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => remove(p.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )
            })
          })()}
        </div>
        {/* PAGINACIÓN */}
        <div className="mt-6 flex justify-center items-center gap-2">
          {Array.from({ length: Math.ceil(data.players.filter(p => !filterTeamId || p.equipoId === filterTeamId).filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase())).length / playersPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
