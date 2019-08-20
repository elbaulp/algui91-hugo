+++
title = "Binomial distribution (easily explained)"
author = ["cristina"]
description = "An easy explanation to the binomial distribution with sample code in Scala"
date = 2019-08-20T20:30:00+02:00
categories = ["statistics", "data-science"]
url = "/en/binomial-distribution/"
mainclass = "datascience"
image = "binomial-pascal-triangle.jpg"
math = true
draft = false
+++

<figure>
    <img role="button" title="binomial distribution" src="/img/binomial-pascal-triangle.jpg" alt="" width="399px" height="298px" />
    <figcaption>Credit to: https://sites.google.com/a/g.coppellisd.com/coppell-ib-math/math-sl/topics---sl/the-binomial-expansion</figcaption>
</figure>


Maybe when you hear about binomial distributions, you don't feel comfortable at all. In this post we are going to explain the binomial distribution in a simple way, so that you don't feel that it doesn't go with you anymore and you can
find the logic behind that formula you have been using for years. An example implementation of the binomial is provided in Scala at the end on the post.

# So what is a binomial?

The binomial distribution is refered to situations which involve success/failure outputs. That is, just two possible outputs. Hitting a red traffic light or not in your way to work,  seeing any cat crossing a crosswalk on you way home
or having any bird breeding in your garden trees, are some examples.
A random variable is said to be binomial when it has a binomial distribution, and that just happens when the following four conditions are met:

1. The number of trials (**n**) is fixed
2. Each trial could be one of two: success or failure
3. The probability of success (**p**) is the same for each trial
4. Trials are **independent**, meaning that the outcome of one of them cannot influence the outcome of any of the other trials

Then, if **X** is the number of successes in **n**  trials and the four conditions above are met, we say that **X** has a binomial distribution with probability of success = **p** on each trial.


# Examples of real/fake binomial distributions

## (The classical) Flipping a coin 5 times and count number of crosses you get

The number of flips (trials) is fixed and equal to 5, so condition 1 is checked. Each coin has two sides so you can only get head (failure) or cross (success). Condition 2 is also checked. Taking for granted that the coin is a fair
coin, each side has the same probability of appearing, being 1/2 the probability of success for each trial. Condition 3 is checked. Flipping the coin in the same random way for each trial stablishes no dependence between the results
of each flip. Condition 4 is also checked, so we can conclude this is a trully a binomial distribution.

## Number of times you hit a red traffic light on your way to work

Well, the number of traffic lights from your home to your work must be fixed. Lets, say that for example you have to cross 5 semaphores on your way to work. Condition 1 is checked. Each semaphore could be red or not red (green or yellow),
so the red case would be the success case and the other two woukd be the failure. Conditon 2 is checked. If the timer for the red light is set equally for each semaphore, each semaphore has the same probabillity of being red or not.
Condition 3 is checked. One semaphore is independent from the other four semaphores. Condition 4 is also checked. So we conclude we have a binomial distribution with n= 5 and p = 1/2 (assuming that red and non red lights have the same probability).

## Rolling a dice 5 times and counting the values

The number of trials is fixed (5), the probability of success for each trial is 1/6 and trials are independent, so conditions 1,3,4 are checked. However, each trial could not be just success or failure, as you can record up to a 6 per trial. Condition 2 is not checked, as it is
not a success/failure situation. Nevertheless, if we were recording if in each trial we get a number \\(\  \geq  3\\) or < 3, this would be a binomial. Sometimes is just about what you are trying to measure!

## Vote intention for November elections

Say we pick 50000 spanish couples an ask them if they are planing to go and vote on November elections or if they are sick and tired with the spanish politicians and they prefer not to vote. (Picking couples is quicker than
just picking 100000 individuals). In this case the first condition is checked, as the number of trials is fixed. The answers are: vote (success) or not vote (failure), so condition 2 is checked. Each couple has the same probability of answering
a yes to vote, so condition 3 is checked. But are couples really independent? usually they are highly correlated, meaning that if one integrator of the couple answers that she/he is not pretending to vote, the other integrator would answer the same
with a high probability. Condition 4 is not checked.

## Seeing any cat crossing a crosswalk on you way home

The number of crosswalks on your way home from work is fixed (lets say 7), then condition 1 is checked. The possibilities are two: having any cat crossing the crosswalk in front of you (success), or not (failure). Thus, condition 2 is also
checked. The probability of having a cat crossing the crosswalk is the same for each crosswalk (even though the probability of having a cat crossing a crosswalk is low). Condition 3 is checked. Trials are independent, meaning that if
in the crosswalk 1 there is a cat crossing it, there could or could not be any cat at all in the following crosswalks. So indepence condition is also satisfied (cannot be otherwise when talking about cats).

# How to find the binomial probabilities

For finding probabilities for a binomial random variable (X), the following formula is used:
\\[\binom{n}{x}p^x(1-p)^{n-x}\\]

Now lets explain the logic behing this formula (so in case we forget it we can try to figure it out):

