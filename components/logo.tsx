import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center text-xl font-bold tracking-tight ${className}`}>
      <Image src="/logo.png" alt="Cadeau Chrono" width={48} height={48} />
      <p className="ml-2 flex flex-col items-center">
        <span className="">Cadeau</span>
        <span className="">Chrono</span>
      </p>
    </Link>
  )
}
