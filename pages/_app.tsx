// Import styles from styles/globals.css
import '../styles/globals.css'

// Import the AppProps type from the next/app package
import type { AppProps } from 'next/app'

// Create a function to export as the default export
export default function App({ Component, pageProps }: AppProps) {
  // Passing props to the component
  return <Component {...pageProps} />
}
