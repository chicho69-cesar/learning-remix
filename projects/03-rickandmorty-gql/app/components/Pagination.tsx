import { Link, useLocation, useSearchParams } from '@remix-run/react'
import clsx from 'clsx'

import Icon from './Icon'
import { generatePagination } from '~/lib/pagination'

interface Props {
  totalPages: number
  currentPage: number
}

type Position = 'first' | 'last' | 'single' | 'middle' | undefined

export default function Pagination({ totalPages, currentPage }: Props) {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const allPages = generatePagination(currentPage, totalPages)

  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className='inline-flex'>
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

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string
  href: string
  position?: 'first' | 'last' | 'middle' | 'single'
  isActive: boolean
}) {
  const className = clsx(
    'flex size-12 items-center justify-center text-base font-medium border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-red-600 border-red-600 text-white': isActive,
      'hover:bg-red-300': !isActive && position !== 'middle',
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

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string
  direction: 'left' | 'right'
  isDisabled?: boolean
}) {
  const className = clsx(
    'flex size-12 items-center justify-center rounded border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-red-500 hover:text-white transition': !isDisabled,
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
