import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import { useUser } from '../src/lib/hooks'
import { ToastContainer } from 'react-toastify'
import { ModalContextProvider } from '../src/context/ModalContext'
import { Layout } from '../src/components/Layout/layout'
import { MovieBookingContextProvider } from '../src/context/MovieBookingContext'

export default function App ({ Component, pageProps }) {
  const user = useUser()
  return (
    <MovieBookingContextProvider>
      <ModalContextProvider>
        <Layout>
          <Component {...pageProps} user={user} />
          <ToastContainer />
        </Layout>
      </ModalContextProvider>
    </MovieBookingContextProvider>
  )
}
