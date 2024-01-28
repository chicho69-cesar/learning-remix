interface Props extends React.SVGAttributes<SVGElement> {}

export default function Icon({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}

Icon.ArrowLeft = ({ ...props }: Props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='currentColor'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none'/>
    <path d='M15 6l-6 6l6 6' />
  </svg>
)

Icon.ArrowRight = ({ ...props }: Props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='currentColor'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none'/>
    <path d='M9 6l6 6l-6 6' />
  </svg>
)
