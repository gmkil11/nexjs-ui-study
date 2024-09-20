import Image from 'next/image'

export default function Home() {
  return (
    <main>
        <div className={"flex justify-between items-center mx-5 my-5"}>
          <span className={"text-xl font-bold"}>Acade.My</span>
          <div className={"rounded-full border border-gray-200 p-1"}>
            <img src={"vercel.svg"} alt="vercel" className={"w-10 h-10"}/>
          </div>
        </div>
        <div>
            <input />
        </div>
    </main>
  )
}
