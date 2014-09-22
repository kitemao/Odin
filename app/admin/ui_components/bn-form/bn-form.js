/**
 * @author  miaojian@wandoujia.com
 */

define([], function (tpl) {
    'use strict';

    angular.module('bn.form', [])
        .directive('bnForm', function () {
            return {
                restrict: 'E',
                templateUrl: '/admin/ui_components/bn-form/bn-form.html',
                scope: {
                    fields: '=',
                    formData: '='
                },
                controller: function ($scope) {

                }
            };
        })
});
