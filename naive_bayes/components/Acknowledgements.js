import ReactMarkdown from 'react-markdown'


export default function Acknoledgements(){
    const markdown = "# Acknowledgements\n\nAll of the information on this notebook is a cumilnation of the information on the following pages and videos \n\n[Sci-kit leanrs page on naive bayes](https://scikit-learn.org/stable/modules/naive_bayes.html)\n\n[Wikipedia Article on Naive Bayes and Document Classification problem](https://en.wikipedia.org/wiki/Naive_Bayes_classifier#Document_classification)\n\n[stat quest live-stream ](https://youtu.be/bTs-QA2oJSE)\n\n[Aisha Javed, \u201CUnfolding Na\u00EFve Bayes from Scratch !\u201D, Towards Data Science, 2018](https://towardsdatascience.com/unfolding-na%C3%AFve-bayes-from-scratch-2e86dcae4b01)\n\n[video: naive bayes: A friendly approach](https://youtu.be/Q8l0Vip5YUw)\n\nThe datasets were provided by the UCI Machine Learning Repository [link](https://archive.ics.uci.edu/ml/index.php)\n\n* [positive-negative reviews dataset (IMBD, Amazon, Yelp)](https://archive.ics.uci.edu/ml/datasets/Sentiment+Labelled+Sentences)\n\n* [SMS Spam Dataset](https://archive.ics.uci.edu/ml/datasets/SMS+Spam+Collection)\n\nThe stock-photos were taken from [Unsplash](https://unsplash.com/) a royalty free stock image database.\n"
    return(
        <div>
            <ReactMarkdown source={markdown}/>
        </div>
    )


}