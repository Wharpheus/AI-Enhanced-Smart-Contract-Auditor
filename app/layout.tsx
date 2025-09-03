// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import FloatingParticles from '@/components/FloatingParticles'
import DashboardPanel from '@/components/DashboardPanel' // 🧩 Injected
import { AuditProvider } from '@/contexts/AuditContext'   // 🧠 Context wrapper

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Smart Contract Auditor',
  description: 'Scroll-backed audit cockpit powered by GPT-4, Slither, and Flowomatic',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuditProvider>
          <Header />
          <FloatingParticles />
          <main className="flex flex-col md:flex-row min-h-screen">
            <section className="w-full md:w-2/3 p-4">{children}</section>
            <aside className="w-full md:w-1/3 p-4 bg-zinc-950 text-white border-l border-zinc-800">
              <DashboardPanel /> {/* 🧠 Runtime cockpit */}
            </aside>
          </main>
        </AuditProvider>
      </body>
    </html>
  )
}
