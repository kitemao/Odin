/**
 * @author  miaojian@wandoujia.com
 */

define([], function (tpl) {
    'use strict';

    angular.module('ly.crumb', [])
        .directive('lyCrumb', function () {
            return {
              restrict: 'E',
              templateUrl: '/admin/ui_components/ly-crumb/ly-crumb.html',
              link: function (scope, element, attrs) {
                console.log(11);
              }
            };
        })
});
