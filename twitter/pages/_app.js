import Layout from '@/components/Layout'
import ModalLogin from '@/modals/ModalLogin'
import ModalRegister from '@/modals/ModalRegister'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <>
    <ModalRegister />
    <ModalLogin />
    <Layout>
      <Component {...pageProps} />
    </Layout>

  </>
}
