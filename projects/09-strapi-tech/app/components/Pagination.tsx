import { Link, useLocation, useSearchParams } from '@remix-run/react'
import clsx from 'clsx'

import Icon from './Icon'
import { generatePagination } from '~/utils/pagination'

interface Props {
  totalPages: number
  currentPage: number
}

type Position = 'first' | 'last' | 'single' | 'middle' | undefined

export default function Pagination({ totalPages, currentPage }: Props) {
  console.log(currentPage)
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const allPages = generatePagination(currentPage, totalPages)
  console.log(allPages)

  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className='inline-flex justify-center w-full my-8'>
      <PaginationArrow
        direction='left'
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className='flex -space-x-px'>
        {allPages.map((page, index) => {
          let position: Position = undefined

          if (index === 0) position = 'first'
          if (index === allPages.length - 1) position = 'last'
          if (allPages.length === 1) position = 'single'
          if (page === '...') position = 'middle'

          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          )
        })}
      </div>

      <PaginationArrow
        direction='right'
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  )
}

interface PropsPaginationNumber {
  page: number | string
  href: string
  position?: 'first' | 'last' | 'middle' | 'single'
  isActive: boolean
}

function PaginationNumber({ page, href, isActive, position }: PropsPaginationNumber) {
  const className = clsx(
    'flex size-12 items-center justify-center text-base font-medium border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-teal-600 border-teal-600 text-white': isActive,
      'hover:bg-teal-600': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  )

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link to={href} className={className}>
      {page}
    </Link>
  )
}

interface PropsPaginationArrow {
  href: string
  direction: 'left' | 'right'
  isDisabled?: boolean
}

function PaginationArrow({ href, direction, isDisabled }: PropsPaginationArrow) {
  const className = clsx(
    'flex size-12 items-center justify-center rounded border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-teal-600 hover:text-white transition': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  )

  const icon =
    direction === 'left' ? (
      <Icon.ArrowLeft className='w-6' />
    ) : (
      <Icon.ArrowRight className='w-6' />
    )

  return isDisabled ? (
    <div className={className}>
      {icon}
    </div>
  ) : (
    <Link className={className} to={href}>
      {icon}
    </Link>
  )
}
