import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type AllPostsData = {
    id:string,
    title:string,
    date:string
}

type GetPostData = {
    id:string
}

const postsDirectory = path.join(process.cwd(), 'posts');

const getSortedPostsData = () =>{
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData:AllPostsData[] = fileNames.map((fileName)=>{
    const id = fileName.replace(/\.md$/, '')
    const fullPath: string = path.join(postsDirectory, fileName)
    const fileContents: string = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const title = ""
    const date = ""
    return {
        id,
        title,
        date,
        ...matterResult.data,
    }
    })

    return allPostsData.sort(({date:a},{date:b})=>{ 
        if(a<b){
            return 1
        }else if (a>b){
            return -1
        }else{
            return 0
        }
    })
}

const getAllPostIds = () =>{
    const fileNames = fs.readdirSync(postsDirectory)
    
    return fileNames.map((fileName)=>{
        return {
            params:{
                id:fileName.replace(/\.md$/, '')
            }
        }
    })
}

const getPostData = async({id}:GetPostData) =>{
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export {getAllPostIds,getSortedPostsData,getPostData}
