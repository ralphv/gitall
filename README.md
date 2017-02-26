## git-recursive - A simple script to run a git command recursively on all git repos

* [Getting started](#getting-started)
* [Usage](#usage)
* [License](#License)

## Getting started

    $ npm install -g git-recursive

## Usage

Use git-recursive with the same command arguments you use for git.

You can use git-recursive or gitall as command alias.

git-recursive will search for all git repos in the current directory and lower level directories and run the same command on them.
If it encounters an error, it will pause for you to acknowledge it.

### License

git-recursive is licensed under the [MIT](https://github.com/ralphv/gitall/raw/master/LICENSE).
