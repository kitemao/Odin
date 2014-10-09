/**
 * @author  miaojian@wandoujia.com
 */

define([], function (tpl) {
    'use strict';

    angular.module('co.search', [])
        .directive('coSearch', function () {
            return {
                restrict: 'E',
                require: '?ngModel',
                templateUrl: function (tElement, tAttrs) {
                    return tAttrs.templateUrl || '/admin/ui_components/co-search/co-search.html';
                },
                link: function ($scope, element, attrs, ctrls) {
                    var ngModelCtrl = ctrls;

                    if (!ngModelCtrl) {
                        return; // do nothing if no ng-model
                    }

                    ngModelCtrl.$render = function () {
                        $scope.keyword = $scope.actualKey = ngModelCtrl.$viewValue;
                    }

                    $scope.search = function () {
                        ngModelCtrl.$setViewValue($scope.keyword);
                        ngModelCtrl.$render();
                    };

                    $scope.reset = function () {
                        ngModelCtrl.$setViewValue('');
                        ngModelCtrl.$render();
                    };
                }
            };
        })
});
