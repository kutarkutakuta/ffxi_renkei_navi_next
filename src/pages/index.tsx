import { Inter } from 'next/font/google'
import MyComponent from '@/components/MyContent'
import MyLayout from '@/components/MyLayout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <MyLayout>
      <MyComponent></MyComponent>
    </MyLayout>
  )
}
