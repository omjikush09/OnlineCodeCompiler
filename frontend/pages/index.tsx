import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import EditorArea from '../component/Editor'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      {/* <textarea className={styles.code}  name="code" id="code" /> */}
      <EditorArea  prop={styles.code} />
    </div>
  )
}

export default Home
