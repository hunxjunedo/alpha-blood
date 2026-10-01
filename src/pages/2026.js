
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Credit from './credit'

const TEAM_COLORS = {
  Rufus: '#d92b2b',
  Dirus: '#d92b2b',
  Arcadian: '#d92b2b',
  Timber: '#d92b2b',
  Sawtooth: '#d92b2b',
}

export default function Leaderboard2026() {
  const [teams, setTeams] = useState([
    { name: 'Rufus', points: 0 },
    { name: 'Dirus', points: 0 },
    { name: 'Arcadian', points: 0 },
    { name: 'Timber', points: 0 },
    { name: 'Sawtooth', points: 0 },
  ])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/teamscores?year=2026')
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data?.message || 'Failed to fetch')
        }

        setTeams([
          { name: 'Rufus', points: data.students.rufus },
          { name: 'Dirus', points: data.students.dirus },
          { name: 'Arcadian', points: data.students.arcadian },
          { name: 'Timber', points: data.students.timber },
          { name: 'Sawtooth', points: data.students.sawtooth },
        ])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const sorted = [...teams].sort((a, b) => b.points - a.points)

  const maxPoints = Math.max(sorted[0]?.points || 0, 1)

  // Every team sharing the highest score is a leader.
  const leaders = sorted.filter(
    (team) => team.points === sorted[0]?.points
  )

  const hasTie = leaders.length > 1

  // Preserve the original "winner in the middle" composition.
  const rest = sorted.filter(
    (team) => !team.name || true
  )

  const left = sorted
    .slice(1)
    .filter((_, i) => i % 2 === 0)

  const right = sorted
    .slice(1)
    .filter((_, i) => i % 2 === 1)

  const displayOrder = [
    ...left.reverse(),
    sorted[0],
    ...right,
  ]

  if (loading) {
    return (
      <>
        <Head>
          <title>Saving Lives — Blood Donation Leaderboard 2026</title>

          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <style>{`
            * {
              box-sizing: border-box;
            }

            html,
            body {
              margin: 0;
              padding: 0;
              background: #090909;
            }

            @keyframes loadingPulse {
              0%, 100% {
                opacity: .25;
              }
              50% {
                opacity: .8;
              }
            }
          `}</style>
        </Head>

       

        <main
          className="min-h-screen flex items-center justify-center text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            background: '#090909',
          }}
        >
          <div className="text-center">

            <div
              className="text-6xl md:text-8xl tracking-wide"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              SAVING LIVES
            </div>

            <div
              className="mt-5 text-[10px] tracking-[0.4em] text-red-500 uppercase"
              style={{
                animation: 'loadingPulse 1.5s ease-in-out infinite',
              }}
            >
              Loading leaderboard
            </div>

          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Saving Lives — Blood Donation Leaderboard 2026</title>

        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <style>{`
          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;
            background: #090909;
          }

          @keyframes grow {
            from {
              transform: scaleY(0);
              transform-origin: bottom;
            }
            to {
              transform: scaleY(1);
              transform-origin: bottom;
            }
          }

          @keyframes winnerPulse {
            0%, 100% {
              opacity: .45;
            }
            50% {
              opacity: .8;
            }
          }
        `}</style>
      </Head>



      <a
        href="/login2026"
        className="
          fixed top-4 right-5 z-50 underline
          text-[10px] tracking-[0.25em]
          text-white/30 hover:text-white
          transition-colors
        "
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        ADMIN
      </a>

      <main
        className="min-h-screen overflow-hidden text-white"
        style={{
          fontFamily: "'Inter', sans-serif",
          background: `
            radial-gradient(
              ellipse at 50% 45%,
              rgba(190, 20, 20, 0.08),
              transparent 45%
            ),
            #090909
          `,
        }}
      >

        <div
          className="
            pointer-events-none
            fixed inset-0
            flex items-center justify-center
            overflow-hidden
            select-none
          "
        >
          <div
            className="
              whitespace-nowrap
              text-[28vw]
              leading-none
              text-white/[0.018]
            "
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            DONATE
          </div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center px-5 py-8 md:py-12">

          {/* HEADER */}

          <header className="w-full max-w-6xl">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <img
                  src="/logo-alpha.jpg"
                  alt="Alpha logo"
                  className="w-11 h-11 md:w-14 md:h-14 object-contain"
                />

                <div className="w-px h-8 bg-white/20" />

                <img
                  src="/logo-indus.png"
                  alt="Indus logo"
                  className="w-11 h-11 md:w-14 md:h-14 object-contain"
                />

              </div>

              <div className="text-right">

                <div className="text-[9px] md:text-[10px] tracking-[0.3em] text-white/35">
                  BLOOD DONATION
                </div>

                <div
                  className="text-2xl md:text-3xl leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  2026
                </div>

              </div>

            </div>

            <div className="mt-10 md:mt-14">

              <div
                className="
                  text-xs md:text-sm
                  tracking-[0.45em]
                  text-red-500
                  mb-1
                "
              >
                SAVING LIVES
              </div>

              <div className="flex items-end justify-between gap-5">

                <h1
                  className="
                    text-[16vw]
                    md:text-[11rem]
                    lg:text-[13rem]
                    leading-[0.72]
                    tracking-tight
                  "
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                  }}
                >
                  LEADER
                </h1>

                <div
                  className="
                    hidden md:block
                    text-right
                    pb-2
                    text-[10px]
                    leading-relaxed
                    tracking-[0.15em]
                    text-white/30
                    uppercase
                  "
                >
                  Every donation<br />
                  counts toward<br />
                  your team.
                </div>

              </div>

              <div className="h-px bg-white/15 mt-5" />

            </div>

          </header>


          {/* LEADERBOARD */}

          <section className="w-full max-w-6xl mt-12 md:mt-16">

            <div
              className="
                relative
                flex
                items-end
                justify-center
                gap-2
                md:gap-5
                lg:gap-7
              "
              style={{
                minHeight: 'clamp(360px, 52vh, 560px)',
              }}
            >

              {displayOrder.map((team) => {

                const isLeader = team.points === sorted[0]?.points

                const rank =
                  sorted.findIndex(
                    (item) => item.name === team.name
                  ) + 1

                const columnHeight = isLeader
                  ? 100
                  : Math.max(
                      18,
                      (team.points / maxPoints) * 78
                    )

                return (
                  <div
                    key={team.name}
                    className="
                      h-full
                      flex
                      flex-1
                      max-w-[150px]
                      flex-col
                      justify-end
                      items-center
                    "
                  >

                    {/* Rank */}

                    <div
                      className={`
                        mb-2
                        text-[10px] md:text-xs
                        tracking-[0.2em]
                        ${
                          isLeader
                            ? 'text-red-500'
                            : 'text-white/25'
                        }
                      `}
                    >
                      {hasTie && isLeader
                        ? 'T-01'
                        : String(rank).padStart(2, '0')}
                    </div>


                    {/* Column */}

                    <div
                      className="
                        relative
                        w-full
                        flex
                        items-end
                        justify-center
                      "
                      style={{
                        height: `${columnHeight}%`,
                        minHeight: isLeader ? 250 : 110,
                      }}
                    >

                      <div
                        className="
                          absolute
                          inset-0
                          border
                          border-white/[0.07]
                        "
                      />

                      <div
                        className="
                          absolute
                          bottom-0
                          left-0
                          right-0
                        "
                        style={{
                          height: '100%',
                          background: isLeader
                            ? 'linear-gradient(to top, #b71919, #e03232)'
                            : 'linear-gradient(to top, #741515, #b52323)',
                          animation: 'grow .8s ease-out both',
                        }}
                      />

                      <div
                        className="
                          absolute
                          left-3
                          right-3
                          top-3
                          bottom-3
                          border
                          border-white/[0.08]
                          pointer-events-none
                        "
                      />

                      {isLeader && (
                        <div
                          className="
                            absolute
                            left-0
                            right-0
                            top-0
                            h-px
                            bg-red-400
                          "
                          style={{
                            boxShadow:
                              '0 0 25px rgba(255,50,50,.8)',
                            animation:
                              'winnerPulse 2s infinite',
                          }}
                        />
                      )}

                      <img
                        src={`/${team.name.toLowerCase()}.png`}
                        alt={`${team.name} team`}
                        className="
                          absolute
                          z-10
                          object-contain
                          max-w-[78%]
                          max-h-[42%]
                        "
                        style={{
                          bottom: isLeader ? '26%' : '20%',
                          filter:
                            'drop-shadow(0 5px 10px rgba(0,0,0,.45))',
                        }}
                      />

                      <div
                        className="
                          absolute
                          z-20
                          bottom-3
                          left-0
                          right-0
                          text-center
                        "
                      >
                        <span
                          className={`
                            ${
                              isLeader
                                ? 'text-4xl md:text-5xl'
                                : 'text-2xl md:text-3xl'
                            }
                            text-white
                          `}
                          style={{
                            fontFamily:
                              "'Bebas Neue', sans-serif",
                          }}
                        >
                          {team.points}
                        </span>
                      </div>

                    </div>


                    {/* Team name */}

                    <div
                      className={`
                        mt-4
                        text-center
                        whitespace-nowrap
                        ${
                          isLeader
                            ? 'text-red-400'
                            : 'text-white/70'
                        }
                      `}
                    >

                      <div
                        className="
                          text-lg md:text-xl
                          tracking-wider
                        "
                        style={{
                          fontFamily:
                            "'Bebas Neue', sans-serif",
                        }}
                      >
                        {team.name}
                      </div>

                      <div
                        className="
                          mt-0.5
                          text-[8px]
                          tracking-[0.2em]
                          text-white/25
                        "
                      >
                        {isLeader
                          ? hasTie
                            ? 'TIED LEAD'
                            : 'LEADING'
                          : `RANK ${rank}`}
                      </div>

                    </div>

                  </div>
                )
              })}

            </div>


            {/* Baseline */}

            <div className="w-full h-px bg-white/20 mt-6" />

            <div className="flex justify-between mt-3 text-[9px] tracking-[0.25em] text-white/20">
              <span>TEAM STANDINGS</span>
              <span>1 DONATION = 1 POINT</span>
            </div>

          </section>


          {/* FOOTER */}

          <div className="mt-auto pt-12 text-center">

            <div
              className="
                text-[9px]
                tracking-[0.35em]
                uppercase
                text-white/20
              "
            >
              Give blood. Save lives.
            </div>
                        <div
              className="
                text-[9px]
                tracking-[0.35em]
                uppercase
                text-white/20 underline
              "
            >
              <a href='https://www.github.com/hunxjunedo'>Hunain Ahmed</a>
            </div>

          </div>

        </div>
      </main>
    </>
  )
}
