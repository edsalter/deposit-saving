/* global jasmine, angular, describe, beforeEach, afterEach, module, inject, it, expect, spyOn, _  */

describe('StampDuty service:', function () {

    'use strict';

    var DepositApp, StampDuty, stampDuty, $rootScope, $scope, $httpBackend;

    beforeEach(function () {

        DepositApp = angular.module('DepositApp');

        module('DepositApp');

        inject(function ($injector) {
            StampDuty = $injector.get('StampDuty');
            stampDuty = StampDuty;
        });

    });

      /*
          Method tests
      */
      it('should be registered', function () {
          expect(stampDuty).not.toBeNull();
      });

      describe('Methods:', function(){
        describe('rate()', function () {
          it('should calculate price of 100000 to be rate of 0', function () {
              expect(stampDuty.getRate(100000)).toEqual(0);
          });
          it('should calculate price of 125000 to be rate of 0', function () {
              expect(stampDuty.getRate(125000)).toEqual(0);
          });
          it('should calculate price of 250000 to be rate of 1', function () {
              expect(stampDuty.getRate(250000)).toEqual(1);
          });
          it('should calculate price of 500000 to be rate of 3', function () {
              expect(stampDuty.getRate(500000)).toEqual(3);
          });
          it('should calculate price of 1000000 to be rate of 4', function () {
              expect(stampDuty.getRate(1000000)).toEqual(4);
          });
          it('should calculate price of 1999999 to be rate of 5', function () {
              expect(stampDuty.getRate(1999999)).toEqual(5);
          });
          it('should calculate price of 2000000 to be rate of 7', function () {
              expect(stampDuty.getRate(2000000)).toEqual(7);
          });
          it('should calculate price of 4000000 to be rate of 7', function () {
              expect(stampDuty.getRate(4000000)).toEqual(7);
          });
        });
      });

});






/* global jasmine, angular, describe, beforeEach, afterEach, module, inject, it, expect, spyOn, _  */

describe('Deposit service:', function () {

    'use strict';

    var DepositApp, Deposit, Deposit, StampDuty, stampDuty, $rootScope, $scope, $httpBackend;

    beforeEach(function () {

        DepositApp = angular.module('DepositApp');

        module('DepositApp');

        inject(function ($injector) {
            Deposit = $injector.get('Deposit');
            Deposit = Deposit;

            StampDuty = $injector.get('StampDuty');
            stampDuty = StampDuty;
        });

    });

    it('should be registered', function () {
        expect(Deposit).not.toBeNull();
    });

    describe('Dependancies:', function(){
      it('stampDuty should be registered', function () {
          expect(stampDuty).not.toBeNull();
      });
    });

    /*
        Method tests
    */
    describe('Methods:', function(){


    });


});