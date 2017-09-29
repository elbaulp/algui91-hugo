+++
author = "alex"
date = "2017-02-16T16:50:27+01:00"
lastmod = "2017-09-29T13:21:43+01:00"
title = "Creating trees, Dependency graphs and Support Vector Machines in LaTeX with Tikz"
description = "My computer Science final project was about NLP (Natural Language Processing), writing the memoir I had to draw some trees and a visual representation of SVMs using Latex Tikz library."
tags = ["tikz"]
categories = ["latex", "dev"]
mainclass = "latex"
image = "support-vector-machine-tikz-latex.png"
+++

My computer science final project was about building a dependency parser for Spanish. Writing the documentation I had to draw some trees representing a dependency graph and a visual explanation of what an SVM (Support Vector Machine ) is.

To draw all this pictures I've used `Tikz`, a [LaTeX package](https://elbauldelprogramador.com/en/tags/latex "Post about LaTeX"). Here is the code:

# Drawing a dependency tree with Tikz

<!--more--><!--ad-->

## Example 1

Here is the code:

```latex
\documentclass{standalone}
\usepackage{tikz}
\usepackage{tikz-dependency}

\begin{document}

\begin{dependency}[edge slant=15pt,label theme = simple, edge theme = iron]
  \begin{deptext}[column sep=1em]
    This \& time \& around \& , \& they \& 're \& moving \& even \& faster \&
    . \\
  \end{deptext}
  \deproot{7}{ROOT}
  \depedge{2}{1}{DET}
  \depedge[edge height=1.9cm]{7}{2}{TMOD}
  \depedge{2}{3}{ADVMOD}
  \depedge{7}{6}{AUX}
  \depedge{7}{5}{NSUBJ}
  \depedge{7}{4}{PUNCT}
  \depedge{7}{10}{PUNCT}
  \depedge{7}{9}{ADVMOD}
  \depedge[edge start x offset=-4pt]{9}{8}{ADVMOD}
\end{dependency}

\end{document}
```

And the result:

<figure>
    <a href="/img/dependency-tree.png"><amp-img sizes="(min-width: 799px) 799px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/dependency-tree.png" alt="Dependenty tree in tikz" title="Dependenty tree in tikz" width="799" height="194"></amp-img></a>
    <figcaption>Dependenty tree in tikz</figcaption>
</figure>


## Example 2

```latex
\documentclass{standalone}
\usepackage{tikz}
\usepackage{tikz-qtree,tikz-qtree-compat}

\begin{document}

\tiny
\begin{tikzpicture}[every node/.style={align=center},scale=.9]
  \tikzset{
    edge from parent/.style={
      draw,edge from parent
      path={(\tikzparentnode.south)-- +(0,-8pt)-| (\tikzchildnode)}
    },
    frontier/.style={distance from root=208pt}, % Align leaf nodes
    level 1+/.style={level distance=18pt} % Distance between levels
  }

   \Tree [.S
             [.NP Rolls-Royce\\NNP Motor\\NNP Cars\\NNPS Inc\\NNP ]
             [.VP said\\VBD
                [.SBAR [.none ]
                   [.S
                      [.NP it\\PRP ]
                      [. VP expects\\VBZ
                         [.S
                            [.NP its\\PRP\$ U.S\\NNP sales\\NNS ]
                            [.VP to\\TO
                               [.VP remain\\VB
                                  [.ADJP steady\\JJ ]
                                  [.PP at\\IN
                                     [.NP
                                        [.QP about\\IN 1200\\CD ]
                                        cars\\NNS
                                     ]
                                  ]
                               ]
                            ]
                         ]
                      ]
                   ]
                ]
             ]
         ]
\end{tikzpicture}
\end{document}
```

Result:

<figure>
    <a href="/img/dependency-tree-2.png"><amp-img sizes="(min-width: 926px) 926px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/dependency-tree-2.png" alt="Other Dependency Tree in tikz" title="Other Dependency Tree in tikz" width="926" height="485"></amp-img></a>
    <figcaption>Other Dependency Tree in tikz</figcaption>
</figure>


## Example 3

Finally, one last example:

