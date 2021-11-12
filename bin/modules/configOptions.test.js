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
