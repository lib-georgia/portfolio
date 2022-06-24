import '../styles/globals.css'
import { useRouter } from 'next/router';
import {HeadSettings} from '../components'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <HeadSettings router={router} />
      <Component {...pageProps} />
      </>
  )
}
export default MyApp
