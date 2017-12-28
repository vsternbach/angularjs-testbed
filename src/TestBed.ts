import * as angular from 'angular';
import 'angular-mocks';
import { NgModule, ModuleConfig, Provider, Type, getTypeName } from 'angular-ts-decorators';
import { ComponentFixture } from './ComponentFixture';

/** @internal */
export const DynamicTestModuleId = 'DynamicTestModule';

/**
 * @whatItDoes Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 * @description
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 *
 * @stable
 */
export class TestBed {
  /** @internal */
  private _providers: Array<Provider> = [];
  /** @internal */
  private _declarations: Array<Type<any>|Array<any>|any> = [];
  /** @internal */
  private _imports: Array<Type<any>|Array<any>|any> = [];
  /** @internal */
  private _activeFixtures: Array<ComponentFixture<any>> = [];
  /** @internal */
  private _moduleRef: ng.IModule = null !;
  /** @internal */
  private _instantiated: boolean = false;
  /**
   * Allows overriding default providers, directives, pipes, modules of the test injector,
   * which are defined in test_injector.js
   */
  static configureTestingModule(moduleDef: ModuleConfig): typeof TestBed {
    getTestBed().configureTestingModule(moduleDef);
    return TestBed;
  }

  static resetTestingModule(): typeof TestBed {
    getTestBed().resetTestingModule();
    return TestBed;
  }

  static createComponent<T>(component: Type<T>): ComponentFixture<T> {
    return getTestBed().createComponent(component);
  }

  /** @internal */
  configureTestingModule(moduleDef: ModuleConfig) {
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

  /** @internal */
  resetTestingModule() {
    this._moduleRef = null !;
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

  /** @internal */
  createComponent<T>(component: Type<T>): ComponentFixture<T> {
    this._initIfNeeded();

    const initComponent = () => {
      const componentRef = this._compileComponent(component);
      return new ComponentFixture<T>(componentRef);
    };

    const fixture = initComponent();
    this._activeFixtures.push(fixture);
    return fixture;
  }

  /** @internal */
  private _initIfNeeded() {
    if (this._instantiated) {
      return;
    }
    this._createModule();
    this._instantiated = true;
  }

  /** @internal */
  private _createModule(): Type<any> {
    const providers = this._providers;
    const declarations = this._declarations;
    const imports = this._imports;

    @NgModule({ id: DynamicTestModuleId, providers, declarations, imports })
    class DynamicTestModule {}

    angular.mock.module(DynamicTestModuleId);
    return DynamicTestModule;
  }

  /** @internal */
  private _compileComponent(component: Type<any>) {
    const componentName = getTypeName(component);
    const selector = camelToKebab(componentName);
    const $div = `<${selector}></${selector}>`;
    let element: JQLite = null !;
    inject(($compile: ng.ICompileService, $rootScope: ng.IRootScopeService) => {
      const $scope = $rootScope.$new();
      element = $compile(angular.element($div))($scope);
    });
    return element;
  }
}

/** @internal */
function getTestBed() {
  return _testBed = _testBed || new TestBed();
}

// if this syntax looks strange to you, check this out:
// https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#user-content-non-null-assertion-operator
/** @internal */
let _testBed: TestBed = null !;

/** @internal */
function camelToKebab(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
