"""
quick script to turn UCI sentiment analysis
"""
import os 
import string 


def clean_sentence(sentence):

        table = str.maketrans(dict.fromkeys(string.punctuation))
        new_s = sentence.translate(table)
        new_s = new_s.lower()

        return new_s

def main():

    num_lines = sum(1 for line in open('total_sentences.txt'))

    with open('total_sentences.txt') as infile:

        train_set = open('reviews_train.csv', 'w')
        test_set = open('reviews_test.csv', 'w')

        label_dict = {'spam' : 0, 'ham': 1}

        for  idx,line in enumerate(infile):
            split = line.split('\t', 1)
            str_label, sentence = split[1], split[0]
            label  = str_label.replace('\n', '')
            sentence = sentence.replace(',', '')
            sentence = sentence.replace('\n', '')
            sentence = clean_sentence(sentence)
            output = f'{sentence},{label}\n'
            
            if idx/num_lines >= 0.75:
                test_set.write(output)
            else:
                train_set.write(output)

            pass 

if __name__ == "__main__":
    abspath = os.path.abspath(__file__)
    dname = os.path.dirname(abspath)
    os.chdir(dname)

    main()