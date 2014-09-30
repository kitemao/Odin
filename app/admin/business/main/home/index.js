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
            paginationOptions: {
                itemsPerPage: '10',
                maxSize: 5
            },
            gridOptions: {
                fields: [
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
                        placeholder: '请输入名字',
                        dataType: 'string',
                        validate: {
                            required : { errorMsg: '请输入名字', value: true },
                            maxlength: { errorMsg: '最多不能超过15个字符', value: 15 }
                        },
                        help: 'test'
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
                        help: '性别',
                        dataType: 'number',
                        validate: {
                            required: { errorMsg: '请输入性别', value: true}
                        },
                        content: function (item) {
                            return item.gender === 0 ? '男' : '女';
                        }
                    },
                    {
                        title: '婚否',
                        align: 'center',
                        sortable: true,
                        field: 'marital',
                        editable: true,
                        editType: 'radio',
                        radioOptions: [
                            {
                                value: 0, text: '已婚'
                            },
                            {
                                value: 1, text: '未婚'
                            }
                        ],
                        help: '隐婚、裸婚、阴婚',
                        dataType: 'number',
                        validate: {
                            required: { errorMsg: '请选择', value: true}
                        },
                        content: function (item, fields) {
                            return _.find(fields.radioOptions, function (n) {
                                return n.value === item.marital;
                            }).text;
                        }
                    },
                    {
                        title: '爱好',
                        align: 'center',
                        sortable: true,
                        field: 'hobby',
                        editable: true,
                        editType: 'checkbox',
                        checkboxOptions: [
                            {
                                value: 1, text: '游泳'
                            },
                            {
                                value: 2, text: '羽毛球'
                            },
                            {
                                value: 3, text: '跑步'
                            },
                            {
                                value: 4, text: '网球'
                            }
                        ],
                        help: '没有爱好是悲哀的',
                        dataType: 'number',
                        content: function (item, fields) {
                            var arr = [];
                            _.each(fields.checkboxOptions, function (n) {
                                if (_.indexOf(item.hobby, n.value) != -1) {
                                    arr.push(n.text);
                                }
                            });

                            return arr.join();
                        }
                    },
                    {
                        title: '描述',
                        align: 'center',
                        sortable: false,
                        field: 'description',
                        editable: true,
                        editType: 'textarea',
                        placeholder: '自我简介',
                        dataType: 'string',
                        validate: {
                            required: { errorMsg: '请输入内容', value: true}
                        }
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
                    },
                    {
                        title: '审核',
                        type: 'custom',
                        action: function () {
                            alert(1111);
                        }
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
