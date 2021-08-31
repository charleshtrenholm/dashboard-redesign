/**
 * @jest-environment jsdom
 */

import { formatSnakeCase, getWSTypeName } from '../stringUtils';

test('formatSnakeCase should alter snakey strings', () => {
  const testStr = 'some_test_string';
  const expected = 'Some test string';
  expect(formatSnakeCase(testStr)).toEqual(expected);
});

test('getWSTypeName should modify type strings', () => {
  const testCases: { [key: string]: string } = {
    'KBaseGenomes.Genome-1.0': 'Genome',
    'KBaseGenomes.Genome': 'Genome',
    'KBaseMatrices.AmpliconMatrix-1.2': 'Amplicon Matrix',
    'KBaseMatrices.AmpliconMatrix': 'Amplicon Matrix',
    'SomeModule.SomeStrangeLongWindedType-1.0': 'Some Strange Long Winded Type',
  };
  Object.keys(testCases).forEach((wsType) => {
    expect(getWSTypeName(wsType)).toEqual(testCases[wsType]);
  });
});

test('getWSTypeName should throw an error with an illegal string', () => {
  const testCases = ['nope', 'also-nope', 'no.way.yo', '$bad.chars'];
  Object.keys(testCases).forEach((wsType) => {
    expect(() => getWSTypeName(wsType)).toThrowError();
  });
});
