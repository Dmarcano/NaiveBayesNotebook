const papa = require("papaparse");
const fs = require('fs')

class NaiveBayes{
    constructor(alpha = 0){
        this.bag_of_words = {0 : {}, 1: {}};
        this.label_count = {0: 0 , 1: 0};
        this.alpha  = alpha;
        this.trained = false;
    }

    train(data){
        /*
        trains data from a csv 

        */
       if ( this.trained){
        this.bag_of_words = {}
        this.trained = false;
        }
        const parsed_csv = papa.parse(data);
        const labels = parsed_csv.data.shift()
        const rows = parsed_csv.data;
        rows.forEach(row => {
            // 
            const text = row[0];
            const label = row[1];
            this.label_count[label] += 1;
            text.split(' ').forEach(word => {
                if( !this.bag_of_words[label].hasOwnProperty(word) ){
                    this.bag_of_words[label][word] = 1;
                }
                else{
                    this.bag_of_words[label][word] += 1;
                }
            })
        })
        const all_unique_words = new Set(Object.keys(this.bag_of_words[0]).concat(Object.keys(this.bag_of_words[1])))
        for (const word of all_unique_words){
            this.bag_of_words[0][word] = this.bag_of_words[0].hasOwnProperty(word) ? this.bag_of_words[0][word] + this.alpha : this.alpha
            this.bag_of_words[1][word] = this.bag_of_words[1].hasOwnProperty(word) ? this.bag_of_words[1][word] + this.alpha : this.alpha
        }
        
        this.trained = true;

    }

    get_word_count(word){
        if( ! this.bag_of_words[1].hasOwnProperty(word) || this.bag_of_words[0].hasOwnProperty(word) ){
            return {0 : this.alpha , 1: this.alpha}
        }
        return {0: this.bag_of_words[0][word], 1: this.bag_of_words[1][word]}
    }

    get_count(label){
        /*
        returns the total count of words for a specific label in the training set
        */
        return Object.values(this.bag_of_words[label]).reduce((a,b) => a+b ,0)
    }

    get_vocabulary(label){
        /*
        returns the total number of unique words for a label
        */
        return Object.values(this.bag_of_words[label]).length
    }


    preprocess_sentence(sentence){
        /*
        Makes sure that the input to the classifier is a list of words with no puncation or uppercase/lowercase
        */

        const s_no_punctiation = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const lower_case = s_no_punctiation.toLowerCase();
        return lower_case.split(' ')
    }

    /**
     * Given a word, gets the conditional probability it belongs to every label
     *  @param {[string]} word lowercase word to find conditional probability of
     *  @returns {[Object]} probability that word belongs to each label
     */
    get_word_conditional_probabilty(word){
        // Get the total probabilities
        const success_count = this.get_count(1)
        const fail_count = this.get_count(0)
        const prob_success = success_count/ (success_count + fail_total_count) // P(X = 1)
        const prob_fail = fail_total_count/ (success_count + fail_total_count) // P(X = 0)
        // get the specific word probabilities
        const word_success_count = this.get_word_count(word)[1]
        const word_fail_count = this.get_word_count(word)[0]

    }

    get_conditional_probability_given_word(){

    }

    set_word_frequency(){

    }

    /** 
        * Given a trained network it will use its bag of words 
        * to predict wether a sentence belongs to a specific label

        Right now it either predicts a 1 or 0

        *@param {[string]} sentence sentence to predict with classifier
    */
    predict(sentence){
        
        const success_count = this.get_count(1)
        const fail_count = this.get_count(0)
        const prob_success = success_count/ (success_count + fail_total_count) // P(X = 1)
        const prob_fail = fail_total_count/ (success_count + fail_total_count) // P(X = 0)

        

        const word_list = this.preprocess_sentence(sentence)

        word_probability_list = word_list.map(word => this.get_word_conditional_probabilty(word));
    }

}

function test(){
    let naive_bayes = new NaiveBayes(1)

    const path = "./components/restaurant_reviews.csv";
    fs.readFile(path,"utf8" ,(err, data) => {
        if(err) {
            throw err;
        }
        // const csv = parse.parse(data);
        naive_bayes.train(data)
        sentence = "Food was really bad."

        naive_bayes.predict(sentence)
    })

}

test()

// export default NaiveBayes;