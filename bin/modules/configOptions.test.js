const { Options } = require('./configOptions');

const fs = require('fs');
jest.mock('fs');

describe('validate input tests', () => {
  let options;

  beforeEach(() => {
    options = new Options();
  });

  test('empty, null and undefined paths should throw error', async () => {
    [null, undefined, ''].forEach((p) => {
      options.input = p;
      expect(() => options.validateInput()).toThrow();
    });
  });

  test('non-existing file should throw error', async () => {
    options.input = 'invalidPath';

    expect(() => options.validateInput()).toThrow(
      'invalidPath does not exist. Input path must be a file or directory'
    );
  });

  test('should validate an existing file', async () => {
    fs.existsSync.mockResolvedValue(true);

    expect(options.validateInput()).toEqual(true);
  });
});

describe('validate defaults', () => {
  test('default output should be dist', async () => {
    expect(Options.DEFAULT_OUTPUT).toEqual('./dist');
  });

  test('default lang should be dist', async () => {
    expect(Options.DEFAULT_LANG).toEqual('fr');
  });
});

describe('validate output tests', () => {
  let options;

  beforeEach(() => {
    options = new Options();
  });

  test('should throw for null, undefined and empty output', async () => {
    [null, undefined, ''].forEach((p) => {
      options.output = p;
      expect(() => options.validateOutput()).toThrow();
    });
  });

  test('should return true for default output', async () => {
    options.output = Options.DEFAULT_OUTPUT;

    expect(options.validateOutput()).toEqual(true);
  });
});
