'use client'
import { useEffect, useState } from 'react'

type Reservation = {
  area: string
  date: string
  time: string
  notes: string
}

const AREAS = ['Laundry Room', 'Gym', 'Office']

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [reservations, setReservations] = useState<Reservation[]>([])

  const [area, setArea] = useState('Laundry Room')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('reservations')
    if (saved) {
      setReservations(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations))
  }, [reservations])

  const handleSave = () => {
    if (!area || !date || !time) return

    const newReservation: Reservation = {
      area,
      date,
      time,
      notes,
    }

    setReservations([newReservation, ...reservations])

    setArea('Laundry Room')
    setDate('')
    setTime('')
    setNotes('')
    setShowForm(false)
  }

  const handleDelete = (indexToDelete: number) => {
    const updated = reservations.filter((_, index) => index !== indexToDelete)
    setReservations(updated)
  }

  const weeklyCount = reservations.length
  const dailyCount = reservations.filter((r) => r.date === date).length

  return (
    <main className="min-h-screen bg-[#05070b] text-white px-6 py-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.28em] text-sky-300/70">
              STUDIO55 APP
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Reservations Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-400 md:text-base">
              Manage amenity bookings with a cleaner, more professional workflow.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.01] hover:bg-zinc-200"
          >
            {showForm ? 'Close Form' : 'New Reservation'}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <section className="rounded-3xl border border-white/10 bg-[#081735] p-5 shadow-2xl shadow-black/30 md:p-7">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-semibold">Reserve a Space</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Select an area, date, and time for your booking.
                </p>
              </div>
            </div>

            {showForm ? (
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">Area</label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#05070b] px-4 py-3 text-white outline-none transition focus:border-sky-400"
                    >
                      {AREAS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#05070b] px-4 py-3 text-white outline-none transition focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">Time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#05070b] px-4 py-3 text-white outline-none transition focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">Quick Status</label>
                    <div className="flex h-[50px] items-center rounded-xl border border-white/10 bg-[#05070b] px-4 text-sm text-zinc-400">
                      {area} selected
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional notes..."
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-[#05070b] px-4 py-3 text-white outline-none transition focus:border-sky-400"
                  />
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] hover:bg-emerald-300"
                  >
                    Save Reservation
                  </button>

                  <button
                    onClick={() => setShowForm(false)}
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-5 py-8 text-center text-zinc-400">
                Click <span className="font-medium text-white">New Reservation</span> to create a booking.
              </div>
            )}
          </section>

          <aside className="rounded-3xl border border-white/10 bg-[#0b0f17] p-5 shadow-2xl shadow-black/30 md:p-7">
            <h3 className="text-xl font-semibold">Reservation Rules</h3>
            <p className="mt-2 text-sm text-zinc-400">
              This side panel makes the app feel more operational and polished.
            </p>

            <div className="mt-6 space-y-4">
              <RuleItem
                label="Available Areas"
                value={`${AREAS.length} active`}
                ok
              />
              <RuleItem
                label="Saved Reservations"
                value={`${weeklyCount}`}
                ok
              />
              <RuleItem
                label="Selected Date Count"
                value={`${date ? dailyCount : 0}`}
                ok
              />
              <RuleItem
                label="System Status"
                value="Ready"
                ok
              />
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-zinc-300">
                Current selection:
              </p>
              <div className="mt-3 space-y-2 text-sm text-zinc-400">
                <p>
                  <span className="text-white">Area:</span> {area || '-'}
                </p>
                <p>
                  <span className="text-white">Date:</span> {date || '-'}
                </p>
                <p>
                  <span className="text-white">Time:</span> {time || '-'}
                </p>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-[#0a0d14] p-5 shadow-2xl shadow-black/30 md:p-7">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">My Reservations</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Saved bookings remain after refresh.
              </p>
            </div>
          </div>

          {reservations.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-8 text-center text-zinc-500">
              No reservations yet.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {reservations.map((r, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-black/60 p-5 transition hover:border-sky-400/40 hover:bg-black/80"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-sky-300/70">
                        {r.area}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {r.date}
                      </h3>
                    </div>

                    <button
                      onClick={() => handleDelete(index)}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300 transition hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="space-y-2 text-sm text-zinc-400">
                    <p>
                      <span className="text-white">Time:</span> {r.time}
                    </p>
                    <p>
                      <span className="text-white">Notes:</span>{' '}
                      {r.notes ? r.notes : 'No notes'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function RuleItem({
  label,
  value,
  ok = false,
}: {
  label: string
  value: string
  ok?: boolean
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div
        className={`mt-0.5 h-2.5 w-2.5 rounded-full ${
          ok ? 'bg-emerald-400' : 'bg-zinc-500'
        }`}
      />
      <div>
        <p className="text-sm text-zinc-300">{label}</p>
        <p className="mt-1 text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  )
}