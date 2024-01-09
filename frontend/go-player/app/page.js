import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <h1>Go Player</h1>
      <Image src="/public/go-player.png" width={200} height={200} />
    </div>
  )
    
}
