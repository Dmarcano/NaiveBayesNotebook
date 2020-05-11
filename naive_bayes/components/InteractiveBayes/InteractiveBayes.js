import NaiveBayes from '../naive_bayes'
import fs from 'fs'
import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import WordHistogram from './WordHistogram'


export function GetTrainingData(){
    const dataPath = "data/restaurant_reviews.csv";
    const contents = fs.readFileSync(dataPath, "utf8");
    return contents
}



export default function InteractiveBayes(props){
    const naive_bayes =  new NaiveBayes(1);
    const [words, setWords] = useState(['food', 'taste', 'good'])
    const [sentence, setSentence] = useState('food taste good')
    naive_bayes.train(props.data)

    const HandleSubmit = event => {
        event.preventDefault();
        console.log(naive_bayes.predict(sentence));
    }

    return (
        <>
            <h2>Naive Bayes Classifier: Interactive Demo</h2>
            <p>Below is a demo of the Naive Bayes on a more complete dataset.
                You can add 
                
            </p>
            <WordHistogram
            naive_bayes = {naive_bayes}
            words = {words}
            />
            <center>
                <form onSubmit={HandleSubmit}>
                    <label> Sentence </label><br/>
                    <input
                        type="text"
                        value={sentence}
                        onChange={e => setSentence(e.target.value)}
                    /> <br/>
                    {/* <input type="range" min="1" max="20" value="1" /> <br/> */}
                    <input type = "submit" value = "Submit" />
                </form>
            </center>
        </>
    )
}