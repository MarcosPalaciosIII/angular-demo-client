import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddressService } from './address.service';

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(AddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createAddress should be a function', () => {
    expect(typeof service.createAddress).toBe('function')
  })

  it('should fail due to incorrect id', async (done) => {
    try {
        await service.createAddress('not an id', {
          houseNumber: '123',
          aptNumber: '',
          streetName: 'Test Rd.',
          city: 'Test',
          state: 'FL',
          zip: 33727,
        });
    } catch (err) {
        return;
    }

    throw new Error('Promise should not be resolved');
  })

  it('getAddress should be a function', () => {
    expect(typeof service.getAddress).toBe('function')
  })

  it('should return with error', () => {
    expect(service.getAddress('wrong id')).toReturnWith(jasmine.any(Object));
  })

  it('deleteAddress should be a function', () => {
    expect(typeof service.deleteAddress).toBe('function')
  })

  it('updateAddress should be a function', () => {
    expect(typeof service.updateAddress).toBe('function')
  })
});
