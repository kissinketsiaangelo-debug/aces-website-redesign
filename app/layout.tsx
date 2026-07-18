import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Space_Grotesk } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { MarketplaceProvider } from '@/lib/marketplace-context'
import { RegistrationProvider } from '@/lib/registration-context'
import { RecentlyViewedProvider } from '@/lib/recently-viewed-context'
import { WishlistProvider } from '@/lib/wishlist-context'
import { SearchProvider } from '@/lib/search-context'
import { NotificationProvider } from '@/lib/notification-context'
import { AcesAuthProvider } from '@/lib/aces-auth-context'
import { ThemeProvider } from '@/components/theme-provider'
import { SearchOverlay } from '@/components/search-overlay'
import { ServiceWorkerRegister } from '@/components/service-worker-register'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'ACES KNUST — Association of Computer Engineering Students',
  description:
    'Mobile-first redesign of the ACES KNUST website. Courses, scholarships, shop, events and community for Computer Engineering students.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0B5FFF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${dmSans.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <AcesAuthProvider>
          <NotificationProvider>
            <CartProvider>
              <MarketplaceProvider>
                <RecentlyViewedProvider>
                  <RegistrationProvider>
                    <WishlistProvider>
                      <SearchProvider>
                        {children}
                        <SearchOverlay />
                      </SearchProvider>
                    </WishlistProvider>
                  </RegistrationProvider>
                </RecentlyViewedProvider>
              </MarketplaceProvider>
            </CartProvider>
          </NotificationProvider>
          </AcesAuthProvider>
          <ServiceWorkerRegister />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
