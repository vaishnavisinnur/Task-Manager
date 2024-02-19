import { RepeaterDirective } from './repeater.directive';
import { ViewContainerRef, TemplateRef } from '@angular/core';

describe('RepeaterDirective', () => {
  it('should create an instance', () => {
    // Create mock instances for ViewContainerRef and TemplateRef
    const viewContainerRefMock = {} as ViewContainerRef;
    const templateRefMock = {} as TemplateRef<any>;

    // Pass the mock instances to the constructor
    const directive = new RepeaterDirective(viewContainerRefMock, templateRefMock);
    expect(directive).toBeTruthy();
  });
});
