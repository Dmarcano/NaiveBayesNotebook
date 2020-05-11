import NaiveBayes from '../naive_bayes'
import fs from 'fs'
import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import WordHistogram from './WordHistogram'


export function GetTrainingData(){
    // const dataPath = "data/restaurant_reviews.csv";
    const dataPath = "data/reviews_train.csv";
    const contents = fs.readFileSync(dataPath, "utf8");
    return contents
}

export function GetTestingData(){
    const dataPath = "data/reviews_test.csv";
    const contents = fs.readFileSync(dataPath, "utf8");
    return contents;
}



export default function InteractiveBayes(props){
    const naive_bayes =  new NaiveBayes(1);
    const [words, setWords] = useState("the real disappointment was our waiter".split(' '))
    const [sentence, setSentence] = useState('the real disappointment was our waiter')
    naive_bayes.train(props.data)
    naive_bayes.store_test_data(props.testing)
    const [naiveBayesPrediction, setNaiveBayesPrediction] = useState(naive_bayes.predict('the real disappointment was our waiter'))


    const HandleSubmit = event => {
        event.preventDefault();
        let word_list = naive_bayes.preprocess_sentence(sentence);
        setWords(word_list)
    }

    const RandomReview = event =>{
        event.preventDefault();
        const review_type = event.target.value.split(' ')[1];
        if(review_type === "Positive"){
            const new_sentence = naive_bayes.get_random_positive_review()
            setSentence(sentence)
            let word_list = naive_bayes.preprocess_sentence(new_sentence)
            setWords(word_list)
        }
        else if(review_type === "Negative"){
            const new_sentence = naive_bayes.get_random_positive_review()
            setSentence(sentence)
            let word_list = naive_bayes.preprocess_sentence(new_sentence)
            setWords(word_list)

        }

    }

    return (
        <>
            <h2>Naive Bayes Classifier: Interactive Demo</h2>
            <p>Below is a demo of the Naive Bayes on a more complete dataset.
                You can add either write in and submit your own sentence or grab a random one 
                from a testing dataset. All data from the testing set is data that the classifier has never seen before!
            </p>
            <br></br>
            <p>
                The classifier will then return a histogram
            </p>
            <WordHistogram
            naive_bayes = {naive_bayes}
            words = {words}
            />
            <center>
                <form onSubmit={HandleSubmit}>
                    <label> Sentence </label><br/>
                    <TextField
                        type="text"
                        value={sentence}
                        onChange={e => setSentence(e.target.value)}
                    /> <br/>
                    {/* <input type="range" min="1" max="20" value="1" /> <br/> */}
                    <input type = "submit" value = "Submit Sentence" />
                    <input type = "button" value = "Random Positive Review" onClick ={RandomReview} ></input>
                    <input type = "button" value = "Random Negative Review" onClick ={RandomReview}></input>
                </form>
            </center>
            <p>
                Probability sentence is positive : {naiveBayesPrediction[1]} <br/>
                Probability sentence is negative : {naiveBayesPrediction[0]} <br/>
                Sentence Classification: {naiveBayesPrediction.prediction}
            </p>
        </>
    )
}