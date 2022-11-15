import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

import React from 'react'

const Post = ({postData}) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
      <Date dateString={postData.date} />
        <h1 className={utilStyles.headingXl}>
          {postData.title}
        </h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html:postData.contentHtml}} />
      </article>
    </Layout>
  )
}

const getStaticPaths = async() => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

const getStaticProps = async({ params }) => {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default Post
export {getStaticPaths,getStaticProps}

