---
title: Solution of Content-Length Mismatch Composer error
description: >-
  When we run Composer Install/Update, sometimes we got the command stuck on
  that line. We do not know what's happened, this is the solution.
date: 2019-11-01T08:28:55.531Z
tags:
  - Composer
  - Daily Solution
---
![composer](/images/uploads/composer.png "composer")

# Overview

Sometimes you stuck on run `composer install` or `composer update` and you do not know what is happened. I know that feel, 5 minutes ago I got this case (again -_-) and I forget how to solve it. hahaha.
So I think, I must saving those step again on somewhere, so I can look for it again when this problems appear. My blog is the best place for it (alongside gist github).

## Show more verbose message

First, if you got stuck when running `composer install` or `composer update`, try to show more message, with add `-vvv` option on _composer_.

```bash
composer install -vvv
```

After run above command, we will get more message about what is really happened. And then, the "real" problem appear.

![Content-Length Mismatch](/images/uploads/composer-2.png "Content-Length Mismatch")

This error happened because our composer try to download a package that using ``http``. 

```json
http://repo.packagist.org/p/provider-2013%24bd7910f3641ed9bf0e73ef873d4c8f0f83d999a62ada5eee0c03fc6a7db037bf.json
```

## Solution

So, the solution is just to force composer to run only through `https` protocol. Then change all the relate-packages that still run above `http`.

### Edit composer.json

if you do not know the location ofyour composer.json, just type ``composer -vvv``.
Open files, and add this configuration:

```json
{
  "config": {
    "github-protocols": [
      "https,ssh"
    ]
  },
  "repositories": {
    "packagist": {
      "type": "composer",
      "url": "https://packagist.org"
    }
  }
}
```

With this configuration, we will tell the composer to run only through https/ssh protocols, and we change url of packagist.org to respond from https. Done, save it!

Then, let's run again our ```composer install`` and you will see it run smoothly without getting any error/stuck.

Hope this help you! 
