/*
	@author Ed Salter
*/

var demoapp = angular.module('DepositApp',['nvd3ChartDirectives']);

demoapp.service('StampDuty', function () {
	var that = {};

	that.getRate = function (targetHousePrice) {
		var rate = 0;

		if (targetHousePrice <= 125000) {
			rate = 0;
		}
		else if (targetHousePrice <= 250000) {
			rate = 1;
		}
		else if (targetHousePrice <= 500000) {
			rate = 3;
		}
		else if (targetHousePrice <= 1000000) {
			rate = 4;
		}
		else if (targetHousePrice < 2000000) {
			rate = 5;
		}
		else if (targetHousePrice >= 2000000) {
			rate = 7;
		}

		return rate;
	}

	that.getAmount = function (targetHousePrice, rate) {
		return (targetHousePrice / 100) * rate; 
	}

	return that;
});



demoapp.factory('Deposit', ['StampDuty', 
	function (StampDuty) {
		var that = {};
		var _buyingFees = 5000;
		var _amountSavedPerMonth = 0;

		//Defaults for use in template
		that.housePrice = 600000;
		that.depositPercentage = 20;
		that.currentSavings = 5000;
		that.savingPerMonth = 1500;
		that.dateToBuy = new Date();

		that.getDespositAmount = function (){
			return _calculateDepositAmount(that.housePrice, that.depositPercentage);
		};

		var _calculateDepositAmount = function (housePrice, depositPercentage) {
			return ( housePrice / 100 ) * depositPercentage;
		}

		that.getBuyingFees = function () {
			return _buyingFees;
		}

		that.getStampDuty = function(targetHousePrice){
			var stampDutyRate = StampDuty.getRate(targetHousePrice);			

			return StampDuty.getAmount(targetHousePrice, stampDutyRate);
		};

		that.getCashRequired = function(targetHousePrice, depositPercentage, currentSavings){
			var depositRequired = that.getDespositAmount(targetHousePrice, depositPercentage);
			var stampDutyAmount = that.getStampDuty (targetHousePrice);

			return depositRequired + _buyingFees + stampDutyAmount;
		};

		that.getExtraSavingsRequired = function(){
			//only return number if positive
			if(that.getDespositAmount() > that.currentSavings){
				return that.getDespositAmount() - that.currentSavings;
			} else {
				return 0;
			}

			return that.getDespositAmount() - that.currentSavings;
		};

		that.getTimeToSave = function(targetHousePrice, depositPercentage, currentSavings){
			//round up to the nearest whole month
			//only non 0 return if positive
			if( that.getExtraSavingsRequired() > 0){
				return Math.ceil( that.getExtraSavingsRequired() / that.savingPerMonth);
			} else {
				return 0;
			}
		};

		var _cachedResultSet =  [];

		//this could be optimised to have a watch on the values which change, for now it compares arrays, if it has changed return a new array, otherwise return a reference to the old cached one
		that.resultSet = function(){		
			var newResult =  [
	            {
	                "key": "Savings",
	                "values": [ [ 0, that.currentSavings] , 
	                [ 
	                	that.getTimeToSave(), 
	                	that.getCashRequired(that.housePrice, that.depositPercentage, that.currentSavings)] ]
	            }];

	        if(!angular.equals(_cachedResultSet, newResult) ){
	        	_cachedResultSet = newResult;
	        }

	        return _cachedResultSet;
		};

	return that;
}]);



demoapp.controller('DespoitCtrl', ['$scope', 'Deposit', function($scope, DepositSave) {
	$scope.depositSave = DepositSave;
}]);





