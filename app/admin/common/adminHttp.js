/**
 * http dealwith
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define([], function () {
    'use strict';
    angular.module('adminHttp', [])
        .factory('adminUrl', function ($rootScope) {
            var PROTOCOL_PREFIX = /^https?\:\/\//;
            var API_PREFIX = /\/api\//;

            return {
                resolve: function (path) {
                    if (PROTOCOL_PREFIX.test(path)) {
                        return path;
                    }
                    if (!API_PREFIX.test(path)) {
                        return path;
                    }
                    if ($rootScope.URL_PROFIX) {
                        return $rootScope.URL_PROFIX + path;
                    }

                    return path;
                },
                isApi: function (path) {
                    if (API_PREFIX.test(path)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            };
        })
        .factory('httpInterceptor', ['$q', '$rootScope', '$window', 'adminUrl',

            function ($q, $rootScope, window, adminUrl) {

                function normalizeUrl (config) {
                    config.originUrl = config.url;
                    config.url       = adminUrl.resolve(config.url);
                }

                function restoreUrl(config) {
                    if ('originUrl' in config) {
                        config.url = config.originUrl;
                        delete config.originUrl;
                    }
                }

                return {
                    request: function (config) {
                        normalizeUrl(config);

                        if (adminUrl.isApi(config.url)) {
                            $rootScope.isLoading = true;
                        }

                        return config;
                    },
                    response: function (response) {
                        restoreUrl(response.config);

                        if (adminUrl.isApi(response.config.url)) {
                           $rootScope.isLoading = false;
                        }

                        return response;
                    },

                    responseError: function (response) {
                        var status = response.status;
                        var data   = response.data;

                        if (adminUrl.isApi(response.config.url)) {
                            $rootScope.isLoading = false;
                        }

                        // no auth
                        if (status === 403) {
                            window.alert('请登录！');
                        }

                        if (status === 500) {
                            window.alert('系统错误');
                        }

                        return $q.reject(response);
                    }
                };
            }
        ])
        .config(['$httpProvider',
            function ($httpProvider) {
                //$httpProvider.defaults.transformResponse.splice(0, 1);
                $httpProvider.interceptors.push('httpInterceptor');
            }
        ]);
});
