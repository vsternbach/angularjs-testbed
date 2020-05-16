import { DebugElement } from './DebugElement';
import * as angular from 'angular';

export class ComponentFixture<T> {
  /**
   * The DebugElement associated with the root element of this component.
   */
  debugElement: DebugElement;

  /**
   * The instance of the root component class.
   */
  componentInstance;

  /**
   * The native element at the root of the component.
   */
  nativeElement: HTMLElement;

  private _isDestroyed = false;

  constructor(private element: JQLite) {
    this.componentInstance = element;
  }
  /**
   * Trigger a change detection cycle for the component.
   */
  detectChanges(): void {
    // this.element.scope().$digest();
    this.componentInstance.$onInit();
  }

  detectChangesDOM($div, bindings): void {
    var compile = null;

    angular.mock.inject(function ($compile, $rootScope) {
      var $scope = $rootScope.$new();
      Object.assign($scope, bindings);
      compile = $compile($div)($scope);
      compile.scope().$digest();
    });

    this.debugElement = new DebugElement(compile);
    this.nativeElement = this.debugElement.nativeElement;
  }

  /**
   * Trigger component destruction.
   */
  destroy(): void {
    if (!this._isDestroyed) {
      // this.element.detach();
      this.componentInstance.$onDestroy();
      this._isDestroyed = true;
    }
  }
}
