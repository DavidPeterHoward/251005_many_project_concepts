import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import { APPS } from './apps/index'
import '../src/index.css'

function Home() {
  const [query, setQuery] = React.useState('')

  // Priority: ensure EM (Bra) project first
  const prioritized = React.useMemo(() => {
    const list = [...APPS]
    list.sort((a, b) => {
      const aIsBra = /electromagnetic|radiation|em-advanced/i.test(a.title + ' ' + a.id + ' ' + a.path)
      const bIsBra = /electromagnetic|radiation|em-advanced/i.test(b.title + ' ' + b.id + ' ' + b.path)
      if (aIsBra && !bIsBra) return -1
      if (!aIsBra && bIsBra) return 1
      return a.title.localeCompare(b.title)
    })
    return list
  }, [])

  const filtered = React.useMemo(() => {
    if (!query) return prioritized
    const q = query.toLowerCase()
    return prioritized.filter(a =>
      a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.id.toLowerCase().includes(q)
    )
  }, [query, prioritized])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Many Project Concepts</h1>
            <p className="text-slate-600">Interactive prototypes catalog (React + HTML)</p>
          </div>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="pl-10 pr-3 py-2 w-72 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-sm"
            />
            <span className="absolute left-3 top-2.5 text-slate-400">🔎</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(app => (
            <div key={app.id} className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
              {/* Preview area */}
              <div className="aspect-video bg-slate-50 border-b border-slate-200 overflow-hidden">
                {app.type === 'react' ? (
                  <iframe title={`preview-${app.id}`} src={app.path} className="w-full h-full scale-100 origin-top-left" />
                ) : (
                  <iframe title={`preview-${app.id}`} src={app.path} className="w-full h-full" />
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">{app.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${app.type === 'react' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 'text-indigo-700 border-indigo-200 bg-indigo-50'}`}>{app.type.toUpperCase()}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{app.description}</p>
                  </div>
                  {app.type === 'react' ? (
                    <Link className="text-indigo-600 text-sm font-medium hover:underline mt-0.5" to={app.path}>Open →</Link>
                  ) : (
                    <a className="text-indigo-600 text-sm font-medium hover:underline mt-0.5" href={app.path} target="_blank" rel="noreferrer">Open ↗</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const routes = [
  { path: '/', element: <Home /> },
  ...APPS.filter(a => a.type === 'react').map(a => ({ path: a.path, element: React.createElement(a.component!) }))
]

const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


