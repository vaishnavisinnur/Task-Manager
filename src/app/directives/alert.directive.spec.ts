import { AlertDirective } from './alert.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('AlertDirective', () => {
  it('should create an instance', () => {
    // Create mock instances for ElementRef and Renderer2
    const elementRefMock = {} as ElementRef;
    const renderer2Mock = {} as Renderer2;

    // Pass the mock instances to the constructor
    const directive = new AlertDirective(elementRefMock, renderer2Mock);
    expect(directive).toBeTruthy();
  });
});
