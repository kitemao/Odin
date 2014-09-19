/**
 * @file common modules
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define([
    'common/adminRoute',
    'common/adminHttp',
], function () {
    angular.module('adminCommon', [ 'adminRoute', 'adminHttp']);
});
