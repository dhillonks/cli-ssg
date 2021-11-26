# cli-ssg

![stage badge](https://img.shields.io/badge/version-1.0-lightyellow) ![stage badge](https://img.shields.io/badge/license-MIT-green)

Tool to generate html web site from txt or md input

## Installation

```
npm i cli-ssg
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

This processes all the <code>.txt</code> and <code>.md</code> files in <code>sample_dir</code> and generates <code>.html</code> files for each of them. It also creates an <code>index.html</code> with relative links to each page, storing all these files in <code>output_dir</code>.

## Options

```
  -h, --help        Show help                                          [boolean]
  -v, --version     Show version number                                [boolean]
  -i, --input       Input file/folder to be processed        [string] [required]
  -o, --output      Output directory                [string] [default: "./dist"]
  -s, --stylesheet  CSS Stylesheet for the website                      [string]
  -l, --lang        Lang attribute for html element  [string] [default: "en-CA"]
  -c, --config      Pass JSON file for options                          [string]
```

## Features

##### :white_check_mark: Ability to provide a custom output directory

##### :white_check_mark: Ability to provide stylesheet URL

##### :white_check_mark: Recursively parses input nested directories and files

##### :white_check_mark: Automatically generates index.html if multiple txt or md files are present in input directory

##### :white_check_mark: `.md` files now accepted as input

##### :white_check_mark: Ability to parse all markdown syntax to generate HTML

##### :white_check_mark: Ability to specify the language using a `-l` flag

##### :white_check_mark: Pass a JSON file for the options

##### :white_check_mark: Parse title and paragraphs from the input txt files

## Examples

### Simple Example

`cli-ssg -i ".\sample_input.txt" -o "custom_dir" -s "https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css"`

#### sample_input.txt

```
Sample title                   //<---first line followed by 2 empty lines treated as title


This is the first paragraph.
                               //<--- blank spaces treated as paragraph limits
This is the second paragraph.

This is the third paragraph
```

#### custom_dir\sample_output.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Sample title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <h1>Sample title</h1>
    <p>This is the first paragraph.</p>
    <p>This is the second paragraph.</p>
  </body>
</html>
```

### Complex Example

Using multiple text files in the input directory, the following website was created with an auto-generated index.html having links to each individual page:

<https://cli-ssg.vercel.app/>

### Use a config JSON file

A `.JSON` file can also be used to supply arguments instead of using the command line.

```
cli-ssg -i ".\sample_input.txt" -o "custom_dir" -s "https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css"
```

For example, the above is equivalent to

```
cli-ssg -c "config.json"
```

where `config.json`:

```
{
    "input": "./sample_input.txt",
    "output":"custom_dir",
    "stylesheet": "https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css"
}
```

## License

MIT
