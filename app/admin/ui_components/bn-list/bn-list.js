/**
 * @author  miaojian@wandoujia.com
 */

define([], function (tpl) {
    'use strict';

    angular.module('bn.list', [])
        .constant('bnListConfig', {
            page: 1,
            resourceIndex: 'id'
        })
        .directive('bnList', function ($modal, bnListConfig) {
            return {
                restrict: 'E',
                scope: {
                    title        : '@',
                    addBtnText   : '@',
                    search       : '@',

                    resourceUrl  : '@',
                    resourceIndex: '@',

                    filterOptions       : '=',
                    paginationOptions   : '=',
                    gridOptions         : '=',
                    batchOptions        : '='
                },
                templateUrl: function (tElement, tAttrs) {
                    return tAttrs.templateUrl || '/admin/ui_components/bn-list/bn-list.html';
                },
                controller: function ($scope, $rootScope, $resource) {
                    // initialize
                    $scope.page          = $scope.page || bnListConfig.page;
                    $scope.resourceIndex = $scope.resourceIndex || bnListConfig.resourceIndex;

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
                                $scope.errorInfo = {};
                                $scope.title = 'Add item';

                                $scope.ok = function (data) {
                                    resourceDao.save(data).$promise.then(function (obj) {
                                        $modalInstance.close($scope.formData);
                                    }, function (obj) {
                                        var status = obj.status;
                                        if (status === 514) {
                                            $scope.errorInfo = obj.data.statusInfo ? obj.data.statusInfo.parameters : '';
                                        }
                                    });
                                };
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            resolve: {
                                fields: function () {
                                    return $scope.gridOptions.fields;
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

                    $scope.editData = function (item) {
                        $modal.open({
                            templateUrl: '/admin/ui_components/bn-list/dialog.html',
                            size: 'lg',
                            controller: function ($scope, $modalInstance, fields, resourceDao) {
                                $scope.fields = fields;
                                $scope.formData = item;
                                $scope.errorInfo = {};
                                $scope.title = 'Edit item';

                                $scope.ok = function (data) {
                                    resourceDao.save(data).$promise.then(function (obj) {
                                        $modalInstance.close($scope.formData);
                                    }, function (obj) {
                                        var status = obj.status;
                                        if (status === 514) {
                                            $scope.errorInfo = obj.data.statusInfo ? obj.data.statusInfo.parameters : '';
                                        }
                                    });
                                };
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            resolve: {
                                fields: function () {
                                    return $scope.gridOptions.fields;
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
                        $scope.resourceDao.delete({field: item[$scope.resourceIndex]}, function (obj) {
                            getData($scope.paramObj);
                        });
                    };

                    $scope.batchDeleteData = function() {
                        if (!$scope.checkedData || !$scope.checkedData.length) {
                            return;
                        }
                        // i am so sad, angular not support delete request body, only parameter
                        $scope.resourceDao.delete({data: $scope.checkedData.map(function(item){return item[$scope.resourceIndex]})}, function (obj) {
                            getData($scope.paramObj);
                        });
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

                }
            };
        })
});
