import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [teams, setTeams] = useState([
    { name: 'Rufus',  points: 0 },
    { name: 'Dirus', points: 0 },
    { name: 'Arcadian',  points: 0 },
    { name: 'Timber',  points: 0 },
    { name: 'Sawtooth', points: 0 }
  ])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/teamscores')
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to fetch')

        setTeams([
          { name: 'Rufus', color: 'bg-red-500', points: data.students.rufus },
          { name: 'Dirus', points: data.students.dirus },
          { name: 'Arcadian',  points: data.students.arcadian },
          { name: 'Timber',  points: data.students.timber },
          { name: 'Sawtooth', points: data.students.sawtooth }
        ])
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  // Sort teams by points
  const sorted = [...teams].sort((a, b) => b.points - a.points)
  const maxPoints = sorted[0]?.points || 1

  // Winner always in the middle
  const winner = sorted[0]
  const rest = sorted.slice(1)
  const left = rest.filter((_, i) => i % 2 === 0)
  const right = rest.filter((_, i) => i % 2 === 1)
  const displayOrder = [...left.reverse(), winner, ...right]

  return (
     <>
       <Head>
        {/* Import a sporty Google Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </Head>

    <a href='/login' className='absolute top-3 right-3 underline text-gray-500'>admin</a>
    <div style={{fontFamily: "'Bebas Neue', sans-serif"}}  className="bg min-h-screen flex flex-col items-center justify-center from-gray-900 to-gray-800 text-white p-6">
                  <div className="text-3xl font-bold mb-10 grid grid-flow-col gap-5 items-center"> <img src='/logo-alpha.jpg'></img> X <img src='/logo-indus.png'></img></div>

             <h1
          className="text-9xl md:text-8xl mb-11 tracking-wider"
          style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#f57c21", letterSpacing: '0.1em' }}
        >
          SAVING LIVES
        </h1>

      <div className="w-full max-w-3xl">
        <div className="flex items-end justify-center space-x-6">
          {displayOrder.map(t => {
            const pct = Math.round((t.points / maxPoints) * 100)
            const isWinner = t.name === winner.name
            return (
         <>
              
              <div key={t.name} className="flex flex-col items-center">
                
                {isWinner && <div className="text-6xl mb-2 animate-bounce">👑</div>}
                <div className="w-30 h-80 relative  overflow-hidden flex items-end shadow-md">
                
                  <div
                    className={`${t.name} relative min-h-0.5 w-full transition-all duration-500 ease-out`}
                    style={{ height: `${pct}%` }}
                    title={`${t.points} pts (${pct}%)`}
                  />
                    <img style={{maxWidth:'120px', position: 'absolute', bottom: 10, left: 0}} src={`${t.name.toLowerCase()}.png`}></img>
                </div>
                <div className="mt-3 text-center">
                  <div className={` tracking-wider font-medium ${isWinner ? 'text-yellow-300' : ''}`}>
                    {t.name}
                  </div>
                  <div className="text-sm text-gray-300"><span className='text-3xl'>{t.points}</span> pts</div>
                </div>
              </div>
         </>
            )
          })}
        </div>
      </div>

      <p className="mt-10 text-gray-400 text-sm">Each donation = 1 point for the team 💉</p>
    </div>
     </>
  )
}
