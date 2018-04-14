import { element } from 'angular';

export class DebugElement {
  constructor(selector: JQuery.Selector | Element | JQuery) {
    const de = element(selector) as DebugElement;
    de.query = this.query;
    de.nativeElement = de[0];
    return de;
  }
  query(selector: JQuery.Selector | Element | JQuery): DebugElement {
    return new DebugElement(selector);
  }
}

/** @internal */
export interface DebugElement extends JQLite {
  nativeElement: HTMLElement;
  query(selector: JQuery.Selector | Element | JQuery): DebugElement;
}
