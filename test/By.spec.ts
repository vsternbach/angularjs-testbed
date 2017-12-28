import { By } from '../src';

describe('By', () => {
  describe('css', () => {
    it('should return the same string as argument', () => {
      const selector = '.some-class';
      expect(By.css(selector)).toEqual(selector);
    });
  });
});
