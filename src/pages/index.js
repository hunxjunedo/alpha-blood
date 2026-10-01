import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Alpha Blood 2026</title>
        <meta name="description" content="Alpha Blood 2026 team leaderboard" />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-950 px-6 text-center text-white">
        <h1 className="text-5xl font-bold text-orange-400">Alpha Blood 2026</h1>
        <p className="text-gray-300">Track the current team standings.</p>
        <div className="flex gap-4">
          <Link href="/leaderboard" className="rounded bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-400">View leaderboard</Link>
          <Link href="/login" className="rounded border border-gray-600 px-5 py-3 text-gray-200 hover:border-gray-400">Admin</Link>
        </div>
      </main>
    </>
  )
}
