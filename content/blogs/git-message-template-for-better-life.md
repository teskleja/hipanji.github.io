+++
title = "Git Message Template for Better Life"
description = "Most of commit message are saying about WHAT was done instead of WHY. This is a wrong approache."
date = 2019-10-27T18:21:58+08:00
tags = ["Git"]
draft = true
+++

> Most of Commit message are 'useless' because people always focus on WHAT was done instead of WHY!

# Overview

When I work with another coder, they almost using one inline commit message and put some "junky" message like fixed type, fixed bug, add new component, etc. This is OKAY if you are working with yourself, alone. But this style of message, run throught the team collaboration, then make another people trying to understand whats going on with open your changes and read through the line after line. So for a better approaches especially on a team, we need a template that will explain more clearly about what's going on and WHY of this commit should be made.

# Template

This is just what I prefer to be using on my team. You can change to suit what is your team needs.

```text
# Commit Title (50 chars)

# Why? Issue, enhancement, etc.

# How does it address the why?

# Tickets, Links, etc...
```

## Save the template on absolute path on your machine

Save this template as ``.git_msg_template.txt`` (read: whatever you want). If you don't have environment HOME paths, then do an absolute path.

### Linux, Mac

``${HOME}/.git_msg_template.txt``

### windows

``%HOME%/.git_msg_template.txt``

## Activating the template

So now we have template, then we just need ``git command`` to  activating it.
open terminal/cmd/powershell, then type this command:

### Linux, Mac (Terminal)

```git
git config --global commit.template ${HOME}/.git_msg_template.txt
```

### WIndows (CMD)

```git
git config --global commit.template ${HOME}/.git_msg_template.txt
```

## Optional Step

There are people who did not their default code editor with ``git command``. We need to configure it, so whenever we try to commit a message, it will open that code editor with the template.

We can do this with ``git command`` again. Open CMD/Powershell/Terminal, then type:

```git
git config --global core.editor "code"
```

With this, I set up my global configuration of git to always using VSCode editor as default.

## How to Use Template

If we have been setup the template and editor, whenever we type:

``git commit``

it will open our template that we have been setup before.

if there are any question about this, let me know with comment below. Or, do you have another approache? share it here. Thanks for reading, hope you enjoy it :sunglasses: :+1:!
