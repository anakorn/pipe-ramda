# Usage
```sh
$ cat ./package.json | pipe-ramda 'compose(map(toUpper), Object.keys)'
[
    "NAME",
    "VERSION",
    "DESCRIPTION",
    "AUTHOR",
    "LICENSE",
    "BIN",
    "DEPENDENCIES",
    "ENGINES"
]
```
