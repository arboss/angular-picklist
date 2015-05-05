/**
 *
 * @version v0.1.0 - 2014-11-23
 * @link https://github.com/IgorKvasn/angular-picklist
 * @author Igor Kvasnicka
 * @license CC BY 4.0 License,http://creativecommons.org/licenses/by/4.0/
 */
/* global angular */
'use strict';

angular.module('picklist', []).directive('picklist', [

  function() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      template: '<div class="container-fluid" ng-cloak> <div class="row"> <div class="small-5 columns"> <input placeholder="Search" type="text" class="form-control" ng-model="leftFilter" style="width: 100%; margin-bottom: 10px;"/> <select multiple ng-multiple="true" ng-model="leftSelected" ng-options="transformText(r) for r in leftListRowsModel | transformEntries:leftFilter:transformText" style="overflow: auto;" ng-style="listCss"></select> </div><div class="small-2 columns text-center"> <div> <button type="button" class="button tiny expand" ng-click="moveRightSelected()"> <i class="fa fa-forward fa-fw"></i> </button> </div><div class="text-center"> <button type="button" class="button tiny expand" ng-click="moveRightAll()" ng-show="showAllButtons"> <i class="fa fa-fast-forward fa-fw"></i> </button> </div><div class="text-center"> <button type="button" class="button tiny expand" ng-click="moveLeftSelected()"> <i class="fa fa-backward fa-fw"></i> </button> </div><div class="text-center"> <button type="button" class="button tiny expand" ng-click="moveLeftAll()" ng-show="showAllButtons"> <i class="fa fa-fast-backward fa-fw"></i> </button> </div></div><div class="small-5 columns"> <input placeholder="Search" type="text" class="form-control" ng-model="rightFilter" style="width: 100%; margin-bottom: 10px;"/> <select multiple="multiple" ng-model="rightSelected" ng-options="transformText(r) for r in rightListRowsModel | transformEntries:rightFilter:transformText" style="overflow: auto;" ng-style="listCss"></select> </div></div></div>',
      scope: {
        leftListRowsModel: '=leftListRows',
        rightListRowsModel: '=rightListRows',
        showMoveAllButtons: '@',
        displayText: '=display'
      },

      link: function(scope) {
        scope.showAllButtons = scope.showMoveAllButtons || true;

        scope.leftSelected = [];
        scope.rightSelected = [];
        scope.leftFilter = '';
        scope.rightFilter = '';

        scope.transformText = function(element) {
          if (scope.displayText)
            return scope.displayText(element);
          else
            return element;
        };

        scope.moveRightSelected = function() {

          scope.rightListRowsModel = scope.rightListRowsModel.concat(scope.leftSelected);

          scope.leftListRowsModel = _.reject(scope.leftListRowsModel, function(e) {
            return _.indexOf(scope.leftSelected, e) != -1
          });

          scope.rightSelected = [];
          scope.leftSelected = [];
        };

        scope.moveLeftSelected = function() {

          scope.leftListRowsModel = scope.leftListRowsModel.concat(scope.rightSelected);
          scope.rightListRowsModel = _.reject(scope.rightListRowsModel, function(e) {
            return _.indexOf(scope.rightSelected, e) != -1
          });

          scope.rightSelected = [];
          scope.leftSelected = [];
        };

        scope.moveRightAll = function() {
          scope.rightListRowsModel = scope.rightListRowsModel.concat(scope.leftListRowsModel);
          scope.leftListRowsModel = [];

          scope.rightSelected = [];
          scope.leftSelected = [];
        };

        scope.moveLeftAll = function() {
          scope.leftListRowsModel = scope.leftListRowsModel.concat(scope.rightListRowsModel);
          scope.rightListRowsModel = [];

          scope.rightSelected = [];
          scope.leftSelected = [];
        };
      }
    };
  }
]);
angular.module('picklist').filter('transformEntries', ["$filter",
  function($filter) {
    return function(input, filterString, transformFunc) {
      return $filter('filter')(input, filterString, function(actual, expected) {
        console.log JSON.stringify(input);
        actual = ('' + transformFunc(actual)).toLowerCase();
        expected = ('' + expected).toLowerCase();
        return actual.indexOf(expected) !== -1;
      });
    };
  }
]);
