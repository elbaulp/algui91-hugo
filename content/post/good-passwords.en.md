+++
image = "haystackpassword.png"
mainclass = "security"
author = "alex"
description = "Best practices to create and manage passwords & hardening your online presence"
date = "2017-07-27T12:21:35+01:00"
title = "Creating and managing passwords intelligently"
tags = ["passwords"]
categories = ["security"]
+++

# CHANGELOG

> 07.27.2017: **Added** *Passwords Evolved: Authentication Guidance for the Modern Era* to useful links.

# Introduction

Recently there has been a lot of noise in the [security](https://elbauldelprogramador.com/en/tags/security/ "posts about security") field with **wannaCry** and a **breach with more than 230M accounts stolen**. Today more than ever it is necessary to have *good habits creating passwords* when creating new accounts in any new service you sign up. This post shows some good practices I've been using since I became more security conscious.

# Create Good Passwords

The first thing is to create a *strong and random enough password*. There are many websites and tools for this purpose, such as <a href="https://www.grc.com/passwords.htm" target="_blank" title="Perfect Passwords">Steve Gibson's page</a> or the built-in tool in **LastPass**.

For example, for every new account you create in any service make a long password containing characters, numbers and symbols (see LastPass generator). A good choice for the **password length would be anything above 50 character**, below is an example of the tool integrated in **LastPass**.

<figure>
        <a href="/img/lastpassgenerator.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/lastpassgenerator.png"
            alt="LastPass password generator"
            title="LastPass password generator"
            sizes="(min-width: 420px) 420px, 100vw"
            width="420"
            height="521">
          </amp-img>
        </a>
        <figcaption>LastPass password generator</figcaption>
</figure>

If you do not want to use **LastPass** you can use **Steve's generator**:

<figure>
        <a href="/img/steveperfectpasswords.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/steveperfectpasswords.png"
            srcset="/img/steveperfectpasswords.png 1000w, /img/steveperfectpasswords-800.png 800w"
            alt="Steve's Perfect Passwords"
            title="Steve's Perfect Passwords"
            sizes="(min-width: 1152px) 1152px, 100vw"
            width="1152"
            height="277">
          </amp-img>
        </a>
        <figcaption>Steve's Perfect Passwords</figcaption>
</figure>

<!--more--><!--ad-->

Lets see how much time would it take to **crack this 50-length** randomly generated password: 8e8f6$AB9^YgOJ4x$JqHknK*FXp*uru2qyU3KXydaK*lJncQrE:

<figure>
        <a href="/img/howsecure.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/howsecure.png"
            alt="How long would it take to crack the password?"
            title="How long would it take to crack the password?"
            sizes="(min-width: 803px) 803px, 100vw"
            width="803"
            height="227">
          </amp-img>
        </a>
        <figcaption>How long would it take to crack the password? | source: <a href="https://howsecureismypassword.net/" target="_blank" title="howsecure">howsecureismypassword.net</a></figcaption>
</figure>

and what does it says **Steve's version?**:

<figure>
        <a href="/img/haystackpassword.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/haystackpassword.png"
            alt="GRC's Interactive Brute Force Password “Search Space” Calculator"
            title="GRC's Interactive Brute Force Password “Search Space” Calculator"
            sizes="(min-width: 842px) 842px, 100vw"
            width="842"
            height="753">
          </amp-img>
        </a>
        <figcaption>GRC's Interactive Brute Force Password “Search Space” Calculator | source: <a href="https://www.grc.com/haystack.htm" target="_blank" title="haystack">grc.com/haystack.htm</a></figcaption>
</figure>

# Use a password manager

Of course using such passwords you **can't expect to memorize them**, and that is a sign of a strong and good password.

In order to manage your passwords you should use a password manager, I am using LastPass as these guys have demonstrated they know how to store your passwords in a secure way. ( I am basing this opinion on Steve Gibson's knowledge on security, here are some talks about it: <a href="https://www.youtube.com/watch?v=z4-h5gWpvAc" target="_blank" title="I">I</a>, <a href="https://blog.lastpass.com/2010/07/lastpass-gets-green-light-from-security.html/" target="_blank" title="II">II</a>).

Even if you're​ using LastPass to generate and store your passwords securely, there is an extra layer you could put on top of that: **“use LastPass intelligently”**, as I explain in the next section.

## Best Practices To Use A Password  Manager

So far you have a password stored in your password manager that's​ impossible to memorize, that's what a password manager is for. But the possibility that someone attack you and get all your LastPass information still could exists. Let's suppose **someone stole** all your data in LastPass, and to put us in the worst case scenario, **ALL THE STOLEN DATA IS decrypted**. Well, one way to solve that is to only store *part of the password* in LastPass, let me explain:

When you generate your password, you store that randomly generated password in your LastPass vault, but In the service itself, let's say your Google account you set your password to:

_8e8f6$AB9^YgOJ4x$JqHknK*FXp*uru2qyU3KXydaK*lJncQrE_**APASSWORDYOUCANMEMORIZE**

That way, even if all your LastPass data is stolen, the thief wouldn't be able to log in into your accounts, as **they only know part of your password.**

# Hardering online presence

These days more and more services offer a Two factor authentication option, you should enable it in all services you use.

## TFA

When you enable TFA, the service will show your backup's codes in the case you lose your phone or can't generate a TFA code.

## Securing your TFA backup's

It is important that you save this backup's codes, but In a secure place. The best thing would be to print it in paper and store them in a banks box. But for most of us stored them in a external HDD or print them would do the trick.

That's it, In this days I think applying this tips and bests practices should have your password pretty secure, but **remember, nothing is complete secure**.

*What tips do you use to secure your passwords? Let me know in the comments!*

# Useful links

- <a href="https://www.troyhunt.com/passwords-evolved-authentication-guidance-for-the-modern-era/" target="_blank" title="Passwords Evolved: Authentication Guidance for the Modern Era">Passwords Evolved: Authentication Guidance for the Modern Era</a>
