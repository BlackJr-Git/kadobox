import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  className?: string
  imageClassName?: string
}

export default function Logo({ className, imageClassName }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center text-xl font-bold tracking-tight ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Cadeau Chrono"
        width={48}
        height={48}
        className={imageClassName}
      />
      <p className="ml-2 flex flex-col items-center leading-none">
        <span>Cadeau</span>
        <span className="text-primary">Chrono</span>
      </p>
    </Link>
  )
}
