# cli-ssg

![stage badge](https://img.shields.io/badge/version-0.1-lightyellow) ![stage badge](https://img.shields.io/badge/license-MIT-green)

Tool to generate html web site from txt input

## Installation

```
npm i -g .
npm link
```

## Usage

```
cli-ssg -i "sample_file.txt"
```
This processes text from <code>sample_file.txt</code> and generates <code>sample_file.html</code>
```
cli-ssg -i "sample_file.txt" -s "./stylesheet.css"
```
Same as above, however <code>sample_file.html</code> now uses <code>./stylesheet.css</code>
```
cli-ssg -i "sample_dir" -o "output_dir"
```
This processes all the <code>.txt</code> files in <code>sample_dir</code> and generates <code>.html</code> files for each of them. It also creates an <code>index.html</code> with relative links to each page, storing all these files in <code>output_dir</code>.

## Options

```
  -h, --help        Show help                                          [boolean]
  -v, --version     Show version number                                [boolean]
  -i, --input       Input file/folder to be processed        [string] [required]
  -o, --output      Output directory                [string] [default: "./dist"]
  -s, --stylesheet  CSS Stylesheet for the website                      [string]
  ```
  
## License
MIT
  
  
