/**
 * @author  gaohailang@wandoujia.com
 */

define([], function(tpl) {
    'use strict';

    angular.module('co.Filter', [])
        .directive('coFilter', ['coFilterConfig',
            function(coFilterConfig) {
                return {
                    restrict: 'E',
                    scope: {
                        fieldList: '@',
                        filterStates: '='
                    },
                    controller: function($scope) {
                        // Ref: type: str|num
                        var _settings = {
                            odata: [{
                                oper: 'eq',
                                text: 'equal'
                            }, {
                                oper: 'ne',
                                text: 'not equal'
                            }, {
                                oper: 'lt',
                                text: 'less'
                            }, {
                                oper: 'le',
                                text: 'less or equal'
                            }, {
                                oper: 'gt',
                                text: 'greater'
                            }, {
                                oper: 'ge',
                                text: 'greater or equal'
                            }, {
                                oper: 'bw',
                                text: 'begins with'
                            }, {
                                oper: 'bn',
                                text: 'does not begin with'
                            }, {
                                oper: 'in',
                                text: 'is in'
                            }, {
                                oper: 'ni',
                                text: 'is not in'
                            }, {
                                oper: 'ew',
                                text: 'ends with'
                            }, {
                                oper: 'en',
                                text: 'does not end with'
                            }, {
                                oper: 'cn',
                                text: 'contains'
                            }, {
                                oper: 'nc',
                                text: 'does not contain'
                            }],
                            candidatesRelOpts: [{
                                op: "AND",
                                text: "all"
                            }, {
                                op: "OR",
                                text: "any"
                            }],
                            opt: {
                                numopts: ['eq', 'ne', 'lt', 'le', 'gt', 'ge', 'nu', 'nn', 'in', 'ni'],
                                stropts: ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc', 'nu', 'nn', 'in', 'ni']
                            }
                        };

                        var _state = {
                            candidates: []
                        };
                        $scope.state = _state;

                        var typedOperOptsMap = {
                            num: assemblyTypedOpts('numopts'),
                            str: assemblyTypedOpts('stropts')
                        };

                        $scope.candidatesRelOpts = _settings.candidatesRelOpts;
                        $scope.candidatesRel = 'AND'; // set default

                        $scope.addCandidate = function() {
                            _state.candidates.push({});
                        };
                        $scope.delCandidate = function(idx) {
                            _state.candidates.splice(idx, 1);
                        };
                        $scope.resetCandidates = function() {
                            _state.candidates = [];
                        };
                        $scope.submitCandidates = function() {
                            // set to export bind model, close modal?!
                            // Todo: seerialize the candidates as SQL-like query string?
                            $scope.filterStates = _state.candidates;
                            $scope.$close();
                        };

                        /* view helper */
                        $scope.getOperators = function(idx) {
                            var _field = _state.candidates[idx];
                            if (_field) {
                                return typedOperOptsMap[_field.type];
                            } else {
                                return stropts; // default opt
                            }
                        };

                        /* inner function */
                        function assemblyTypedOpts(type) {
                            return _.map(_settings.opt[type], function(oper) {
                                _.each(_settings.odata, function(obj) {
                                    if (obj.oper === oper) {
                                        return {
                                            name: oper,
                                            alias: obj.text
                                        };
                                    }
                                });
                            });
                        }
                    },
                    templateUrl: function(tElement, tAttrs) {
                        return tAttrs.templateUrl || '/admin/ui_components/co-filter/co-filter.html';
                    },
                    link: function($scope, element, attrs, ctrls) {

                        $scope.itemTemplateUrl =
                            angular.isDefined(attrs.itemTemplateUrl) ? $scope.$parent.$eval(attrs.itemTemplateUrl) : coFilterConfig.itemTemplateUrl;

                        $scope.fields =
                            angular.isDefined(attrs.fields) ? $scope.$parent.$eval(attrs.fields) : coFilterConfig.fields;

                        $scope.actions =
                            angular.isDefined(attrs.actions) ? $scope.$parent.$eval(attrs.actions) : coFilterConfig.actions;
                    }
                };
            }
        ])
});