- \\(\binom{n}{x}\\) : n choose x, represents the number of ways to reorder **x** sucesses among **n** trials. (So  \\(  0 \leq x \leq n \\) ). To calculate this, we use the formula:
 \\(\binom{n}{x}=\frac{n!}{x! \cdot (n-x)!)}\\)
 that is, the factorial of the total number of trials (remember that factorial is another way of counting rearangements) divided by the factorial of the number of successes dot the factorial of the number of failures.
 - **n**, as we said, is the number of trials and it is fixed (as it is a binomial)
 - **x** is the number of successes
 - **(n-x)** is the number of failures
 - **p** is the success probability of any trial (and must be equal to every trial)

 Thus, we can find the probability of a binomial just by multipliying three things: the number of ways to rearrange the successes among all the trials, the probability of success raised to power of the number of successes and the probability
 of failure raised to the power of the number of failures. Sounds logical, don't you think?

# Example of finding the binomial probabilities

 Say you have 5 trees in your garden: an olive tree, an apple tree, a cherry tree, a pear tree and a fig tree. Then **X** would be the number of trees out of the 5 having any couple of birds breeding their chicks in it. Assuming that all the trees
 have the same probability of being chosen by the birds to breed, lets say that the probability of being chosen by the birds is p=0.7, as all of them are fruit trees and birds prefers fruit trees. Then, the probability of not being chosen by the birds is (1-p) = 0.3.
 What is the probability of each possible value of **X** (0,1,2,3,4,5)?

 To figure it out, first we need to answer the following question: how many ways could we find any (one or more) couple of birds breeding their chicks in **x** out of our five trees?
 we already know we can find it by finding the ways of reordering x ={0,1,2,3,4,5} out of 5. For example, for 3 trees out of 5, we would have 10 ways of rearranging them:

 \\[ \binom{5}{3}=\frac{5!}{3! \cdot 2!} = \frac{5 \cdot 4 \cdot 3 \cdot 2 \cdot 1}{(3 \cdot 2 \cdot 1) \cdot(2 \cdot 1)}= 10\\]

 Now we can obtain the probability distribution for each value:

\\[ p(0) = \binom{5}{0}0.70^0 (0.30)^{5-0} = \frac{5!}{0!5!}0.70^0 (0.30)^{5-0} \approxeq 0 \\]
\\[ p(1) = \binom{5}{1}0.70^1 (0.30)^{5-1} = \frac{5!}{1!4!}0.70^1 (0.30)^{5-1} = 0.0284 \\]
\\[ p(2) = \binom{5}{2}0.70^2 (0.30)^{5-2} = \frac{5!}{2!3!}0.70^2 (0.30)^{5-2} = 0.1323 \\]
\\[ p(3) = \binom{5}{3}0.70^3 (0.30)^{5-3} = \frac{5!}{3!2!}0.70^3 (0.30)^{5-3} = 0.3087 \\]
\\[ p(4) = \binom{5}{4}0.70^4 (0.30)^{5-4} = \frac{5!}{4!1!}0.70^4 (0.30)^{5-4} = 0.3601 \\]
\\[ p(5) = \binom{5}{5}0.70^5 (0.30)^{5-5} = \frac{5!}{5!0!}0.70^5 (0.30)^{5-5} = 0.1681 \\]


# Code Implementation

No, I did not that computation by hand. I implemented the following Scala code to have it quicky done. We lazy humans..!

```scala

import scala.annotation.tailrec

trait distributions {

  // Compute factorial of a given number
  def permutations(n: Int): Int = {
    @tailrec
    def permutationsAcc(n: Int, acc: Int): Int = n match {
      case 0 | 1 => acc
      case _ => permutationsAcc(n-1, n * acc)
    }
    permutationsAcc(n, 1)
  }
  // Compute number of ways to choose x from n
  def combinations(n: Int, x:Int): Int = {
    permutations(n) / (permutations(x) * permutations(n - x))
  }
}


class binomial(val trials: Int, val prob_success: Double) extends distributions {

  // get the probability for a specific value
  def getProb(value: Int): Double = {
    combinations(trials, value) * (Math.pow(prob_success, value) * Math.pow(1 - prob_success, trials - value))
  }
  // get the probability distribution for all possible values
  def getProbabilityDistrib: List[(Int, Double)]= {
    val valseq = List.range(0, trials + 1)
    valseq.map( v => (v, getProb(v)))
  }

}

```
and a quick and easy main so we could call our methods and print the results:

```scala

object binomial extends App {
  // create our binomial object
 val mybin = new binomial(5, 0.70)
  // print the number of ways to choose 3 out of 5
  println(mybin.combinations(5,3))
  //  print the probability distribution for all values {0,1,2,3,4,5}
  print(mybin.getProbabilityDistrib)
}

```

the full code script is in [my GitHub](https://github.com/CristinaHG/LUTH)


# Subsets, mean and variance

Imagine that in the tree example above we were insterested in finding the probability of a subset, for example, the probability that between 1 and 3 trees have birds breeding in them, more than the probability distribution of
each possible value. In that case, we would compute the probability as \\( p(1 \leq x \leq 3) \\), thus we must sum all probability values within that range:  \\[ p(1 \leq x \leq 3) =  p(1) + p(2) + p(3) = 0.0284 + 0.1323 + 0.3087 = 0.4694 \\].

To find the mean of a binomial distribution, we multiply the number of trials and the probability of success: \\[\mu = np \\]. To find the variance, we multiply the mean with the probability of  failure: \\[\sigma^2 = np(1-p) \\]. Thus,
the standard deviation of the distribution could be computed as:  \\[\sigma = \sqrt{ np(1-p)} \\].


# References

- *Statistics - for Dummies, a Wiley brand. Deborah J. Rumsey*
