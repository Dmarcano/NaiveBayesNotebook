"""
quick script to turn UCI 
"""
import os 


def main():

    num_lines = sum(1 for line in open('SMSSpamCollection'))

    with open('SMSSpamCollection') as infile:

        train_set = open('SMS_Spam_training.csv', 'w')
        test_set = open('SMS_Spam_test.csv', 'w')

        label_dict = {'spam' : 0, 'ham': 1}

        for  idx,line in enumerate(infile):
            split = line.split('\t', 1)
            str_label, sentence = split[0], split[1]
            label  = label_dict[str_label]
            sentence = sentence.replace(',', '')
            sentence = sentence.replace('\n', '')
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