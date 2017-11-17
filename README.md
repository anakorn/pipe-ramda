# Usage
```sh
# prints ['SOME', 'VALID', 'JSON']
$ echo "['some', 'valid', 'json']" | pipe-ramda "_.map(x => x.toUpperCase())"
```
