import * as angular from 'angular';
import 'angular-mocks';
import { getTypeName, ModuleConfig, NgModule, Provider, Type } from 'angular-ts-decorators';
import { ComponentFixture } from './ComponentFixture';

let _testBed: TestBed = null;

/** @internal */
export const DynamicTestModuleId = 'DynamicTestModule';
// let _nextRootElementId = 0;

/**
 * @whatItDoes Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 * @description
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 *
 * @stable
 * @internal
 */
export class TestBed {
  private _providers: Provider[] = [];
  private _declarations: Array<Type<any>|any[]|any> = [];
  private _imports: Array<Type<any>|any[]|any> = [];
  private _activeFixtures: Array<ComponentFixture<any>> = [];
  private _moduleRef: ng.IModule = null;
  private _instantiated = false;
  /**
   * Allows overriding default providers, directives, pipes, modules of the test injector,
   * which are defined in test_injector.js
   */
  public static configureTestingModule(moduleDef: ModuleConfig): typeof TestBed {
    getTestBed().configureTestingModule(moduleDef);
    return TestBed;
  }

  static resetTestingModule(): typeof TestBed {
    getTestBed().resetTestingModule();
    return TestBed;
  }

  public static createComponent<T>(component: Type<T>): ComponentFixture<T> {
    return getTestBed().createComponent(component);
  }

  public configureTestingModule(moduleDef: ModuleConfig) {
    if (moduleDef.providers) {
      this._providers.push(...moduleDef.providers);
    }
    if (moduleDef.declarations) {
      this._declarations.push(...moduleDef.declarations);
    }
    if (moduleDef.imports) {
      this._imports.push(...moduleDef.imports);
    }
  }

  resetTestingModule() {
    this._moduleRef = null;
    this._providers = [];
    this._declarations = [];
    this._imports = [];
    this._instantiated = false;
    this._activeFixtures.forEach((fixture) => {
      try {
        fixture.destroy();
      } catch (e) {
        console.error('Error during cleanup of component', fixture.componentInstance);
      }
    });
    this._activeFixtures = [];
  }

  public createComponent<T>(component: Type<T>): ComponentFixture<T> {
    this._initIfNeeded();
    // const componentFactory = null; // this._compiler.getComponentFactory(component);
    //
    // if (!componentFactory) {
    //   throw new Error(
    //     `Cannot create the component ${component['name']} as it was not imported into the testing module!`);
    // }
    // const rootElId = `root${_nextRootElementId++}`;
    // testComponentRenderer.insertRootElement(rootElId);

    const initComponent = () => {
      // const componentRef = componentFactory.create(null, [], `#${rootElId}`, this._moduleRef);
      const componentRef = this._compileComponent(component);
      return new ComponentFixture<T>(componentRef);
    };

    const fixture = initComponent();
    this._activeFixtures.push(fixture);
    return fixture;
  }

  private _initIfNeeded() {
    if (this._instantiated) {
      return;
    }
    this._createModule();
    this._instantiated = true;
  }

  private _createModule(): Type<any> {
    // const providers = this._providers.concat([{provide: TestBed, useValue: this}]);
    // const declarations = [...this._declarations];
    // const imports = [this.ngModule, this._imports];
    const providers = this._providers;
    const declarations = this._declarations;
    const imports = this._imports;

    @NgModule({ id: DynamicTestModuleId, providers, declarations, imports })
    class DynamicTestModule {}

    angular.mock.module(DynamicTestModuleId);
    return DynamicTestModule;
  }

  private _compileComponent(component: Type<any>): JQLite {
    const componentName = getTypeName(component);
    const selector = camelToKebab(componentName);
    const $div = `<${selector}></${selector}>`;
    let element: JQLite = null;
    inject(($compile: ng.ICompileService, $rootScope: ng.IRootScopeService) => {
      const $scope = $rootScope.$new();
      element = $compile($div)($scope);
    });
    return element;
  }
}

/** @internal */
export function getTestBed() {
  return _testBed = _testBed || new TestBed();
}

function camelToKebab(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
