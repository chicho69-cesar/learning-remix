import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Loading() {
  return (
    <div className='w-full h-24 flex items-center justify-center'>
      <AiOutlineLoading3Quarters className='animate-spin size-7' />
    </div>
  )
}
