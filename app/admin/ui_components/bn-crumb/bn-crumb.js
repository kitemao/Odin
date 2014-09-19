/**
 * @author  miaojian@wandoujia.com
 */

define([], function (tpl) {
    'use strict';

    angular.module('bn.crumb', [])
        .directive('bnCrumb', function () {
            return {
              restrict: 'E',
              scope: {
                title: '@',
                subTitle: '@'
              },
              templateUrl: '/admin/ui_components/bn-crumb/bn-crumb.html'
            };
        })
});
