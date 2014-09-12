require.config({
    baseUrl: '/admin'
});

/**
 * app entry
 */
require([
    'ui_components/adminUi', // components module
    'common/adminCommon', // common module
    'business/adminBusiness' // business module
], function () {
    angular.module('Admin', [ 'ngRoute', 'ngAnimate', 'ngResource', 'ngSanitize', 'adminCommon', 'adminUi', 'adminBusiness']);

    angular.bootstrap(document, ['Admin']);
});
