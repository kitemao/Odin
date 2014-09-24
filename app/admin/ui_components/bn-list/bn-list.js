/**
 * @author  miaojian@wandoujia.com
 */

define([], function (tpl) {
    'use strict';

    angular.module('bn.list', [])
        .constant('bnListConfig', {
            page: 1,
            fieldIndex: 'id'
        })
        .directive('bnList', function ($modal, bnListConfig) {
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

                    // pagination
                    itemsPerPage : '@',
                    maxSize      : '@',

                    // grid
                    grid         : '='
                },
                templateUrl: '/admin/ui_components/bn-list/bn-list.html',
                controller: function ($scope, $rootScope, $resource) {
                    // initialize
                    $scope.page       = $scope.page || bnListConfig.page;
                    $scope.fieldIndex = $scope.fieldIndex || bnListConfig.fieldIndex;

                    $scope.resourceDao = $resource($scope.resourceUrl, {field: '@field'});

                    function getData(paramObj) {
                        $scope.resourceDao.get(paramObj, function (obj) {
                            $scope.gridData   = obj.data;
                            $scope.totalItems = obj.totalItems;
                        });
                    };

                    $scope.addData = function () {
                        $modal.open({
                            templateUrl: '/admin/ui_components/bn-list/dialog.html',
                            size: 'lg',
                            controller: function ($scope, $modalInstance, fields, resourceDao) {
                                $scope.fields = fields;
                                $scope.formData = {};
                                $scope.title = 'Add item';

                                $scope.ok = function (data) {

                                    $scope.errorInfo = {
                                        name: 'hahahah',
                                        gender: 'hehehe',
                                        description: 'mememem'
                                    }
                                    // resourceDao.save($scope.formData, function () {
                                    //     $modalInstance.close($scope.formData);
                                    // });
                                };
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            resolve: {
                                fields: function () {
                                    return $scope.grid.gridFields;
                                },
                                resourceDao: function () {
                                    return $scope.resourceDao;
                                }
                            }
                        }).result.then(function (data) {
                            // reget the listdata
                            getData($scope.paramObj);
                        });
                    };

                    $scope.deleteData = function(item) {
                        $scope.resourceDao.delete({field: item[$scope.fieldIndex]}, function (obj) {
                            getData($scope.paramObj);
                        });
                    };

                    $scope.editData = function (item) {

                    };

                    // request param
                    $scope.paramObj = {
                        page: $scope.page,
                        keyword: $scope.keyword,
                        sort: $scope.sort,
                        sortBy: $scope.sortBy,
                        filterData: $scope.filterData
                    };
                    // watch param to send request
                    $scope.$watch('paramObj', getData, true);

                },
                link: function ($scope, element, attrs) {
                }
            };
        })
});
