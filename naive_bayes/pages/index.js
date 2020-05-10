import Layout from '../components/Layout';
import BlogPost  from "../components/BlogTemplate"
import fs from 'fs'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'


// export async function getStaticProps(){

// }
export async function getStaticProps() {
  const fileName = './posts/naive_bayes/naive_bayes.md'
  const fileContent = fs.readFileSync(fileName, 'utf8')
  const config = await import('../data/config.json')
  const data = matter(fileContent)
  // console.log(data)
  // console.log(fileContent)
  // console.log("inside static props?")



  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }

}


export default function Index(props) {

  return (
    <Layout>
      <br></br>
        <article>
        {/* <h1>{'Sample'}</h1> */}
        <div>
          <ReactMarkdown source={props.markdownBody} />
        </div>
      </article>

      <style jsx>{`
         h1,
         a {
           font-family: 'Arial';
         }
 
         ul {
           padding: 0;
         }
 
         li {
           list-style: none;
           margin: 5px 0;
         }
 
         a {
           text-decoration: none;
           color: blue;
         }
 
         a:hover {
           opacity: 0.6;
         }
       `}</style>
  

    </Layout>
  );
}