require.config({
    baseUrl: '/admin'
});

/**
 * app entry
 */
require([
    'ui_components/adminUi', // components module
    'common/adminCommon' // common module
], function () {
    angular.module('Home', [ 'ngAnimate', 'ngResource', 'ngSanitize', 'ui.bootstrap', 'adminUi', 'adminCommon'])
    .controller('home', function ($scope) {

        var options = {
                grid: {
                    gridFields: [
                        {
                            title: 'ID',
                            align: 'center',
                            sortable: false,
                            field: 'id'
                        },
                        {
                            title: 'Name',
                            align: 'center',
                            sortable: false,
                            field: 'name'
                        }
                    ],
                    actions: [
                        {
                            title: '删除',
                            type: 'delete'
                        },
                        {
                            title: '编辑',
                            type: 'edit',
                        },
                        {
                            title: 'goto',
                            type: 'link',
                            url: 'http://www.baidu.com'
                        }
                    ]
                }
        };

        _.extend($scope, options);
    })
    .run(function ($rootScope) {
        $rootScope.URL_PROFIX = 'http://127.0.0.1:9999';
    });
    angular.bootstrap(document, ['Home']);
});
