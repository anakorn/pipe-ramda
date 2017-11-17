# Usage
```sh
$ echo "['some', 'valid', 'json']" \
$     pipe-ramda "_.map(x => x.toUpperCase())"
# ['SOME', 'VALID', 'JSON']
```
