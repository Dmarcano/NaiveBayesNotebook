import pandas as pd 
from matplotlib import pyplot as plt
import os
import string

"""
A somewhat hard_coded not the prettiest implementation of a naive bayes

I keep some implementation details inside of here such as to not obsfucate what the main python 
notebook is trying to do 

"""


class NaiveBayes():
    
    def __init__(self, alpha = 0):
        self.bag_of_words = {0 : {}, 1: {}}
        self.label_count = {0: 0 , 1: 0}
        self.alpha = alpha
        self.trained = False

    def train(self, dataframe):
        """
        Training for binary classification. 
        """
        for index, row in dataframe.iterrows():
            label, text = row['label'], row['text']
            self.label_count[label] += 1
            for word in text.split(' '): 
                if word not in self.bag_of_words[label]:
                    self.bag_of_words[label][word] = 1
                else:
                    self.bag_of_words[label][word]+= 1
                    pass

            all_words =  set(list(self.bag_of_words[0].keys())  + list(self.bag_of_words[1].keys()))

            #TODO implemenet for multiple classes of classification (maybe)
            for word in all_words:
                if word not in self.bag_of_words[0]:
                    self.bag_of_words[0][word] = self.alpha
                if word not in self.bag_of_words[1]:
                    self.bag_of_words[1][word] = self.alpha
        
        self.trained = True
        return 

    def get_count(self, label):
        return sum(self.bag_of_words[label].values())

    def get_vocabulary(self, label):
        return len(self.bag_of_words[label])

    def table(self):
        # filter all the words that are padded out for easier viewing
        new_dict = {'good' : self.bag_of_words[1], 'bad' : self.bag_of_words[0] }
        return pd.DataFrame.from_dict(new_dict)

    def historgram(self, *args):
        """
        Given a list of words that are inside the bag of words for the naive bayes classifier
        Shows a histogram for the words inside
        """

        # filter the dictionaries so that we can plot the words we want 
        word_freq_in_success = {word : freq for (word, freq) in self.bag_of_words[1].items() if word in args}
        word_freq_in_failure = {word : freq for (word, freq) in self.bag_of_words[0].items() if word in args}
        
        success_words = list(word_freq_in_success.keys()) 
        success_freq = list(word_freq_in_success.values())

        failure_words = list(word_freq_in_failure.keys())
        failure_freq = list(word_freq_in_failure.values())
        
        fig, axs = plt.subplots(1, 2, figsize=(9, 3), sharey=True)
        axs[0].bar(success_words, success_freq, color = "darkblue")
        axs[0].set_title("Words in Success")
        axs[0].set_ylabel('freq')
        axs[1].bar(failure_words, failure_freq, color = "crimson")
        axs[1].set_title("Words in Failure")
        axs[1].set_ylabel('freq')
        # fig.suptitle('Naive Bayes Word Frequency')

        return fig, axs

    def preprocess_sentence(self, sentence):
        """
        make sure that the input to the classifier is words with no punctuation or capitalization
        """
        table = str.maketrans(dict.fromkeys(string.punctuation))
        new_s = sentence.translate(table)
        new_s = new_s.lower()
        word_list = new_s.split(' ')

        return word_list


    def predict(self, sentence):
        """ 
        Given a trained network it will use its bag of words 
        to predict wether a sentence belongs to a specific label

        Right now it either predicts a 1 or 0
        """


        # For this 
        word_list = self.preprocess_sentence(sentence)
        word_probabilities = {}
        for word in word_list:
            word_probabilities[word] = get_word_conditional_probability(word) 


        return 


    def get_word_conditional_probability(self, word):
        """
        Given a word, returns a dictionary of the conditional probabilities that the word belongs 
        to a specific label 
        """
        scss_word_count = self.bag_of_words[1][word]
        scss_total_count = self.get_count(1)
        fail_total_count = self.get_count(0)
        fail_word_count =  self.bag_of_words[0][word]

        return {1: scss_word_count/scss_total_count,0 : fail_word_count /fail_total_count}  

    def set_word_freq(self, label, **kwargs):
        """
        Given a dictionary of key-value pairs of type 'str': 'int' 

        sets the probability for 
        """
        for word,freq in kwargs.items():
            self.bag_of_words[label][word] = freq

        return 

    def get_word_count(self, word):

        return {0: self.bag_of_words[0][word], 1: self.bag_of_words[1][word]}

    

def test():

    dataframe = pd.read_csv("restaurant_reviews.csv")
    classifier = NaiveBayes()
    classifier.train(dataframe)
    # words = ["good", "food", "bad", "really"]
    # fig, axs = classifier.historgram("good", "food", "bad", "really")
    # plt.show()

    word_update = {'good': 2, 'really': 1}

    classifier.set_word_freq( 0, **word_update)

    print("Done!")




if __name__ == "__main__":
    # for debugging
    abspath = os.path.abspath(__file__)
    dname = os.path.dirname(abspath)
    os.chdir(dname)
    plt.style.use('ggplot')
    test()
    