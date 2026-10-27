/**
 * Page-level shell: max-width, horizontal padding, main landmark.
 * Sections (Navbar, Hero, etc.) render as children.
 */
export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
