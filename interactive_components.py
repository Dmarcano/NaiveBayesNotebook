naive_bayes_classifier = None

def set_classifier(classifier):
    global naive_bayes_classifier 
    naive_bayes_classifier = classifier


def interactive_hist(**kwargs):
    """
    Make a interactive histogram
    """
    global naive_bayes_classifier
    # update naive bayes by label 
    if "sentence" in kwargs:
        sentence= kwargs.pop("sentence")
        prediction = naive_bayes_classifier.predict(sentence)
        output = prediction["prediction"]
        print(f"Probability sentence: {sentence} is a: \ngood review is {prediction[1]:.2f}\na bad review is {prediction[0]:.2f},\nclassification: {output}")

    word_update_dict = {0: {}, 1: {}}
    for word_name, freq in kwargs.items():
        word_split = word_name.split('_')
        word = word_split[0]
        label = 1 if word_split[1] == "pos" else 0
        word_update_dict[label][word] = freq
        
    naive_bayes_classifier.set_word_freq( 1, **word_update_dict[1])
    naive_bayes_classifier.set_word_freq(0, **word_update_dict[0])

    fig, axs = naive_bayes_classifier.historgram("good", "food", "bad", "really")

def text_probability():
    global naive_bayes_classifier

    return    rf"""
                Dims: ${a}m \times{b:5.2}m$

                Area: ${P}m^2$

                Volume: ${V}m^3$
                """