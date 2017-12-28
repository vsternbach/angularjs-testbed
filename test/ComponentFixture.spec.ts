import { ComponentFixture, DebugElement } from '../src/';
import { element } from 'angular';

describe('ComponentFixture', () => {
  const fixture = new ComponentFixture(element('html'));
  const de = fixture.debugElement;
  describe('$', () => {
    it('should have query method the same as find method', () => {
      // const $element: DebugElement = element('html');
      expect(element.prototype['query']).toBeDefined();
      expect(element.prototype['query']).toEqual(element.prototype.find);
      expect(element.prototype.nativeElement).toBeDefined();
    });
    // it('should have nativeElement property', () => {
    //   expect(fixture.nativeElement).toBeDefined();
    //   expect(fixture.nativeElement).toEqual(de.nativeElement);
    // });
    // it('should componentInstance property', () => {
    //   expect(fixture.componentInstance).toBeDefined();
    // });
  });
  describe('debugElement', () => {
    it('should have query method the same as find method', () => {
      // const $element: DebugElement = element('html');
      expect(de.query).toBeDefined();
      expect(de.query).toEqual(de.find);
      expect(de.nativeElement).toEqual(de[0]);
    });
    it('should have nativeElement property', () => {
      expect(fixture.nativeElement).toBeDefined();
      expect(fixture.nativeElement).toEqual(de.nativeElement);
    });
    it('should componentInstance property', () => {
      expect(fixture.componentInstance).toBeDefined();
    });
  });
});
