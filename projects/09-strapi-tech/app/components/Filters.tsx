import { Form } from '@remix-run/react'

export default function Filters() {
  return (
    <Form method='GET' className='w-full flex justify-start items-center gap-6 my-4'>
      <div className='flex gap-x-2 items-center'>
        <label htmlFor='sort' className='text-sm font-semibold'>
          Ordenar
        </label>

        <select id='sort' name='sort' className='bg-gray-900 py-1 px-2 border border-gray-300 rounded-md'>
          <option value='default'>-- Seleccione --</option>
          <option value='a-z'>Orden alfabético de A - Z</option>
          <option value='z-a'>Orden alfabético de Z - A</option>
        </select>
      </div>
      
      <div className='flex gap-x-2 items-center'>
        <label htmlFor='show' className='text-sm font-semibold'>
          Mostrar
        </label>

        <select id='show' name='show' className='bg-gray-900 py-1 px-2 border border-gray-300 rounded-md'>
          <option value='default'>-- Seleccione --</option>
          <option value='all'>Mostrar todos</option>
          <option value='live'>Mostrar publicados</option>
          <option value='preview'>Mostrar pendientes</option>
        </select>
      </div>

      <button type='submit' className='py-1 px-4 border border-gray-300 font-bold rounded-md hover:bg-transparent/25 transition hover:border-gray-600'>
        Aplicar filtros
      </button>
    </Form>
  )
}
