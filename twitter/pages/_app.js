import Layout from '@/components/Layout'
import ModalLogin from '@/modals/ModalLogin'
import ModalRegister from '@/modals/ModalRegister'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}  >
      <Toaster />
      <ModalRegister />
      <ModalLogin />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
