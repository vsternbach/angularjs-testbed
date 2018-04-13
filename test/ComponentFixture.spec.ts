import { ComponentFixture, DebugElement } from '../src/';
import 'angular-mocks';

describe('ComponentFixture', () => {
  const el: DebugElement = new DebugElement('body');
  describe('DebugElement', () => {
    it('should have query method the same as find method', () => {
      // const $element: DebugElement = element('html');
      expect(el.query).toBeDefined();
    });
    it('should have nativeElement property the same as angular.element()[0]', () => {
      expect(el.nativeElement).toBeDefined();
      expect(el.nativeElement).toEqual(el[0]);
    });
  });
});
