/**
 * @file common directive modules
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define([
    'ui_components/co-validator/co-validator',
    'ui_components/co-sort/co-sort',
    'ui_components/co-search/co-search',
    'ui_components/co-grid/co-grid',
    'ui_components/bn-crumb/bn-crumb',
    'ui_components/bn-list/bn-list',
    'ui_components/bn-form/bn-form',
], function () {
    angular.module('adminUi', [
        'bn.crumb',
        'bn.list',
        'bn.form',
        'co.search',
        'co.sort',
        'co.grid',
        'co.validator'
    ]);
});
