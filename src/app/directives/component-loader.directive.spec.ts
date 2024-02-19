import { ViewContainerRef } from '@angular/core';
import { ComponentLoaderDirective } from './component-loader.directive';

describe('ComponentLoaderDirective', () => {
  it('should create an instance', () => {
    const viewContainerRefMock = {} as ViewContainerRef; 
    const directive = new ComponentLoaderDirective(viewContainerRefMock);
    expect(directive).toBeTruthy();
  });
});
