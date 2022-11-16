import { getAllPostIds,getPostData } from "./../../lib/Post"
import {Layout} from "./../../components/Layout"
import Head from "next/head"
import Date from "./../../components/date"
import utilStyles from "../../styles/utils.module.css"


type Props = {
  postData:{
    id:string,
    title:string,
    date:string,
    contentHtml:string
  }
}

type GetStaticProps = {
  params: {
      id: string,
      contentHtml:string
  }
}

export default function Post({ postData }:Props) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
      <h1 className={utilStyles.headingXl} >{postData.title}</h1>
      <div className={utilStyles.lightText} >
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

// (parameter) params: {
//   id: string;
//   contentHtml: string;
// }

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
      paths,
      fallback: false
  }
}