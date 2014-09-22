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
                            sortable: true,
                            field: 'id',
                            editable: false
                        },
                        {
                            title: 'Name',
                            align: 'center',
                            sortable: true,
                            field: 'name',
                            editable: true,
                            editType: 'text',
                            hint: '请输入名字',
                            dataType: 'string',
                            valid: {
                                required: { errorMsg: '请输入名字' }
                            }
                        },
                        {
                            title: '性别',
                            align: 'center',
                            sortable: true,
                            field: 'gender',
                            editable: true,
                            editType: 'select',
                            selectOptions: [
                                {
                                    value: 0, text: '男'
                                },
                                {
                                    value: 1, text: '女'
                                }
                            ],
                            hint: '请输入性别',
                            dataType: 'number',
                            valid: {
                                required: { errorMsg: '请输入性别' }
                            },
                            content: function (item) {
                                return item.gender === 0 ? '男' : '女';
                            }
                        },
                        {
                            title: '描述',
                            align: 'center',
                            sortable: false,
                            field: 'description',
                            editable: true,
                            editType: 'textarea',
                            hint: '自我简介',
                            dataType: 'string'
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