```latex
\documentclass{standalone}
\usepackage{tikz}
\usepackage{tikz-qtree,tikz-qtree-compat}

\begin{document}
  \begin{tikzpicture}[every node/.style={align=center},level distance=30pt]
    \tikzset{edge from parent/.append style={<-, >=latex,thick}}
   \Tree [.said\\VBD
             [.Inc.\\NNP Rolls-Royce\\NNP Motor\\NNP Cars\\NNPS ]
             [.expects\\VBZ it\\PRP
                [.remain\\VB
                   [.sales\\NNS its\\PRP\$ U.S\\NNP ]
                   to\\TO
                   steady\\JJ
                   [.at\\IN [.cars\\NNS [.about\\IN 1200\\CD ] ] ]
                ]
             ]
           ]
   \end{tikzpicture}
\end{document}
```

<figure>
    <a href="/img/dependency-tree-3.png"><amp-img sizes="(min-width: 795px) 795px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/dependency-tree-3.png" alt="Yet another example of a Dependency tree in tikz" title="Yet another example of a Dependency tree in tikz" width="795" height="513"></amp-img></a>
    <figcaption>Yet another example of a Dependency tree in tikz</figcaption>
</figure>

# Drawing a Support Vector Machine In tikz

I've also had to draw a visual explanation of what a SVM is:

```latex
\documentclass{standalone}
\usepackage{tikz}
\usepackage{tikz-qtree,tikz-qtree-compat}
\usetikzlibrary{calc}

\begin{document}


  \tikzset{
    leftNode/.style={circle,minimum width=.5ex, fill=none,draw},
    rightNode/.style={circle,minimum width=.5ex, fill=black,thick,draw},
    rightNodeInLine/.style={solid,circle,minimum width=.7ex, fill=black,thick,draw=white},
    leftNodeInLine/.style={solid,circle,minimum width=.7ex, fill=none,thick,draw},
  }
  \begin{tikzpicture}[
        scale=2,
        important line/.style={thick}, dashed line/.style={dashed, thin},
        every node/.style={color=black},
    ]
    \draw[dashed line, yshift=.7cm]
       (.2,.2) coordinate (sls) -- (2.5,2.5) coordinate (sle)
       node[solid,circle,minimum width=2.8ex,fill=none,thick,draw] (name) at (2,2){}
       node[leftNodeInLine] (name) at (2,2){}
       node[solid,circle,minimum width=2.8ex,fill=none,thick,draw] (name) at (1.5,1.5){}
       node[leftNodeInLine] (name) at (1.5,1.5){}
       node [above right] {$w\cdot x + b > 1$};

    \draw[important line]
       (.7,.7) coordinate (lines) -- (3,3) coordinate (linee)
       node [above right] {$w\cdot x + b = 0$};

    \draw[dashed line, xshift=.7cm]
       (.2,.2) coordinate (ils) -- (2.5,2.5) coordinate (ile)
       node[solid,circle,minimum width=2.8ex,fill=none,thick,draw] (name) at (1.8,1.8){}
       node[rightNodeInLine] (name) at (1.8,1.8){}
       node [above right] {$w\cdot x + b < -1$};

    \draw[very thick,<->] ($(sls)+(.2,.2)$) -- ($(ils)+(.2,.2)$)
       node[sloped,above, near end] {Margen};

    \foreach \Point in {(.9,2.4), (1.3,2.5), (1.3,2.1), (2,3), (1,2.9)}{
      \draw \Point node[leftNode]{};
    }

    \foreach \Point in {(2.9,1.4), (2.3,.5), (3.3,.1), (2,0.9), (2.5,1)}{
      \draw \Point node[rightNode]{};
    }
  \end{tikzpicture}
\end{document}
```

<figure>
    <a href="/img/support-vector-machine-tikz-latex.png"><amp-img sizes="(min-width: 811px) 811px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/support-vector-machine-tikz-latex.png" alt="Support Vector Machine in Latex with Tikz" title="Support Vector Machine in Latex with Tikz" width="811" height="652"></amp-img></a>
    <figcaption>Support Vector Machine in Latex with Tikz</figcaption>
</figure>

# References

While writing  this snippets, I had to ask some questions on tex.stackexchange.com, those questions can be found in the following links:

- Align all leaf nodes in tikz-qtree | <a href="http://tex.stackexchange.com/questions/340929/align-all-leaf-nodes-in-tikz-qtree" target="_blank" title="Align all leaf nodes in tikz-qtree">tex.stackexchange.com</a>
- Align independent tikzpictures | <a href="http://tex.stackexchange.com/questions/342978/align-independent-tikzpictures" target="_blank" title="Align independent tikzpictures">tex.stackexchange.com</a>
