# Git-Compose

![Git](http://www.akshatsinha.com/uploads/4/2/5/7/42576291/4811232.png?158)

## Installation
```
npm install git-compose
```

## Usage

```sh
$ git-compose init
$ git-compose install
```

## Porting from Overcommit
> WORK IN PROGRESS. Please contribute to the git [repo](https://github.com/JulianKnodt/git-compose).

Run in directory with overcommit.yml
```sh
$ git port 
```

# Contributing

###### This library is currently a WIP, any help would be much appreciated.
---
### Structure

##### Hooks
* Hooks are referenced by their relative path from overcommit.json
* Resolved to absolute path when installed for reliability
* Each hook is passed to a wrapper along with all of the arguments passed by the git hook
* Creating a new hook involves creating a matching wrapper

###### TODO
1. Parallelize hooks
2. Allow shared resources (hooks might read file and not having to read it multiple times)
3. Allow parameters to be passed to hooks.

##### Wrappers
 * Each hook is analyzed for the language of the file
 * If there is a wrapper for that language, it's appended to the corresponding hook in .git/hooks
 * Wrappers are referenced by relative path to overcommit.json and resolved to absolute.
 * Wrappers take the filepath of a hook as well as the rest of the parameters that are passed to it.
 * Wrappers should invoke the file located at the filepath with the other parameters.
###### TODO
1. Enforce stricter wrappers
2. Allow wrappers to accept multiple hooks
3. Wrappers should be able to parallelize hooks and determine which ones fail and log them properly.


### Planned

1. Fully fix porting old overcommit files
2. Tests.
3. Add Ability to pass options to hooks
4. Add CLI commands to create new hooks from templates
5. Add CLI commands to remove hooks
6. Addd more wrappers

### License
---
MIT

