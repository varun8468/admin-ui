import { Poppins } from "next/font/google";
import "../styles/globals.css"

const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }) {
  return <div className={`${poppins.variable} font-poppins`}>
    <Component {...pageProps} />
  </div>
}
