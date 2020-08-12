//#region angular imports

import { async, TestBed } from '@angular/core/testing';

//#endregion angular imports

//#region core imports

//#endregion core imports

//#region functional/model imports

import { StringHelper } from '@core/helper/string/string.helper';

//#endregion functional/model imports

describe('String Helper | ', () => {

  //#region StringFormat

  describe('String Format | ', () => {

    it('input string is undefined/null/empty; Expected: returns empty value', async(() => {
      let output = '';

      expect(StringHelper.format(undefined)).toBe(output, 'format did not return empty value when string input value is undefined');
      expect(StringHelper.format(null)).toBe(output, 'format did not return empty value when string input value is null');
      expect(StringHelper.format('')).toBe(output, 'format did not return empty value when string input value is empty');

    }));

    it('input string is having no arg place holders and no arg params; Expected: returns input value', async(() => {
      let input = '  format value';
      let output = input;
      expect(StringHelper.format(input)).toBe(output, 'format did not return input value when string input value is having no args place holders');
    }));

    it('input string is having no arg place holders and having arg params; Expected: returns input value', async(() => {
      let input = '  format value';
      let output = input;
      expect(StringHelper.format(input, 'abc')).toBe(output, 'format did not return input value when string input value is having no args place holders');
    }));

    it('input string is having arg place holders and having arg params; Expected: returns input value with args', async(() => {
      let input = 'format value {0} test {1} string';
      let output = 'format value param1 test param2 string';
      expect(StringHelper.format(input, 'param1', 'param2')).toBe(output, 'format did not return input value with args when string input value is having args place holders');
    }));

    it('input string is having arg place holders less than arg params; Expected: returns input value with args for number of place holders defined', async(() => {
      let input = 'format value {0} test string';
      let output = 'format value param1 test string';
      expect(StringHelper.format(input, 'param1', 'param2')).toBe(output, 'format did not return input value with args when string input value is having args place holders less than args passed');
    }));

    it('input string is having arg place holders number greater than arg params; Expected: returns input value with args for number of place holders defined', async(() => {
      let input = 'format value {1} test string';
      let output = 'format value param1 test string';
      expect(StringHelper.format(input, 'param1')).toBe(output, 'format did not return input value with args when string input value is having args place holders greater than args passed');
    }));

    it('input string is having arg place holders and arg params as undefiend or null; Expected: returns input value without args for number of place holders defined', async(() => {
      let input = 'format {0} value {1} test {2} string';
      let output = 'format  value  test param string';
      expect(StringHelper.format(input, null, undefined, 'param')).toBe(output, 'format did not return input value without args when string input value is having args as null or undefined');
    }));

  });

  //#endregion String Format
  //#region String Concat

  describe('String Concat | ', () => {

    it('input1 and input 2 are undefined/null/empty; Expected: returns empty value', async(() => {
      let output = '';

      expect(StringHelper.concat(undefined, undefined)).toBe(output, 'concat did not return empty value when string input value is undefined');
      expect(StringHelper.concat(null, null)).toBe(output, 'concat did not return empty value when string input value is null');
      expect(StringHelper.concat('', '')).toBe(output, 'concat did not return empty value when string input value is empty');

    }));

    it('input1 is undefined/null/empty and input2 is defined; Expected: returns input2', async(() => {
      let input2 = 'abc';
      let output = input2;

      expect(StringHelper.concat(undefined, input2)).toBe(output, 'concat did not return input2 value when string input1 value is undefined');
      expect(StringHelper.concat(null, input2)).toBe(output, 'concat did not return input2 value when string input1 value is null');
      expect(StringHelper.concat('', input2)).toBe(output, 'concat did not return input2 value when string input1 value is empty');

    }));

    it('input2 is undefined/null/empty and input1 is defined; Expected: returns input1', async(() => {
      let input1 = 'abc';
      let output = input1;

      expect(StringHelper.concat(input1, undefined)).toBe(output, 'concat did not return input1 value when string input2 value is undefined');
      expect(StringHelper.concat(input1, null)).toBe(output, 'concat did not return input1 value when string input2 value is null');
      expect(StringHelper.concat(input1, '')).toBe(output, 'concat did not return input1 value when string input2 value is empty');

    }));

    it('input1 and input 2 are defined strings; Expected: returns input1+input2', async(() => {
      let input1 = 'abc';
      let input2 = 'xyz';
      let output = input1 + input2;

      expect(StringHelper.concat(input1, input2)).toBe(output, 'concat did not return input1+input2 value when input1 and input2 value are defined');
    }));

  });

  //#endregion String Format

  //#region Safe Trim

  describe('Safe Trim | ', () => {

    it('input string is undefined/null/empty/whitespace; Expected: returns empty value', async(() => {
      let output = '';

      expect(StringHelper.toSafeTrim(undefined)).toBe(output, 'toSafeTrim did not return empty value when string input value is undefined');
      expect(StringHelper.toSafeTrim(null)).toBe(output, 'toSafeTrim did not return empty value when string input value is null');
      expect(StringHelper.toSafeTrim('')).toBe(output, 'toSafeTrim did not return empty value when string input value is empty');
      expect(StringHelper.toSafeTrim('  ')).toBe(output, 'toSafeTrim did not return empty value when string input value is whitespace');

    }));

    it('input string is having leading whitespace; Expected: returns trimmed value', async(() => {
      let input = '  leading space';
      let output = 'leading space';
      expect(StringHelper.toSafeTrim(input)).toBe(output, 'toSafeTrim did not return trimmed value when string input value is defined');
    }));

    it('input string is having trailing whitespace; Expected: returns trimmed value', async(() => {
      let input = 'leading space  ';
      let output = 'leading space';
      expect(StringHelper.toSafeTrim(input)).toBe(output, 'toSafeTrim did not return trimmed value when string input value is defined');
    }));

    it('input string is having leading and trailing whitespace; Expected: returns trimmed value', async(() => {
      let input = '  leading space  ';
      let output = 'leading space';
      expect(StringHelper.toSafeTrim(input)).toBe(output, 'toSafeTrim did not return trimmed value when string input value is defined');
    }));

    it('input string is having no whitespace; Expected: returns input value', async(() => {
      let input = 'leading space';
      expect(StringHelper.toSafeTrim(input)).toBe(input, 'toSafeTrim did not return input value when string input value is defined with no whitespaces');
    }));

    it('input string is having space in between characters; Expected: returns input value', async(() => {
      let input = 'lead ing spa ce';
      expect(StringHelper.toSafeTrim(input)).toBe(input, 'toSafeTrim did not return input value when string input value is defined with no whitespaces');
    }));

  });

  //#endregion Safe Trim

  //#region Safe Lower

  describe('Safe Lower | ', () => {

    it('input string is undefined/null/empty/whitespace; Expected: returns empty value', async(() => {
      let output = '';

      expect(StringHelper.toSafeLower(undefined)).toBe(output, 'toSafeLower did not return empty value when string input value is undefined');
      expect(StringHelper.toSafeLower(null)).toBe(output, 'toSafeLower did not return empty value when string input value is null');
      expect(StringHelper.toSafeLower('')).toBe(output, 'toSafeLower did not return empty value when string input value is empty');

    }));

    it('input string is having all lower characters; Expected: returns input value', async(() => {
      let input = 'leading space';
      let output = input;
      expect(StringHelper.toSafeLower(input)).toBe(output, 'toSafeLower did not return input value when string input value is all lower case');
    }));

    it('input string is having all lower characters with white spaces; Expected: returns input value', async(() => {
      let input = '  leading space  ';
      let output = input;
      expect(StringHelper.toSafeLower(input)).toBe(output, 'toSafeLower did not return input value when string input value is all lower case');
    }));

    it('input string is having all upper characters; Expected: returns input value as lower case', async(() => {
      let input = 'LEADING SPACE';
      let output = 'leading space';
      expect(StringHelper.toSafeLower(input)).toBe(output, 'toSafeLower did not return input value as lowers when string input value is all upper case');
    }));

    it('input string is having lower and upper characters; Expected: returns input value as lower case', async(() => {
      let input = 'LEAdiNG SPacE';
      let output = 'leading space';
      expect(StringHelper.toSafeLower(input)).toBe(output, 'toSafeLower did not return input value as lowers when string input value is having lower and upper case');
    }));

  });

  //#endregion Safe Lower  //#region Safe Upper

  describe('Safe Upper | ', () => {

    it('input string is undefined/null/empty/whitespace; Expected: returns empty value', async(() => {
      let output = '';

      expect(StringHelper.toSafeUpper(undefined)).toBe(output, 'toSafeLower did not return empty value when string input value is undefined');
      expect(StringHelper.toSafeUpper(null)).toBe(output, 'toSafeLower did not return empty value when string input value is null');
      expect(StringHelper.toSafeUpper('')).toBe(output, 'toSafeLower did not return empty value when string input value is empty');

    }));

    it('input string is having all upper characters; Expected: returns input value', async(() => {
      let input = 'LEADING SPACE';
      let output = input;
      expect(StringHelper.toSafeUpper(input)).toBe(output, 'toSafeUpper did not return input value when string input value is all upper case');
    }));

    it('input string is having all upper characters with white spaces; Expected: returns input value', async(() => {
      let input = '  LEADING SPACE  ';
      let output = input;
      expect(StringHelper.toSafeUpper(input)).toBe(output, 'toSafeUpper did not return input value when string input value is all upper case');
    }));

    it('input string is having all lower characters; Expected: returns input value as upper case', async(() => {
      let input = 'leading space';
      let output = 'LEADING SPACE';
      expect(StringHelper.toSafeUpper(input)).toBe(output, 'toSafeUpper did not return input value as uppers when string input value is all lower case');
    }));

    it('input string is having lower and upper characters; Expected: returns input value as lower case', async(() => {
      let input = 'LEAdiNG SPacE';
      let output = 'LEADING SPACE';
      expect(StringHelper.toSafeUpper(input)).toBe(output, 'toSafeUpper did not return input value as uppers when string input value is having lower and upper case');
    }));

  });

  //#endregion Safe Upper

});
