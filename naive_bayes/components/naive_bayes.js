const parse = require("papaparse");
const fs = require('fs')

class NaiveBayes{
    constructor(){
        this.bag_of_words = {0 : {}, 1: {}};
        this.label_count = {0: 0 , 1: 0};
        this.alpha  = 0;
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
    }

    get_count(){

    }

    get_vocabulary(){

    }

    table(){

    }

    filtered_table(){

    }

    histogram(){

    }

    preprocess_sentence(){

    }

    predict(){

    }

    get_word_conditional_probabilty(){

    }

    get_conditional_probability_given_word(){

    }

    set_word_frequency(){

    }

}

function test(){
    const path = "../../restaurant_review.csv";
}



export default NaiveBayes