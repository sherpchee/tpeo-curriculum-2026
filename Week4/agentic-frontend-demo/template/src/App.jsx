import PageLayout from './layouts/PageLayout'

/**
 * Landing page shell. Section components are added during the workshop.
 * Expected order: Navbar → Hero → FeatureCards
 */
export default function App() {
  return (
    <PageLayout>
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
          TPEO Agentic Frontend Demo
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Starter template — agents build from here
        </h1>
        <p className="max-w-md text-slate-600">
          Read AGENTS.md, generate the design system, then implement sections in parallel.
        </p>
      </div>
    </PageLayout>
  )
}
