---
title: Script to check all(?) CLI-tools versioning
description: 'If there are script to check them all once, why check 1 by 1?'
date: 2019-10-24T13:43:20.129Z
tags:
  - Powershell
  - Bash
  - Script
---
So, Today I'm so lazy to check 1 by 1 CLI-tools  that has been installed on my machine. I'm using Windows 10 Pro, and sometimes I forgot what is CLI-Tools that has been installed on my machine with it's version.

So I try to make a simple script to check them all once. I'm using Powershell script since it easier for me. Lets see my code.

The concept of this script is just to check a command version of CLI-tool that we've defined in the script. If there are no CLI command run/success, then it will return message like "Packages does not exists".

First, we need a function to do that. We called it _**Test-Method.**_

```
Function Test-Command {
```

```
     Param ($command)
```

```
     $oldPreference = $ErrorActionPreference
```

```
     $ErrorActionPreference = "stop"
```

```
     try {if(Get-Command $command){RETURN $true}}
```

```
     Catch {Write-Host "packages does not exist on this machine"; RETURN $false}
```

```
     Finally {$ErrorActionPreference=$oldPreference}
```

```
}
```



Then, For check every single CLi-tool that available on our machine, we need to define it's _Command_.

\
`Write-Host 'Go       : '  -ForegroundColor yellow; if(Test-Command go version){go version}`

Script above, will call our _Method_ with _Params_ as our _Command_. Then, just add another CLI-tool that we want to check or available right now.

This is, how it works:\
\
\[![cli37c31f2db06a714f.gif](https://s3.gifyu.com/images/cli37c31f2db06a714f.gif)]

I've created a repository to make another open sourcerer to add another CLI-tools line. I hope someone create a bash script version too. If you interest on this, let me know with fork this [Repository](https://github.com/arhen/all-cli-version-PS/)

Happy coding!
