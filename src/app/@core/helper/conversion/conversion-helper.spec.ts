//#region angular imports

import { async, TestBed } from '@angular/core/testing';

//#endregion angular imports

//#region core imports

//#endregion core imports

//#region functional/model imports

import { ConversionHelper } from '@core/helper/conversion/conversion.helper';

//#endregion functional/model imports

describe('Conversion Helper | ', () => {

  //#region int conversions

  describe('Int conversions | ', () => {

    let defaultValue: number = 0;

    //#region string to int

    describe('string to int | ', () => {

      //#region default value provided

      describe('default value is provided | ', () => {

        it('input string is undefined/null/empty/whitespace; Expected: returns default value', async(() => {
          defaultValue = 1;

          expect(ConversionHelper.toNumber(undefined, defaultValue)).toBe(defaultValue, 'toNumber did not return default value when string input value is undefined');
          expect(ConversionHelper.toNumber(null, defaultValue)).toBe(defaultValue, 'toNumber did not return default value when string input value is null');
          expect(ConversionHelper.toNumber('', defaultValue)).toBe(defaultValue, 'toNumber did not return default value when string input value is empty');
          expect(ConversionHelper.toNumber('  ', defaultValue)).toBe(defaultValue, 'toNumber did not return default value when string input value is whitespace');

        }));

        it('input string is valid number; Expected: returns number', async(() => {
          defaultValue = 1;
          let input: string = '567';
          let output: number = 567;
          expect(ConversionHelper.toNumber(input, defaultValue)).toBe(output, 'toNumber did not return number output when string input value is valid number');

        }));

        it('input string is invalid number; Expected: returns default value', async(() => {
          defaultValue = 1;
          let input: string = 'abc';
          let output: number = defaultValue;
          expect(ConversionHelper.toNumber(input, defaultValue)).toBe(output, 'toNumber did not return default value output when string input value is invalid number');

        }));

      });

      //#endregion default value provided

      //#region default value not provided

      describe('default value is not provided | ', () => {

        it('input string is undefined/null/empty/whitespace; Expected: returns default value 0', async(() => {
          expect(ConversionHelper.toNumber(undefined)).toBe(0, 'toNumber did not return 0 when string input value is undefined');
          expect(ConversionHelper.toNumber(null)).toBe(0, 'toNumber did not return 0 when string input value is null');
          expect(ConversionHelper.toNumber('')).toBe(0, 'toNumber did not return 0 when string input value is empty');
          expect(ConversionHelper.toNumber('  ')).toBe(0, 'toNumber did not return 0 when string input value is whitespace');

        }));

        it('input string is valid number; Expected: returns number', async(() => {
          let input: string = '567';
          let output: number = 567;
          expect(ConversionHelper.toNumber(input)).toBe(output, 'toNumber did not return number output when string input value is valid number');

        }));

        it('input string is invalid number; Expected: returns default value', async(() => {
          let input: string = 'abc';
          let output: number = 0;
          expect(ConversionHelper.toNumber(input)).toBe(output, 'toNumber did not return default value output when string input value is invalid number');

        }));

      });

      //#endregion default value not provided

    });

    //#endregion string to int

  });

  //#endregion int conversions

  //#region boolean conversions

  describe('Boolean conversions | ', () => {

    let defaultValue: boolean = false;

    //#region string to boolean

    describe('string to boolean | ', () => {

      //#region default value provided

      describe('default value is provided | ', () => {

        it('input string is undefined/null/empty/whitespace; Expected: returns default value', async(() => {
          defaultValue = true;

          expect(ConversionHelper.toBoolean(undefined, defaultValue)).toBe(defaultValue, 'toBoolean did not return default value when string input value is undefined');
          expect(ConversionHelper.toBoolean(null, defaultValue)).toBe(defaultValue, 'toBoolean did not return default value when string input value is null');
          expect(ConversionHelper.toBoolean('', defaultValue)).toBe(defaultValue, 'toBoolean did not return default value when string input value is empty');
          expect(ConversionHelper.toBoolean('  ', defaultValue)).toBe(defaultValue, 'toBoolean did not return default value when string input value is whitespace');

        }));

        it('input string is true string; Expected: returns true', async(() => {
          defaultValue = true;
          let input: string = 'true';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is TRUE string; Expected: returns true', async(() => {
          defaultValue = true;
          let input: string = 'TRUE';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is tRUe string; Expected: returns true', async(() => {
          defaultValue = true;
          let input: string = 'tRUe';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is yes string; Expected: returns true', async(() => {
          defaultValue = true;
          let input: string = 'yes';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is YES string; Expected: returns true', async(() => {
          defaultValue = true;
          let input: string = 'YES';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is yEs string; Expected: returns true', async(() => {
          defaultValue = true;
          let input: string = 'yEs';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is bit 1 string; Expected: returns true', async(() => {
          defaultValue = true;
          let input: string = '1';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is false string; Expected: returns false', async(() => {
          defaultValue = true;
          let input: string = 'false';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is FALSE string; Expected: returns false', async(() => {
          defaultValue = true;
          let input: string = 'FALSE';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is fALSe string; Expected: returns false', async(() => {
          defaultValue = true;
          let input: string = 'fALSe';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is no string; Expected: returns false', async(() => {
          defaultValue = true;
          let input: string = 'no';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is NO string; Expected: returns false', async(() => {
          defaultValue = true;
          let input: string = 'NO';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is nO string; Expected: returns false', async(() => {
          defaultValue = true;
          let input: string = 'nO';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is bit 0 string; Expected: returns false', async(() => {
          defaultValue = true;
          let input: string = '0';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is invalid boolean value; Expected: returns default value', async(() => {
          defaultValue = true;
          let input: string = 'abc';
          let output: boolean = defaultValue;
          expect(ConversionHelper.toBoolean(input, defaultValue)).toBe(output, 'toBoolean did not return default value output when string input value is invalid boolean');

        }));

      });

      //#endregion default value provided

      //#region default value not provided

      describe('default value is not provided | ', () => {

        it('input string is undefined/null/empty/whitespace; Expected: returns default value false', async(() => {
          expect(ConversionHelper.toBoolean(undefined)).toBe(false, 'toBoolean did not return false when string input value is undefined');
          expect(ConversionHelper.toBoolean(null)).toBe(false, 'toBoolean did not return false when string input value is null');
          expect(ConversionHelper.toBoolean('')).toBe(false, 'toBoolean did not return false when string input value is empty');
          expect(ConversionHelper.toBoolean('  ')).toBe(false, 'toBoolean did not return false when string input value is whitespace');

        }));

        it('input string is true string; Expected: returns true', async(() => {
          let input: string = 'true';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is TRUE string; Expected: returns true', async(() => {
          let input: string = 'TRUE';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is tRUe string; Expected: returns true', async(() => {
          let input: string = 'tRUe';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is yes string; Expected: returns true', async(() => {
          let input: string = 'yes';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is YES string; Expected: returns true', async(() => {
          let input: string = 'YES';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is yEs string; Expected: returns true', async(() => {
          let input: string = 'yEs';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is bit 1 string; Expected: returns true', async(() => {
          let input: string = '1';
          let output: boolean = true;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return true output when string input value is valid boolean string');

        }));

        it('input string is false string; Expected: returns false', async(() => {
          let input: string = 'false';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is FALSE string; Expected: returns false', async(() => {
          let input: string = 'FALSE';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is fALSe string; Expected: returns false', async(() => {
          let input: string = 'fALSe';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is no string; Expected: returns false', async(() => {
          let input: string = 'no';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is NO string; Expected: returns false', async(() => {
          let input: string = 'NO';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is nO string; Expected: returns false', async(() => {
          let input: string = 'nO';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is bit 0 string; Expected: returns false', async(() => {
          let input: string = '0s';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return false output when string input value is valid boolean string');

        }));

        it('input string is invalid boolean value; Expected: returns default value', async(() => {
          let input: string = 'abc';
          let output: boolean = false;
          expect(ConversionHelper.toBoolean(input)).toBe(output, 'toBoolean did not return default value output when string input value is invalid boolean');

        }));

      });

      //#endregion default value not provided

    });

    //#endregion string to boolean

  });

  //#endregion boolean conversions

});
