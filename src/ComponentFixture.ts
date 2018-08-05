import { DebugElement } from './DebugElement';

export class ComponentFixture<T> {
  /**
   * The DebugElement associated with the root element of this component.
   */
  debugElement: DebugElement;

  /**
   * The instance of the root component class.
   */
  componentInstance: T;

  /**
   * The native element at the root of the component.
   */
  nativeElement: HTMLElement;

  private _isDestroyed = false;

  constructor(private element: JQLite) {
    this.componentInstance = element.controller((element as any).componentName); // componentName is attached to element in TestBed  _compileComponent method
    this.debugElement = new DebugElement(element);
    this.nativeElement = this.debugElement.nativeElement;
  }
  /**
   * Trigger a change detection cycle for the component.
   */
  detectChanges(): void {
    this.element.scope().$digest();
  }

  /**
   * Trigger component destruction.
   */
  destroy(): void {
    if (!this._isDestroyed) {
      this.element.detach();
      this._isDestroyed = true;
    }
  }
}
