import { element } from 'angular';
/**
 * Extend JQLite with query method (will work only if JQuery included)
 */
element.prototype.query = element.prototype.find;
/**
 * Extend JQLite with nativeElement property
 */
Object.defineProperty(element.prototype, 'nativeElement', {
  get() { return this[0]; },
  configurable: false
});

export interface DebugElement extends JQLite {
  nativeElement: HTMLElement;
  query(selector: string): DebugElement;
}

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
  /** @internal */
  private _isDestroyed: boolean = false;

  constructor(private element: JQLite) {
    this.componentInstance = element.isolateScope<any>()['$ctrl'];
    this.debugElement = element as DebugElement;
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


