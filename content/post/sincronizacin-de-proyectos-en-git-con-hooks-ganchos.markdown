---
author: alex
categories:
- git
date: 2017-09-08T12:15:30+01:00
lastmod: 2017-09-08T12:15:24+01:00
description: "Cómo sincronizar dos repositorios en git de forma que uno sea el espejo del otro, y cómo mantener sincronizada únicamente una rama."
image: 2013/03/git-logo.png
mainclass: git
tags:
- git
- github
- ganchos en git
- ejemplos ganchos git
- hooks en git
- ejemplos hooks en git
- post-commit
- pre-commit
- post-merge
- sincronizar repositorios en git
- repositorios espejo git
- mirror repos
title: "Sincronización de proyectos en git con hooks (ganchos)"
---

<figure>
    <amp-img sizes="(min-width: 910px) 913px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/03/git-logo.png" title="Sincronización de proyectos en git con hooks (ganchos)" alt="Sincronización de proyectos en git con hooks (ganchos)" width="910px" height="380px" />
</figure>

# Repositorio espejo (Mirror repo)

## Problema

Hace unos días me encontré con un problema a resolver. Supongamos que tenemos dos repositorios en [git](/mini-tutorial-y-chuleta-de-comandos-git/ "Chuleta de comandos en git"), y queremos que todo lo que publicamos en uno se publique automáticamente en el otro, para mantenerlos sincronizados. Ésto es lo que se llama un repo espejo (_mirror repos_)

<!--more--><!--ad-->

## Repositorios a sincronizar

Supongamos que los repositorios se llaman _repo1_ y _repo2_. Pretendemos que _repo2_ esté sincronizado (sea un espejo) del _repo1_. Ésto significa que no tendremos que clonar en ningún momento el _repo2_. En local únicamente tendremos el _repo1_.

## Solución

La respuesta, como es habitual, la encontré tras buscar un poco en _stackoverflow_. Gracias a [Manoj Govindan](http://stackoverflow.com/users/140185/manoj-govindan "Perfil en stackoverflow")

## Añadir repo2 como remote

Dentro de _repo1_ añadiremos un nuevo _remote_ que sea el _repo2_:

```bash

git remote add repo2 <url-repo2>

```

## Configurar el hook (gancho) post-commit

Dentro del repositorio, crearemos un nuevo _hook_ que se ejecute cada vez que hagamos un _commit_ en _repo1_. Por cada _commit_, ejecutaremos un _git push repo2_, lo cual enviará los cambios al _repo2_.

```bash

# Crear el hook que se ejecutará en cada commit
mv .git/hooks/pre-commit.sample .git/hooks/post-commit
# Añadir el comando a ejecutar
echo -e "#!/bin/bash\n\ngit push repo2 -f --mirror" > .git/hooks/post-commit

```

En contenido del _hook_, para que se vea más claro es el siguiente:

```bash

#!/bin/bash

git push repo2 -f --mirror

```

## Conclusión

**Nota:** Con este gancho, se mantendrán sincronizados ambos repositorios. Es necesario notar que tras hacer el _commit_ del _repo1_, sigue siendo necesario ejecutar `git push` en _repo1_


# Mantener sincronizada una única rama

Un problema similar podría ser mantener sincronizado en _repo2_ únicamente las ramas _master_. De forma que podamos crear tantas ramas como necesitemos en _repo1_ sin que se vean reflejadas en _repo2_. Para ello, en lugar de usar el _hook_ `post-commit`, usaremos `post-merge`. Éste _hook_ se ejecutará cada vez que se haga un `git merge <rama distinta de master>` sobre master.

Para activarlo:

```bash

# Crear el hook que se ejecutará en cada commit
mv .git/hooks/pre-commit.sample .git/hooks/post-merge
# Añadir el comando a ejecutar
echo -e "#!/bin/bash\n\ngit push repo2 master:master" > .git/hooks/post-merge
```

El contenido del _hook_ es:

```bash

#!/bin/bash

git push repo2 master:master

```

`git push repo2 master:master` podría leerse como: _Publica en el repo2 en la rama master, el contenido de la rama master del repo actual_

# Referencias

- [Automatically mirror a git repository](http://stackoverflow.com/questions/3583061/automatically-mirror-a-git-repository)
