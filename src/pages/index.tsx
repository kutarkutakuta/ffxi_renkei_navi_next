import { Inter } from 'next/font/google'
import MyComponent from '@/components/MyContent'
import BaseLayout from '@/components/BaseLayout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <BaseLayout>
      <MyComponent></MyComponent>
    </BaseLayout>
  )
}
