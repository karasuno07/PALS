import { Inter, Rubik } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
})

const inter = Inter({ subsets: ["latin"] });

export const fonts = {
  inter,
  rubik,
}