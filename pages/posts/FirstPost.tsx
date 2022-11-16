import React from 'react'
import Link from "next/link"
import Head from 'next/head'
import Layout from '../../components/Layout'

const FirstPost = () => {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>FirstPost</h1>
    </Layout>
  )
}

export default FirstPost