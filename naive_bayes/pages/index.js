import Layout from '../components/Layout';
import BlogPost  from "../components/BlogTemplate"
import fs from 'fs'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown/with-html'
import InteractiveBayes from '../components/InteractiveBayes/InteractiveBayes'
import {GetTrainingData, GetTestingData} from '../components/InteractiveBayes/InteractiveBayes'
import Acknoledgements from '../components/Acknowledgements'

// export async function getStaticProps(){

// }
export async function getStaticProps() {
  const fileName = './posts/naive_bayes/naive_bayes.md'
  const fileContent = fs.readFileSync(fileName, 'utf8')
  const config = await import('../data/config.json')
  const data = matter(fileContent)

  const training_data = GetTrainingData()
  const testing_data = GetTestingData()


  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
      training_data: training_data,
      testing_data: testing_data
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
          <ReactMarkdown source={props.markdownBody} escapeHtml={false} />
        </div>
      </article>

      <InteractiveBayes data = {props.training_data} testing = {props.testing_data}/>

      <Acknoledgements/ >

      

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