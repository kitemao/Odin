/**
 * @author  miaojian@wandoujia.com
 */

define([], function () {
    'use strict';

    angular.module('co.validator', [])
        .constant('coValidatorConfig', {
            validator: {},
            help: '',
            tpl: '<span class="help-block" >{{message}}</span>'
        })
        .directive('coValidator', function ($timeout, $compile, coValidatorConfig) {
            return {
                restrict: 'A',
                require: ['^form', 'ngModel'],
                scope: {
                    validator: '=coValidator',
                    custom: '@'
                },
                link: function ($scope, element, attrs, ctrl) {
                    $scope.help =
                        angular.isDefined(attrs.help) ? $scope.$parent.$eval(attrs.help) : coValidatorConfig.help;
                    //$scope.validator =
                      //  angular.isDefined(attrs.validator) ? $scope.$parent.$eval(attrs.validator) : coValidatorConfig.validator;
                      //
                    var formCtrl  = ctrl[0];
                    var fieldCtrl = ctrl[1];

                    if (fieldCtrl) {
                        fieldCtrl.$formatters.push(validateFn);
                        fieldCtrl.$parsers.push(validateFn);
                    }

                    var tpl = '<span class="help-block" >{{message}}</span>';
                    // repained template
                    var tplFun = $compile(coValidatorConfig.tpl);
                    element.after(tplFun($scope));

                    // listen custom, access custom show status
                    $scope.$watch('custom', function (msg) {
                        $scope.customMsg = msg || '';
                        if (msg) {
                            showCustomError();
                        }
                    });

                    function validateFn(value) {
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

                    /**
                     * show help dom, hide errir dom
                     */
                    function showHelp() {
                        element.next().html($scope.help).removeClass('error');
                    }

                    /**
                     * show error dom, hide help custom dom
                     */
                    function showError() {
                        var errorMsgs = [];

                        _.forEach(fieldCtrl.$error, function (val, key) {
                            if (val) {
                                console.log(key);
                                errorMsgs.push($scope.validator[key] ? $scope.validator[key].errorMsg : 'error');
                            }
                        });
                        element.next().html(errorMsgs[0]).addClass('error');
                    }

                    /**
                     * show custom dom, hide Help and error dom
                     */
                    function showCustomError() {
                        element.next().html($scope.custom).addClass('error');
                    }
                }
            };
        })
});
