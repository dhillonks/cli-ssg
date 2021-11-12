const { convertFileToHtml } = require('./generateHtml');

const fs = require('fs');

describe('convert txt file to html tests', () => {
  let inputFilePath = './testFile.txt';
  const fileInput = `sample input`;

  beforeEach(() => {
    fs.writeFileSync(inputFilePath, fileInput);
  });

  afterAll(() => {
    fs.unlinkSync(inputFilePath);
  });

  test('html should be generated', async () => {
    const generatedHTML = convertFileToHtml(inputFilePath);

    expect(generatedHTML).toContain('<html');
  });

  test('h1 tag should be generated from txt file', async () => {
    const generatedHTML = convertFileToHtml(inputFilePath);

    expect(generatedHTML.replace(/\s+/g, '')).toBe(
      `<!doctypehtml><htmllang="undefined"><head><metacharset="utf-8"><title>sampleinput</title><metaname="viewport"content="width=device-width,initial-scale=1"><linkhref="undefined"rel="stylesheet"></head><body><h1>sampleinput</h1></body></html>`
    );
  });

  test('stylesheet attribute should be rendered as a link tag', async () => {
    const generatedHTML = convertFileToHtml(inputFilePath, 'styleSheetURI');

    expect(generatedHTML.replace(/\s+/g, '')).toBe(
      `<!doctypehtml><htmllang=\"undefined\"><head><metacharset=\"utf-8\"><title>sampleinput</title><metaname=\"viewport\"content=\"width=device-width,initial-scale=1\"><linkhref=\"styleSheetURI\"rel=\"stylesheet\"></head><body><h1>sampleinput</h1></body></html>`
    );
  });

  test('lang attribute should be present in html', async () => {
    const generatedHTML = convertFileToHtml(
      inputFilePath,
      'styleSheetURI',
      'fr'
    );

    expect(generatedHTML.replace(/\s+/g, '')).toBe(
      `<!doctypehtml><htmllang=\"fr\"><head><metacharset=\"utf-8\"><title>sampleinput</title><metaname=\"viewport\"content=\"width=device-width,initial-scale=1\"><linkhref=\"styleSheetURI\"rel=\"stylesheet\"></head><body><h1>sampleinput</h1></body></html>`
    );
  });
});
