/**
 * @file common directive modules
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define([
    'ui_components/co-search/co-search',
    'ui_components/co-grid/co-grid',
    'ui_components/bn-crumb/bn-crumb',
    'ui_components/bn-list/bn-list',
], function () {
    angular.module('adminUi', [
        'bn.crumb',
        'bn.list',
        'co.search',
        'co.grid'
    ]);
});
