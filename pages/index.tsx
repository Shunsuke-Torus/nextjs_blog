import Head from 'next/head'
import utilStyles from "./../styles/utils.module.css"
import {Layout,siteTitle} from '../components/Layout'
import {getSortedPostsData,AllPostsData} from "./../lib/Post"
import Date from "./../components/date"
import Link from "next/link"

type HomeProps = {
  allPostsData: AllPostsData[]
}

const getStaticProps = async() =>{
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
export {getStaticProps}


const Home:React.FC<HomeProps>= ({allPostsData})=> {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h3>Hello World Next.js</h3> 
        <p>
          最近学び初めたShunと申します｡<br/>
          初心者なので分からないことが多いですが頑張ります!
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default Home
