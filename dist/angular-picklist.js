/**
 *
 * @version v0.1.0 - 2014-11-23
 * @link https://github.com/arboss/angular-picklist
 * @author Igor Kvasnicka / Armin Boss
 * @license CC BY 4.0 License,http://creativecommons.org/licenses/by/4.0/
 */
/* global angular */
'use strict';

angular.module('picklist', []).directive('picklist', ["$filter",

  function($filter) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      template: '<div class="container-fluid" ng-cloak> <div class="row"> <div class="small-5 columns"> <input placeholder="Search" type="text" class="picklist-filter form-control" ng-model="leftFilter"/> <select class="picklist-select" multiple="multiple" ng-multiple="true" ng-model="leftSelected" ng-options="transformText(r) for r in leftListRowsModel | transformEntries:leftFilter:transformText" ng-style="listCss"> </select> </div><div class="small-2 columns text-center"> <div> <button type="button" class="button tiny expand" ng-click="moveRightSelected()"> <i class="fa fa-forward fa-fw"> </i> </button> </div><div class="text-center"> <button type="button" class="button tiny expand" ng-click="moveRightAll()" ng-show="showAllButtons"> <i class="fa fa-fast-forward fa-fw"> </i> </button> </div><div class="text-center"> <button type="button" class="button tiny expand" ng-click="moveLeftSelected()"> <i class="fa fa-backward fa-fw"> </i> </button> </div><div class="text-center"> <button type="button" class="button tiny expand" ng-click="moveLeftAll()" ng-show="showAllButtons"> <i class="fa fa-fast-backward fa-fw"> </i> </button> </div></div><div class="small-5 columns"> <input placeholder="Search" type="text" class="picklist-filter form-control" ng-model="rightFilter"/> <select class="picklist-select" multiple="multiple" ng-model="rightSelected" ng-options="transformText(r) for r in rightListRowsModel | transformEntries:rightFilter:transformText" ng-style="listCss"> </select> </div></div></div>',
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

        // move selected entries from left to right
        scope.moveRightSelected = function() {
          var selection = $filter("transformEntries")(scope.leftSelected, scope.leftFilter, scope.transformText);

          scope.rightListRowsModel = scope.rightListRowsModel.concat(selection);
          scope.leftListRowsModel = _.reject(scope.leftListRowsModel, function(e) {
            return _.indexOf(scope.rightListRowsModel, e) != -1
          });

          scope.rightSelected = [];
          scope.leftSelected = [];
        };

        // move selected entries from right to left
        scope.moveLeftSelected = function() {
          var selection = $filter("transformEntries")(scope.rightSelected, scope.rightFilter, scope.transformText);

          scope.leftListRowsModel = scope.leftListRowsModel.concat(selection);
          scope.rightListRowsModel = _.reject(scope.rightListRowsModel, function(e) {
            return _.indexOf(scope.leftListRowsModel, e) != -1
          });

          scope.rightSelected = [];
          scope.leftSelected = [];
        };

        // move all entries from left to right
        scope.moveRightAll = function() {
          var selection = $filter("transformEntries")(scope.leftListRowsModel, scope.leftFilter, scope.transformText);

          scope.rightListRowsModel = scope.rightListRowsModel.concat(selection);
          scope.leftListRowsModel = _.reject(scope.leftListRowsModel, function(e) {
            return _.indexOf(scope.rightListRowsModel, e) != -1
          });

          scope.rightSelected = [];
          scope.leftSelected = [];
        };

        // move all entries from right to left
        scope.moveLeftAll = function() {
          var selection = $filter("transformEntries")(scope.rightListRowsModel, scope.rightFilter, scope.transformText);

          scope.leftListRowsModel = scope.leftListRowsModel.concat(selection);
          scope.rightListRowsModel = _.reject(scope.rightListRowsModel, function(e) {
            return _.indexOf(scope.leftListRowsModel, e) != -1
          });

          scope.rightSelected = [];
          scope.leftSelected = [];
        };
      }
    };
  }
]);
angular.module('picklist').filter('transformEntries', ["$filter",
  function($filter) {
    return function(items, filterString, transformFunc) {
      if (!transformFunc) transformFunc = JSON.stringify;
      var filtered = [];

      angular.forEach(items, function(item) {
        var actual = ('' + transformFunc(item)).toLowerCase();
        var expected = ('' + filterString).toLowerCase();
        if (actual.indexOf(expected) !== -1)
          filtered.push(item);
      });

      return filtered;
    };
  }
]);
