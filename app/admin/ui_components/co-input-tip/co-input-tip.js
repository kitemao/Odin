/**
 * @author  miaojian@wandoujia.com
 */

define([], function () {
    'use strict';

    angular.module('co.inputTip', [])
        .constant('coInputTipConfig', {
            validator: {},
            help: ''
        })
        .directive('coInputTip', function ($timeout, $compile, $parse, coInputTipConfig) {
            return {
                restrict: 'E',
                require: ['^form'],
                templateUrl: function (tElement, tAttrs) {
                    return tAttrs.templateUrl || '/admin/ui_components/co-input-tip/co-input-tip.html';
                },
                scope: {
                    customMsg: '='
                },
                link: function ($scope, element, attrs, ctrl) {
                    $scope.help =
                        angular.isDefined(attrs.help) ? $scope.$parent.$eval(attrs.help) : coInputTipConfig.help;
                    $scope.validator =
                       angular.isDefined(attrs.validator) ? $scope.$parent.$eval(attrs.validator) : coInputTipConfig.validator;

                    var fieldName;
                    if (angular.isDefined(attrs.for)) {
                        fieldName = $scope.$parent.$eval(attrs.for)
                    }
                    else {
                        throw new Error('not set for attribute');
                        return;
                    }

                    $scope.showHelp = true;
                    var formCtrl  = ctrl[0];
                    var fieldCtrl = formCtrl[fieldName];

                    if (fieldCtrl) {
                        fieldCtrl.$formatters.push(validateFn);
                        fieldCtrl.$parsers.push(validateFn);
                    }

                    // listen custom, access custom show status
                    $scope.$watch('customMsg', function (msg) {
                        if (msg) {
                            showCustomError();
                        }
                    });

                    function validateFn(value) {
                        fieldCtrl.$setValidity('custom', true);

                        $timeout(function () {
                            validate();
                        });
                        return value;
                    }

                    function validate() {
                        var isValid = fieldCtrl.$valid;
                        var isDirty = fieldCtrl.$dirty;

                        if (!isDirty || isValid) {
                            showHelp();
                        }
                        else {
                            showError();
                        }
                    }

                    function showHelp() {
                        $scope.showHelp = true;
                        $scope.errorMsgs = [];
                        $scope.customMsg = '';
                    }

                    function showError() {
                        $scope.showHelp = false;
                        $scope.errorMsgs = [];

                        _.forEach(fieldCtrl.$error, function (val, key) {
                            if (val) {
                                $scope.errorMsgs.push($scope.validator[key] ? $scope.validator[key].errorMsg : 'error');
                            }
                        });
                        $scope.customMsg = '';
                    }

                    function showCustomError() {
                        fieldCtrl.$setValidity('custom', false);
                        $scope.showHelp = false;
                        $scope.errorMsgs = [];
                    }
                }
            };
        })
});
