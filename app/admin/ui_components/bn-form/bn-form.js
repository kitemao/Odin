/**
 * @author  miaojian@wandoujia.com
 */

define([], function (tpl) {
    'use strict';

    angular.module('bn.form', [])
        .directive('dynamicName', function($compile, $parse) {
          return {
            restrict: 'A',
            terminal: true,
            priority: 100000,
            link: function(scope, elem) {
                var name = $parse(elem.attr('dynamic-name'))(scope);
                elem.removeAttr('dynamic-name');
                elem.attr('name', name);
                $compile(elem)(scope);
            }
          };
        })
        // .directive("dynamicName",[function(){
        //     return {
        //         restrict:"A",
        //         require: ['ngModel', '^form'],
        //         link:function(scope, element, attrs, ctrls){
        //             var name = ctrls[0].$name = scope.$eval(attrs.dynamicName) || attrs.dynamicName;
        //             ctrls[1].$addControl(ctrls[0]);
        //             //element.attr('name', name);
        //         }
        //     };
        // }])
        .directive('bnForm', function ($compile) {
            return {
                restrict: 'E',
                templateUrl: '/admin/ui_components/bn-form/bn-form.html',
                scope: {
                    fields: '=',
                    formData: '=',
                    customMsg: '=',
                    onSuccess: '&',
                    onCancel: '&'
                },
                link: function ($scope, element, attrs, ctrl) {
                    $scope.ok = function (formData) {
                        if ($scope.v_form.$valid) {
                            $scope.onSuccess({
                                data: formData
                            });
                        }
                        else {
                            var form = $scope.v_form;
                            //form.$setDirty(true);
                            angular.forEach(form, function (input, key) {
                                if (input.hasOwnProperty('$dirty')) {
                                    if (input.$pristine && (input.$viewValue === null || input.$viewValue === undefined)) {
                                        input.$setViewValue('');
                                    }
                                    else {
                                        input.$setViewValue(input.$viewValue);
                                    }
                                }
                            });
                        }
                    };
                    $scope.cancel = function () {
                        $scope.onCancel();
                    }
                }
            };
        })
});
