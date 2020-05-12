+++
title = "Configure CircleCi for a monorepo"
author = ["alex"]
description = "Configure circleci for a monorepo set up"
date = 2020-05-12T21:22:00+02:00
lastmod = 2020-05-12T21:41:00+02:00
categories = ["dev"]
url = "/en/configure-circleci-monorepo"
draft = false
+++

It's been a very long time since I last wrote on the blog. Since then a lot of things have happened, one of the more important ones is that I moved to Germany to work for MOIA GMBH as Data Engineer. And as a consequence here is this post, which is one of the task I've been doing last days. Lets start.

First of all, I started working from this example on [how to configure circleci for monorepos](https://github.com/labs42io/circleci-monorepo) and started to adapt it for our use case.


## How it works {#how-it-works}

The basic behavior behind this configuration can be found in the **[how it works](https://github.com/labs42io/circleci-monorepo#how-it-works)** section of the repo. Basically, each project/service have to be added as both a pipeline parameter to the circleci config and as workflows. In the latter we would be able to configure the particularities of each individual project/service.

Lastly, the orchestrator in charge of launching the actual jobs it's the `trigger-workflows` job, which calls a bash script to call the circleci API and launch only the jobs for the project/services that actually were affected by some commit.


## Circleci Config.yml file {#circleci-config-dot-yml-file}

The beggining of our circleci config file looks something like this:

```conf
version: 2.1

parameters:
  # This parameter is used to trigger the main workflow
  trigger:
    type: boolean
    default: true

  # A parameter per package
  service1:
    type: boolean
    default: false

  service2:
    type: boolean
    default: false

executors:
  python:
    docker:
      - image: circleci/python
```

Here we are defining two services, and the main job that will trigger the services as needed. `executors` is used to run a Docker image in each job, it is possible to have multiple executors and use any of them as required for each service.

Now, we need to define the `jobs` section, it looks somehing like this:

```conf
jobs:
  trigger-workflows:
    executor: python
    steps:
      - checkout
      - run:
          name: Trigger workflows
          command: chmod +x .circleci/circle_trigger.sh && .circleci/circle_trigger.sh

  build:
    parameters:
      e:
        type: executor
        default: python
      package_name:
        type: string
      jdk:
        type: boolean
        default: false
      mvn:
        type: boolean
        default: false
      python-env:
        type: boolean
        default: true
```

`trigger-workflows` as I mentioned previously, its the main job. In the `build` section, you can specify as many parameters as you need. In this case I have set up this ones to know when JDK is required for the job, maven or python. Also, there is another variable called `e`, which allow me to specify different executors (aka Docker images) for each job, if needed.

Next the steps for each job is defined as follows:

```conf
executor: << parameters.e >>
working_directory: ~/project/<< parameters.package_name >>

steps:
  - checkout:
      path: ~/project
  - run:
      name: Install Dependences
      command: sudo apt-get update
  - when:
      condition: << parameters.jdk >>
      steps:
         - run: sudo apt-get install openjdk-8-jdk
  - when:
      condition: << parameters.python-env >>
      steps:
        - restore_cache:
          # when lock file changes, use increasingly general patterns to restore cache
            key: v2-<< parameters.package_name >>-{{ arch }}-{{ .Branch }}-{{ checksum "poetry.lock" }}
        - run:
            name: Pre-config
            command: |
               sudo chown -R circleci:circleci /usr/local/bin
               sudo chown -R circleci:circleci /usr/local/lib/python*
               ../configure_circleci.sh "poetry"
        - run:
            name: Build
            command: |
               echo -e "\e[96mBUILDING << parameters.package_name >>\e"
               poetry install
        - save_cache:
            key: v2-<< parameters.package_name >>-{{ arch }}-{{ .Branch }}-{{ checksum "poetry.lock" }}
            paths:
                - ~/.local/share/virtualenvs/venv  # this path depends on where pipenv creates a virtualenv
                - "~/.cache/pypoetry/virtualenvs"
                - ".venv"
                - "~/.pip"
                - "~/.config/pypoetry"
        - run: make test
  - when:
       condition: << parameters.mvn >>
       steps:
         - restore_cache:
            keys:
            # when lock file changes, use increasingly general patterns to restore cache
              - maven-repo-v1-{{ .Branch }}-{{ checksum "pom.xml" }}
              - maven-repo-v1-{{ .Branch }}-
              - maven-repo-v1-
         - run: sudo apt-get install maven
         - run: ../configure_circleci.sh "mvn"
         - run: mvn compile
         - save_cache:
            paths:
               - ~/.m2
            key: maven-repo-v1-{{ .Branch }}-{{ checksum "pom.xml" }}
         - run: mvn test
  - persist_to_workspace:
      root: ~/project
      paths:
        - << parameters.package_name >>
```

You can see above how you can especify in `executor` which Docker image to use using the parameter `e` mentioned above. Also, one important thing is to define a good key for `caching` dependencies and other installed packages to speed up the job. With the use of _conditional rules_ you can control the flow of execution for each job. Above for example I can decide if I need to install JDK or not based on supply parameters.

Finally, the only thing it is left is the declaration of the `workflows`:

```config
workflows:
  version: 2

  # The main workflow responsible for triggering all other workflows
  # in which changes are detected.
  ci:
    when: << pipeline.parameters.trigger >>
    jobs:
      - trigger-workflows

  # Workflows defined for each package.
  service1:
    when: << pipeline.parameters.service1 >>
    jobs:
      - build:
          jdk: true
          name: service1-build
          package_name: service1
          e: python
  service2:
    when: << pipeline.parameters.service2 >>
    jobs:
      - build:
          jdk: true
          mvn: true
          python-env: false
          name: service2-build
          package_name: service2
```

As you can see, here is were you can use additional parameters to customize each job.


## Troubleshooting {#troubleshooting}


### "message" : "Project not found" {#message-project-not-found}

I faced some problems while developing this approach, the first of them was I was getting the following response from circleci API:

```json
{
    "message" : "Project not found"
}
```

The problem was the original code was calling the API like this:

```bash
curl -s -u "${CIRCLE_TOKEN}:"
```

I needed to specify it as as HTTP header:

```bash
curl -s -H "Circle-Token: ${CIRCLE_TOKEN}"
```


### Failed to unarchive cache {#failed-to-unarchive-cache}

While restoring circleci cache, I was getting this kind of errors:

```nil
Unarchiving cache...

Failed to unarchive cache

Error untarring cache: Error extracting tarball * : tar: 8: Cannot create symlink to ‘**’: File exists tar: **
Cannot open: File exists tar: *: Cannot open: File exists tar: **
```

This was caused by wanting to cache too broad directories like `/usr/local/bin` etc.


### botocore.exceptions.NoRegionError: You must specify a region {#botocore-dot-exceptions-dot-noregionerror-you-must-specify-a-region}

This is solved easily adding `AWS_DEFAULT_REGION` environment variable in the circleci dashboard


## Conclusion {#conclusion}

From now on, you can integrate circle ci with your monorepo and build, test, deploy or do what you need. Hope you liked it!

[//]: # "Exported with love from a post written in Org mode"
[//]: # "- https://github.com/kaushalmodi/ox-hugo"
