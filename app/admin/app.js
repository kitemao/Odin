require.config({
    baseUrl: '/admin'
});

/**
 * app entry
 */
require([
    'ui-components/adminUi', // components module
    'common/adminCommon' // common module
], function () {
    angular.module('Admin', [ 'ngAnimate', 'ngResource', 'ngSanitize', 'adminUi', 'adminCommon'])
    .controller('Admin', function ($scope) {
        alert(1112);
    });
    angular.bootstrap(document, ['Admin']);
});
