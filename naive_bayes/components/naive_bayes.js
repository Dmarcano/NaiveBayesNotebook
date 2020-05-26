const papa = require("papaparse");
const fs = require('fs')

class NaiveBayes{
    constructor(alpha = 1){
        this.bag_of_words = {0 : {}, 1: {}};
        this.label_count = {0: 0 , 1: 0};
        this.testing_set =  {0: [], 1: []}
        this.alpha  = Math.max(1, alpha);
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
        const conjunctions = ['a', 'i', 'the', 'it', 'and', 'an', 'we', 'is', 'this', 'was', 'but', 'with', 'are', 'so', 'be','to']
        const all_unique_words = new Set(Object.keys(this.bag_of_words[0]).concat(Object.keys(this.bag_of_words[1])))
        for (const word of all_unique_words){
            if(conjunctions.includes(word)){
                this.bag_of_words[0][word] =  this.alpha
                this.bag_of_words[1][word] = this.alpha
            }
            else{
                this.bag_of_words[0][word] = this.bag_of_words[0].hasOwnProperty(word) ? this.bag_of_words[0][word] + this.alpha : this.alpha
                this.bag_of_words[1][word] = this.bag_of_words[1].hasOwnProperty(word) ? this.bag_of_words[1][word] + this.alpha : this.alpha
            }
        }
        
        this.trained = true;

    }

    get_word_count(word){
        if( ! this.bag_of_words[1].hasOwnProperty(word) || !this.bag_of_words[0].hasOwnProperty(word) ){
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
        const prob_success = success_count/ (success_count + fail_count) // P(X = 1)
        const prob_fail = fail_count/ (success_count + fail_count) // P(X = 0)
        // get the specific word probabilities
        const word_success_count = this.get_word_count(word)[1]
        const word_fail_count = this.get_word_count(word)[0]

        const scss_word_prob = word_success_count / (word_success_count + word_fail_count)// P(W = word | X = 1)
        const fail_word_prob = word_fail_count / (word_success_count + word_fail_count)// P(W = word | X = 0)

        return {1: scss_word_prob, 0: fail_word_prob}
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
        // get the counts for the probability of success
        const success_count = this.get_count(1)
        const fail_count = this.get_count(0)
        const prob_success = success_count/ (success_count + fail_count) // P(X = 1)
        const prob_fail = fail_count/ (success_count + fail_count) // P(X = 0)
        // get the probabilities each word in sentence belongs to a label
        const word_list = this.preprocess_sentence(sentence)
        const word_probability_list = word_list.map(word => this.get_word_conditional_probabilty(word));
        // get the product of P(A|1)P(B|1)....P(1)
        let prob_given_success = word_probability_list.reduce((totalProb, currentProb)=> isPlainObject(totalProb) ? totalProb[1] * currentProb[1]: totalProb * currentProb[1] )
        prob_given_success = prob_given_success* prob_success;
        // get the product of P(A|0)P(B|0)....P(0)
        let prob_given_fail = word_probability_list.reduce((totalProb, currentProb)=> isPlainObject(totalProb) ? totalProb[0] * currentProb[0]: totalProb * currentProb[0] )
        prob_given_fail = prob_given_fail * prob_fail;

        const prob_succes_given_sentence = prob_given_success/(prob_given_success + prob_given_fail)
        const prob_fail_given_sentence = prob_given_fail/(prob_given_success + prob_given_fail)

        const prediction = prob_succes_given_sentence >= prob_fail_given_sentence ? 1 :0
        return {prediction : prediction, 1 : prob_succes_given_sentence, 0 : prob_fail_given_sentence}
        
    }

    store_test_data(data){
        const parsed_csv = papa.parse(data);
        const labels = parsed_csv.data.shift()
       

        const rows = parsed_csv.data;
        rows.forEach = Array.prototype.forEach
        rows.forEach(row => {
            // 
            const text = row[0];
            const label = row[1];
            this.testing_set[label].push(text)
            // this.testing_set[label].push(text)
        })
    }

    get_random_negative_review(){
        return this.testing_set[0][Math.floor(Math.random() *  this.testing_set[0].length)];
    }

    get_random_positive_review(){
        return this.testing_set[1][Math.floor(Math.random() *  this.testing_set[1].length)];
    }

}

var isPlainObject = function (obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
};


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

// test()

export default NaiveBayes;