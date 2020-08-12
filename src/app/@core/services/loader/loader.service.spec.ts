//#region angular imports

import { async, TestBed, getTestBed } from '@angular/core/testing';

//#endregion angular imports

//#region core imports

import { LoaderStatus } from '@core/enums';
import { LoaderService } from '@core/services/loader/loader.service';

//#endregion core imports

//#region functional/model imports

//#endregion functional/model imports

describe('Loader Service Spec - ', () => {

  function setup() {
    TestBed.configureTestingModule({
      providers: [
        LoaderService
      ]
    });
    const service: LoaderService = TestBed.get(LoaderService);
    return { service };
  }

  it('loader start - loaderStatus is set to start', () => {
    let config = setup();
    config.service.start();
    let actual = config.service.getLoaderStatus();
    expect(actual).toEqual(LoaderStatus.Start);
  });

  it('loader stop - loaderStatus is set to stop', () => {
    let config = setup();
    config.service.stop();
    let actual = config.service.getLoaderStatus();
    expect(actual).toEqual(LoaderStatus.Stop);
  });

  it('loader complete - loaderStatus is set to complete', () => {
    let config = setup();
    config.service.complete();
    let actual = config.service.getLoaderStatus();
    expect(actual).toEqual(LoaderStatus.Complete);
  });

  it('loader reset - loaderStatus is set to none', () => {
    let config = setup();
    config.service.resetLoaderModel();
    let actual = config.service.getLoaderStatus();
    expect(actual).toEqual(LoaderStatus.None);
  });

  it('loader get status', () => {
    let config = setup();
    config.service.start();
    expect(config.service.getLoaderStatus()).toEqual(LoaderStatus.Start);

    config.service.stop();
    expect(config.service.getLoaderStatus()).toEqual(LoaderStatus.Stop);

    config.service.complete();
    expect(config.service.getLoaderStatus()).toEqual(LoaderStatus.Complete);

  });


});
