import Link from "next/link";
import Image from "next/image";
import MobileLogo from '@/public/airbnb-mobile.webp'
import DesktopLogo from '@/public/airbnb-desktop.png'
import { UserNav } from "./UserNav";
export function NavBar() {
  return (
    <div className=" w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href='/'>
            <Image src={DesktopLogo} alt="Airbnb" className="w-32 hidden lg:block" />
            <Image src={MobileLogo} alt="Airbnb" className=" block lg:hidden w-12"/>
        </Link>
        <div className=" rounded-full border px-5 py-2">
          <h1>搜索</h1>
        </div>
        <UserNav/>
      </div>
    </div>
  )
}