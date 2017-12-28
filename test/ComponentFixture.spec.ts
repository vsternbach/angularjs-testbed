import { camelToKebab, ComponentFixture, DebugElement } from '../src/';
import * as angular from 'angular';
import 'angular-mocks';
import { element } from 'angular';
// import { platformBrowserDynamic } from 'angular-ts-decorators';

describe('ComponentFixture', () => {
  const el: DebugElement = angular.element('body') as DebugElement;
  describe('DebugElement', () => {
    it('should have query method the same as find method', () => {
      // const $element: DebugElement = element('html');
      expect(el.query).toBeDefined();
      expect(el.query).toEqual(el.find);
    });
    it('should have nativeElement property the same as angular.element()[0]', () => {
      expect(el.nativeElement).toBeDefined();
      expect(el.nativeElement).toEqual(el[0]);
    });
  });
  // describe('debugElement', () => {
  //
  //   // const el: DebugElement = element('body') as DebugElement;
  //   // platformBrowserDynamic().bootstrapModule('ng' as any);
  //   angular.mock.module('ng');
  //   const fixture = new ComponentFixture(el);
  //   const de = fixture.debugElement;
  //   it('should have query method the same as find method', () => {
  //     // const $element: DebugElement = element('html');
  //     expect(de.query).toBeDefined();
  //     expect(de.query).toEqual(de.find);
  //     expect(de.nativeElement).toEqual(de[0]);
  //   });
  //   it('should have nativeElement property', () => {
  //     expect(fixture.nativeElement).toBeDefined();
  //     expect(fixture.nativeElement).toEqual(de.nativeElement);
  //   });
  //   it('should componentInstance property', () => {
  //     expect(fixture.componentInstance).toBeDefined();
  //   });
  // });
});
