(function (angular) {
    angular.module('myApp', ['ui.grid',['../css/myCss.css']])
        .controller('example2', example2)

    example2.$inject = ['$scope', 'firstService', '$stateParams'];

    function example2($scope, firstService, $stateParams) {
        $scope.testParm = $stateParams.id;
        $scope.playerGrid = {
            enableColumnMenus: false,
            rowTemplate: '<div ng-class="{\'bgYellow\':row.entity.RANK == 1,\'bgBlue\':row.entity.RANK == 2,\'bgGreen\':row.entity.RANK == 3}" '+
                'ng-click="grid.appScope.fnOne(row)" ' +
                'ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ui-grid-cell></div>',
            columnDefs: [{
                field: 'RANK',
                name: '排序'
            }, {
                field: 'NAME',
                name: '球员'
            }, {
                field: 'TEAM',
                name: '球队'
            }, {
                field: 'PPG',
                name: '场均得分'
            }, {
                field: 'APG',
                name: '场均助攻'
            }, {
                field: 'RPG',
                name: '场均篮板',
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {//当前uigrid,当前行信息,当前列信息，行index,列index
                    if (row.entity.RPG > 10) {
                      return 'blue';
                    }
                }
            }]
        };

        firstService.readJson("playersData").then(function (response) {
            $scope.playerGrid.data = response.data;
        });
    }
})(angular)
