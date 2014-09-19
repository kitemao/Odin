/**
 * @author  miaojian@wandoujia.com
 */

define([], function (tpl) {
    'use strict';

    angular.module('bn.list', [])
        .constant('bnListConfig', {
        })
        .directive('bnList', function () {
            return {
                restrict: 'E',
                scope: {
                    title        : '@',
                    filter       : '@',
                    search       : '@',
                    pagination   : '@',
                    addBtnText   : '@',
                    resourceUrl  : '@',
                    resourceIndex: '@',

                    itemsPerPage : '@',
                    maxSize      : '@',

                    grid         : '='
                },
                templateUrl: '/admin/ui_components/bn-list/bn-list.html',
                controller: function ($scope, $rootScope, $resource) {

                    //var $resource($scope.resourceUrl, {userId:'@id'});
                    $scope.resourceDao = $resource($scope.resourceUrl);

                    $scope.resourceDao.get(function (obj) {
                        var data = obj.data;

                        $scope.gridData = data;
                    });
                },
                link: function ($scope, element, attrs) {

                    console.log($scope.grid);

                    $scope.page = 1;
                    $scope.totalItems = 20;

                }
            };
        })
});
