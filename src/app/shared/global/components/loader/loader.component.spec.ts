//#region angular imports

import { async, TestBed, getTestBed } from '@angular/core/testing';

//#endregion angular imports

//#region core imports

import { LoaderStatus, LoaderService } from '@app/@core';

//#endregion core imports

//#region functional/model imports

import { LoaderComponent } from '@app/shared/global/components/loader/loader.component';

//#endregion functional/model imports


describe('LoaderComponent', () => {

  function setup() {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [LoaderComponent],
      providers: [
        LoaderService,
      ]
    }).compileComponents();
    const fixture = TestBed.createComponent(LoaderComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const service: LoaderService = TestBed.get(LoaderService);
    return { fixture, component, service };
  }

  it('should create', () => {
    let config = setup();
    expect(config.component).toBeTruthy();
  });

  it('loader is shown when loaderService.start is called', async () => {
    let config = setup();
    let progress: any;
    config.service.start();

    //loader status is set to start
    expect(config.component.loaderStatus).toBe(LoaderStatus.Start, 'loader status is not set to start');

    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 10);
    });

    //show is true
    expect(config.component.show).toBeTruthy('show is not set to true');

    //loader div is displayed
    config.fixture.detectChanges();
    let actual = config.fixture.debugElement.nativeElement.querySelector('#loaderEle');
    expect(actual.hidden).toBeFalsy('loader is hidden');
    
  });

  it('loader is hidden when loaderService.complete is called', async () => {
    let config = setup();
    config.service.complete();
    
    //loader status is set to complete
    expect(config.component.loaderStatus).toBe(LoaderStatus.Complete);

    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 100);
    });

    //show is false
    expect(config.component.show).toBeFalsy('show is not set to false');

    //loader div is not displayed
    config.fixture.detectChanges();
    let actual = config.fixture.debugElement.nativeElement.querySelector('#loaderEle');
    expect(actual.hidden).toBeTruthy('loader is not hidden');

  });

  it('loader is hidden when loaderService.stop is called', async () => {
    let config = setup();
    config.service.stop();
    
    //loader status is set to stop
    expect(config.component.loaderStatus).toBe(LoaderStatus.Stop);

    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 100);
    });

    //show is false
    expect(config.component.show).toBeFalsy('show is not set to false');

    //loader div is not displayed
    config.fixture.detectChanges();
    let actual = config.fixture.debugElement.nativeElement.querySelector('#loaderEle');
    expect(actual.hidden).toBeTruthy('loader is not hidden');


  });
});
