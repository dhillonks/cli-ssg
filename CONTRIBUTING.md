# Contributing

When contributing to this repository, please first discuss the change you wish to make via issues.

## Formatting

We use `prettier` to format our code. To format your code, simply run:

```
npm run prettier
```

To check the files that are already formatted, rather than overriding them:

```
npm run prettier-check
```

## Linting

We use `ESLint` to lint our code. To run the linter, simply run:

```
npm run eslint
```

## Running tests

`jest` is used to write and run test our code. To run the existing tests, simply run:

```
npm test
```

to run a single test or test file:

```
npm test -- "filePath"
```

to have `jest` watch for changes and run tests automatically when the test or source code is updated:

```
npm test-watch
```

## Pull Request Process

1. Update the README.md to reflect changes as necessary.
2. Pull requests may only be merged with an approving review.
