import Layout from '@/components/Layout'
import ModalLogin from '@/modals/ModalLogin'
import ModalRegister from '@/modals/ModalRegister'
import EditModal from '@/modals/EditModal'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}  >
      <Toaster />
      <ModalRegister />
      <ModalLogin />
      <EditModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
