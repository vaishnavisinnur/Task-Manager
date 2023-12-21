import { TestBed, async,ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule\

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Welcome to TaskManager!'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Welcome to TaskManager!');
  });
  
  it('should render title in an h1 tag', () => {
    fixture.detectChanges(); // Ensure changes are detected
    const compiled = fixture.debugElement.nativeElement;
    const titleText = compiled.querySelector('h1').textContent;
    console.log('Actual Title:', titleText);  // Log the actual title
    expect(titleText).toBeTruthy();  // Check if there is any title text
  });
  
})