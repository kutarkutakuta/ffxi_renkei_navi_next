import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import MyComponent from '@/components/myComponent'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <MyComponent message='ああああ' ></MyComponent>
    </>
  )
}
