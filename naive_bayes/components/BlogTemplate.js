import fs from 'fs'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'





export  async function getServerSideProps() {
    // const { slug } = ctx.params
    const fileName = '../posts/naive_bayes/naive_bayes.md'
    const fileContent = fs.readFileSync(fileName, 'utf8')
    const config = await import('../data/config.json')
    const data = matter(fileContent)
    console.log(data)
    console.log(content)
    console.log("inside static props?")
    debugger;


  
    return {
      props: {
        siteTitle: config.title,
        frontmatter: data.data,
        markdownBody: data.content,
      },
    }
  }


  export default function BlogPost(props){
    console.log(props)
    console.log(props.siteTitle)
    return(
        <article>
        {/* <h1>{'Sample'}</h1> */}
        <div>
          <ReactMarkdown source={props.markdownBody} />
        </div>
      </article>
    )
}


// export async function getStaticPaths() {
//   //get all .md files in the posts dir
//   const blogs = glob.sync('posts/**/*.md')

//   //remove path and extension to leave filename only
//   const blogSlugs = blogs.map(file =>
//     file
//       .split('/')[1]
//       .replace(/ /g, '-')
//       .slice(0, -3)
//       .trim()
//   )

//   // create paths with `slug` param
//   const paths = blogSlugs.map(slug => `/blog/${slug}`)

//   return {
//     paths,
//     fallback: false,
//   }
// }

