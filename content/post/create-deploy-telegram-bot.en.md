+++
title = "Create a Telegram Bot, from Development to Deployment"
author = ["alex"]
description = "Create a telegram bot, from development to deployment."
date = 2019-07-17T21:56:00+02:00
lastmod = 2019-07-17T22:01:06+02:00
categories = ["dev"]
url = "/en/create-deploy-telegram-bot"
draft = false
mainclass = "dev"
+++

I have been wanting for a while  to build a **telegram bot** who did something useful. For example, I created some time ago a **telegram channel** called [CompTrain Individuals](https://t.me/CompTrainIndividuals) to post the crossfit WORKOUT from [comptrain.co](http://comptrain.co). but it was somewhat painful since I had to check its website every day, copy the workout and paste it on the telegram channel. So I though, that is a great use case for a telegram bot! In this post I will explain very quickly how I did it, from development to deployment.


## Botfather, your bot and your token {#botfather-your-bot-and-your-token}

Firsts thing first, you need to create your bot and obtain your token via the **@botfather** bot on telegram. Once you have it, keep it secret.


## Intro to the python api {#intro-to-the-python-api}

There is a python library that makes it extremely easy and painless to write a
telegram bot, it is called [python-telegram-bot](https://python-telegram-bot.org). Although its very complete, I
have only used a tiny part of the library to achieve my requeriments, **send a
message to a telegram channel at a given time, every day.** This is the key function to do it:

```python
  def main():
      token = os.environ["TOKEN"]
      me = os.environ["ME"]

      # Download page
      headers = {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36"
      }

      getPage = requests.get("https://comptrain.co/free-programming/", headers=headers)
      getPage.raise_for_status()  # if error it will stop the program

      # Parse text for foods
      soup = bs4.BeautifulSoup(getPage.text, "html.parser")
      mydivs = soup.findAll("div", {"class": "vc_gitem-zone-mini"}, limit=2)[1]
      date = mydivs.h4.get_text()  # .find('h4').getText()
      date = "<strong>{}</strong>".format(date.upper())

      a = mydivs.find_all(["p", "h2"])[2:]
      buff = "{}".format(date)
      for item in a:
          if not item.has_attr("style") or item.name == "h2":
              buff = "%s%s" % (buff, clean_html(item))

      bot = telegram.Bot(token=token)

      logging.info("Sending {}\n\n".format(buff))

      bot.send_message(chat_id=me, text=buff, parse_mode="html")

      logging.info("%s" % buff)

if __name__ == '__main__':
    logging.info('Starting at %s' % datetime.datetime.now())
    schedule.every().day.at('03:00:00').do(main)
    while True:
        # logging.info('Time %s' % datetime.datetime.now())
        schedule.run_pending()
        sleep(30)
```


## Explain a little bit the code {#explain-a-little-bit-the-code}

Basically the bot does the following:

-   Wait until 3 am PST time
-   Go to the website where the workout is.
-   Parse the webpage with beautiful soup to get and format the workout.
-   Send it to the telegram channel.

Easy!


## Deployment {#deployment}

Now the bot is working, we need to deploy it somewhere in order to execute it
continuously. After a few hours of searching and testing environments, I found
two free hostings, **OpenShift** and **Google Cloud Platform**, both of them work
like a charm. Right now I am using Google Cloud.


### Create a Kubernetes Engine {#create-a-kubernetes-engine}

-   Go to [Google Cloud Platform Kubernetes page](https://console.cloud.google.com/kubernetes/) and create a kubernetes cluster.
-   Go to [Workloads](https://console.cloud.google.com/kubernetes/workload) and create a new container, pointing to the repo that contains the bot.
-   That's it!.


## Final thoughs {#final-thoughs}

That's all!, hope you enjoy it, if you have any question do not hesitate to
comment below.

All the code its on Github, in the repository [_elbaulp/comptrain-bot_](https://github.com/elbaulp/comptrain-bot)

[//]: # "Exported with love from a post written in Org mode"
[//]: # "- https://github.com/kaushalmodi/ox-hugo"
