(function (angular) {
    angular.module('myApp', ['ui.grid', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.cellNav', ['../css/myCss.css']])
        .controller('example2', example2)

    example2.$inject = ['$scope', '$stateParams', 'i18nService', 'uiGridConstants', 'getPlayerData'];

    function example2($scope, $stateParams, i18nService, uiGridConstants, getPlayerData) {
        i18nService.setCurrentLang('zh-cn');

        $scope.testParm = $stateParams.id;

        $scope.playerGrid = {
            enableFiltering: true,
            enableGridMenu : true,
            multiSelect: false,
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            rowTemplate: '<div ng-class="{\'bgYellow\':row.entity.RANK == 1,\'bgBlue\':row.entity.RANK == 2,\'bgGreen\':row.entity.RANK == 3}" ' +
                'ng-click="grid.appScope.fnOne(row)" ' +
                'ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ui-grid-cell></div>',
            onRegisterApi: function (gridApi) {
                $scope.playerGridAPi = gridApi;
                gridApi.edit.on.afterCellEdit($scope,
                    function (rowEntity, colDef, newValue, oldValue) { //当前行，修改的列，新值，旧值
                        if (colDef.field == 'PPG') {
                            if (newValue > oldValue) {
                                rowEntity['APG'] = parseFloat((rowEntity['APG'] + 0.3).toFixed(1));
                            } else if (newValue < oldValue) {
                                rowEntity['APG'] = parseFloat((rowEntity['APG'] - 0.3).toFixed(1));
                            }
                        }

                    });

                gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                    console.log(rows.entity);
                });
            },
            columnDefs: [{
                field: 'RANK',
                name: '排序',
                filter: {
                    //term: 1,
                    placeholder: 'starts with...',
                    disableCancelFilterButton: true
                }
            }, {
                field: 'NAME',
                name: '球员',
                filter: {
                    condition: uiGridConstants.filter.STARTS_WITH,
                },
                // filter: {
                //     noTerm: true,
                //     condition: function(searchTerm, cellValue, row, column) {
                //         return cellValue.length == 6 && cellValue.match(searchTerm);
                //       }
                // },
            }, {
                field: 'TEAM',
                name: '球队'
            }, {
                field: 'PPG',
                name: '场均得分',
                type: 'number',
                filters: [
                    {
                      condition: uiGridConstants.filter.GREATER_THAN,
                      placeholder: '大于'
                    },
                    {
                      condition: uiGridConstants.filter.LESS_THAN,
                      placeholder: '小于'
                    }
                  ]
            }, {
                field: "TEAMAS",
                name: "球队缩写",
                filter: {
                    flags: { caseSensitive: true },
                }
            }, {
                field: 'APG',
                name: '场均助攻',
                type: 'number',
                enableSorting: false,
                enableFiltering: false,
            }, {
                field: 'RPG',
                name: '场均篮板',
                cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) { //当前uigrid,当前行信息,当前列信息，行index,列index
                    if (row.entity.RPG > 10) {
                        return 'blue';
                    }
                },
                type: 'number'
            }]
        };

        $scope.playerGrid.data = getPlayerData.data;
    }
})(angular)