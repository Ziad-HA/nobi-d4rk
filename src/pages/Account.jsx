import { useState } from 'react'

export default function Account() {
  const [mode, setMode] = useState('signin')
  const [done, setDone] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@') || password.length < 6) {
      setError('Use a valid email and a password of at least 6 characters.')
      return
    }
    setError('')
    setDone(true)
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-5xl tracking-wide">Welcome in</h1>
        <p className="mt-4 text-sm text-neutral-600">
          Demo account session for {email}. Nothing is stored on a server.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-5xl tracking-wide">{mode === 'signin' ? 'Sign in' : 'Create account'}</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
        {error && (
          <p role="alert" className="border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-11 w-full border border-neutral-300 px-3"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 h-11 w-full border border-neutral-300 px-3"
          />
        </div>
        <button type="submit" className="w-full bg-black py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>
      </form>
      <button
        type="button"
        className="mt-6 text-sm underline"
        onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
      >
        {mode === 'signin' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
      </button>
    </div>
  )
}
