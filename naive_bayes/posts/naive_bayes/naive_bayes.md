---
title: "An Introduction to Bayesian Modeling"
author: Diego Marcano
---

## An Introduction to Bayesian Modeling 



One of the most powerful ideas that comes out of using the Bayesian statistics we've learned in class is the idea of Bayesian inference.
One of the best ways to describe what Bayesian inference means is through an example.

> You are looking for a place out to eat. After finding a place, you want to make sure that you won't waste your time and money so you go and read the reviews. The first review you reads "This place has amazing food!". The next set of reviews also have a similiar tone to them reasurring you that the restaurant might be a good choice after all... 

![alt text][sample]

[sample]:diagrams/Restaurant_Review.png "Example of looking at a resturant reviews and updating our beliefs based on them"

This way of thinking is exactly what Bayesian inference is. The idea of simply updating your beliefs after considering new evidence.

We can try to leverage this way of thinking to create an algorithm that can use Bayesian inference in a wide variety of problems. One of the more straightforward algorithms is called the Naive Bayes Classifier. We're going to look at the inner workings of this algorithms by taking the example of classifying restaurant reviews.



## Naive Bayes: A Straightforward Introduction to Bayesian Inference for Machine Learning 

Naive Bayes is what is called a reinforcement learning algorithm. It takes in a sample dataset and uses that data to predict outcomes from data that it has never seen before. In our Example we're going to use a mock dataset that corresponds to positive and negative restaurant reviews. From this small set of data we will then predict wheter new reviews are positive or negative. 

### Here is the Outline of this page

1. Training Naive Bayes
2. Making predictions
3. Dealing with never before seen words
4. Naive Bayes Real World Scenario 4

## Step 1: Gather Dataset and Train The Classifier

The most important step in all of this is gathering our dataset. Our results can vary wildly depending on how good our data is. For this example I created a sample dataset to keep things simple. 


| Text        | Label           | 
| ------------- |:-------------:| 
| simply loved it| 1 | 
| this food was bad| 0 |   
|  really good food | 1|   
|  terrible taste|   0   |   
| this food good|     1 |   
| loved taste|      1|   
|  bad ambiance|     0 |   
|  i loved it so bad|  1    |   
|  i simply loved this good food|     1 |   
| it wasn't good	 |   0   |   
 

Now we have a small dataset to train on. Every row corresponds to a review which has a label for either being a positive or negative review 
and a set of words that corresponds to the review.

>(Notice how all words are lowercase and punctuation has been cut. This is an important step because we want to keep the data consistent when we train our model and when we predict on new data. Making everything lowercase and cutting punctuation makes it easier to learn from our data without chaning the end results.)

Now we can train our model. We imagine taking each and every review. Breaking it down by its words and adding that word to a bag of words. Making sure to what type of review each word came from. Doing this might lead to a bag of words that looks like this.


| Word       | Good Count         |  Bad Count | 
| :-------------: |:-------------:| :-------------:| 
| simply| 2  | 0| 
| loved| 4  | 0| 
| it| 2  | 1| 
| really| 1  | 0| 
| good| 3  | 1| 
| food| 3  | 1| 
| this| 2  | 1| 
| taste| 1  | 1| 
| i| 2  | 0| 
| so| 1  | 0| 
| bad| 1  | 2| 
| was| 0  | 1| 
| wasn't| 0  | 1| 
| ambiance| 0  |1| 
| terrible| 0  | 1| 

We now have a table of how many times each word occurs in positive and negative reivews. With this, Naive Bayes is trained!
 

## Step 2: Calculating Basic Predictions

Now the Naive-Bayes classifier has been trained. It contains a bag of words that we can use to begin classifying 
sentences into either:

 **positive (1)** or **negative (0)** reviews.

 Now lets calculate wether a new review is positive or negative. Assume we ask our model to predict whether the following sentence is a positive or negative review: 

**Food taste good**


 Not the most elegant review but a good example nonetheless. 

Now our prediction follows the following steps

1. Process the data to make usable by the model 
2. Find the probabilitiy of the sentence belonging to each label
3. Return the label from which the probabilitiy is the highest 

First, we want to process this sentence such that we can use it in our naive bayes model. we split the sentence into its component words and make it a list of words

<!-- TODO Add Math equation here -->
$Food$ $taste$ $good$ $\rightarrow [food,taste,good]$

[pookie](#pookie)


Now from the list of words we ask the question, given a specific word, what is the probabilitiy that our review is positive or negative?

For each individual word, we simply look at the frequency each word pops up in our bag of words. A good visualization of this is making a histogram for the frequency of each word in our training set


<!-- TODO MAKE A HISTOGRAM HERE -->

et's take a look at the word $good$

Given that we have the word $good$, what is the probability that our review is positive?

$P(review = 1 | word = good)$

By Baye's rule this is 

![alt text][bayesWordGood]

[bayesWordGood]:diagrams/bayes_rule_word_good.png "Example of looking at a resturant reviews and updating our beliefs based on them"


