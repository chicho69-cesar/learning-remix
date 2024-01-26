import Navbar from './Navbar'
import ShoppingCartModal from './ShoppingCartModal'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>{children}</main>
      <ShoppingCartModal />
    </>
  )
}
