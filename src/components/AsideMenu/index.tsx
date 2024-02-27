import Link from 'next/link'

export function AsideMenu() {
  return (
    <aside className="hidden h-full w-52 border-r-2 border-r-slate-900 p-5 md:flex flex-col space-y-4">
      <span className="font-bold text-2xl text-blue-800">HW CARTS</span>

      <ul className="text-base font-medium text-slate-300">
        <Link href="/home">
          <li className="hover:bg-slate-900 transition-all duration-300 rounded-md p-2 hover:cursor-pointer">
            Home
          </li>
        </Link>
        <Link href="/collection">
          <li className="hover:bg-slate-900 transition-all duration-300 rounded-md p-2 hover:cursor-pointer">
            Coleção
          </li>
        </Link>
      </ul>
    </aside>
  )
}
