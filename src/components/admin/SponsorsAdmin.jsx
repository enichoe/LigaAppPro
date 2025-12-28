import React, { useState } from 'react';
import { api } from '../../services/api';

export default function SponsorsAdmin({ data, onReload }) {
  // const [sponsors, setSponsors] = useState(data.sponsors) -> Eliminado
  const [newSponsor, setNewSponsor] = useState({
    id: '',
    nombre: '',
    logo: '',
    link: '',
  });
  const [editingSponsorId, setEditingSponsorId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSponsor({ ...newSponsor, [name]: value });
  };

  const generateId = () => {
    return 's' + Math.random().toString(36).substr(2, 9);
  };

  const handleAddSponsor = async () => {
    if (newSponsor.nombre && newSponsor.logo) {
      try {
        await api.createSponsor({
          nombre: newSponsor.nombre,
          logo: newSponsor.logo,
          link: newSponsor.link
        })
        onSave()
        setNewSponsor({ id: '', nombre: '', logo: '', link: '' });
      } catch (e) { alert("Error: " + e.message) }
    }
  };

  const handleEditClick = (sponsor) => {
    setEditingSponsorId(sponsor.id);
    setNewSponsor({ ...sponsor });
  };

  const handleUpdateSponsor = async () => {
    if (newSponsor.nombre && newSponsor.logo && editingSponsorId) {
      try {
        await api.updateSponsor(editingSponsorId, {
          nombre: newSponsor.nombre,
          logo: newSponsor.logo,
          link: newSponsor.link
        })
        onSave()
        setNewSponsor({ id: '', nombre: '', logo: '', link: '' });
        setEditingSponsorId(null);
      } catch (e) { alert("Error: " + e.message) }
    }
  };

  const handleDeleteSponsor = async (id) => {
    if (!window.confirm("Borrar auspiciador?")) return;
    try {
      await api.deleteSponsor(id)
      onReload()
    } catch (e) { alert("Error: " + e.message) }
  };

  return (
    <div className='p-6 bg-slate-800 rounded-lg shadow-lg text-white'>
      <h2 className='text-3xl font-bold mb-6 text-emerald-400'>Administrar Auspiciadores</h2>

      <div className='mb-8 p-4 bg-slate-700 rounded-md'>
        <h3 className='text-xl font-semibold mb-4'>{editingSponsorId ? 'Editar Auspiciador' : 'Agregar Nuevo Auspiciador'}</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <div>
            <label htmlFor='nombre' className='block text-sm font-medium text-gray-300'>Nombre del Auspiciador</label>
            <input
              type='text'
              id='nombre'
              name='nombre'
              value={newSponsor.nombre}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-md bg-slate-900 border-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500'
              placeholder='Nombre de la marca'
            />
          </div>
          <div>
            <label htmlFor='logo' className='block text-sm font-medium text-gray-300'>URL del Logo</label>
            <input
              type='text'
              id='logo'
              name='logo'
              value={newSponsor.logo}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-md bg-slate-900 border-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500'
              placeholder='e.g., /assets/logos/sponsor_ejemplo.svg'
            />
          </div>
          <div className='md:col-span-2'>
            <label htmlFor='link' className='block text-sm font-medium text-gray-300'>URL del Sitio Web (Opcional)</label>
            <input
              type='text'
              id='link'
              name='link'
              value={newSponsor.link}
              onChange={handleInputChange}
              className='mt-1 block w-full rounded-md bg-slate-900 border-gray-700 text-white focus:ring-emerald-500 focus:border-emerald-500'
              placeholder='e.g., https://www.marcadeportiva.com'
            />
          </div>
        </div>
        {editingSponsorId ? (
          <button
            onClick={handleUpdateSponsor}
            className='px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800'
          >
            Actualizar Auspiciador
          </button>
        ) : (
          <button
            onClick={handleAddSponsor}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800'
          >
            Agregar Auspiciador
          </button>
        )}
        {editingSponsorId && (
          <button
            onClick={() => {
              setEditingSponsorId(null);
              setNewSponsor({ id: '', nombre: '', logo: '', link: '' });
            }}
            className='ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-slate-800'
          >
            Cancelar Edición
          </button>
        )}
      </div>

      <div>
        <h3 className='text-xl font-semibold mb-4'>Lista de Auspiciadores</h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-700'>
            <thead className='bg-slate-700'>
              <tr>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Logo</th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Nombre</th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Link</th>
                <th scope='col' className='relative px-6 py-3'><span className='sr-only'>Acciones</span></th>
              </tr>
            </thead>
            <tbody className='bg-slate-800 divide-y divide-gray-700'>
              {(data.sponsors || []).map((sponsor) => (
                <tr key={sponsor.id} className='hover:bg-slate-700'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <img src={sponsor.logo} alt={sponsor.nombre} className='h-10 w-10 object-contain' />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>{sponsor.nombre}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                    <a href={sponsor.link} target='_blank' rel='noopener noreferrer' className='text-emerald-400 hover:text-emerald-300'>
                      {sponsor.link ? new URL(sponsor.link).hostname : 'N/A'}
                    </a>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <button
                      onClick={() => handleEditClick(sponsor)}
                      className='text-indigo-400 hover:text-indigo-300 mr-4'
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteSponsor(sponsor.id)}
                      className='text-red-400 hover:text-red-300'
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
