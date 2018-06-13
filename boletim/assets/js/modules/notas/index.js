var app = angular.module('notasApp', ['datatables'])
app.controller('notasCtrl', function($scope, $compile, $http, DTOptionsBuilder, DTColumnBuilder) {

    /**
     * init the controller
     */
    $scope.init = function() {
        $scope.db = {}
        $scope.notas = {}
        $scope.notass = {}
        $scope.dtInstance = {};
        $scope.init_dataTable()
        $scope.new()
    }

    /**
     * edit the supplier
     */
    $scope.edit = function(id) {
        $('#saveButton').show()
        $scope.notas = $scope.db[id]
    }

    /**
     * add new supplier
     */
    $scope.new = function() {
        $('#saveButton').show()
        $scope.notas = {
            frequencia: "",
            
        }
    }

    $scope.view = function(id){
        $('#saveButton').hide();
        $scope.notas = $scope.db[id]
    }

    /**
     * confirm to delete supplier
     */
    $scope.remove = function(id) {
        var notas = $scope.db[id]
        if (notas) {
            ngcurd.confirm({
                title: 'Confirm remove ',
                message: 'Warning: all this notas\'s data will be removed!',
                ok: function() {
                    ngcurd.post('/notas/remove', {avaliacao: id}, {
                        success: function(){
                            $scope.dtInstance.reloadData()
                        }
                    })
                }
            })
        }
    }

    /**
     * add or update supplier
     */
    $scope.save = function() {

        ngcurd.post('/notas/update', $scope.notas, {
            success: function(){
                $scope.dtInstance.reloadData()
            }
        })
    }

    /**
     * init the DataTable
     */
    $scope.init_dataTable = function() {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
                url: '/notas/query',
                type: 'POST'
            })
            // or here
            .withDataProp('data')
            .withOption('processing', true)
            .withOption('serverSide', true)
            .withOption('responsive', true)
            .withPaginationType('full_numbers')
            .withOption('createdRow', function(row, data, dataIndex) {
                // Recompiling so we can bind Angular directive to the DT
                $compile(angular.element(row).contents())($scope);
            });
        $scope.dtColumns = [
            
                DTColumnBuilder.newColumn('avaliacao').withTitle('Avaliacao'),
                DTColumnBuilder.newColumn('frequencia').withTitle('Frequencia'),
                DTColumnBuilder.newColumn('avaliacao').withTitle('').notSortable().renderWith(function(col, type, row) {
                    $scope.db[row.avaliacao] = row
                    return '<button ng-click="view(' + row.avaliacao + ')" class="btn btn-default btn-circle" data-toggle="modal"  data-target="#edit_notas" ><i class="fa fa-eye"></i></button> '
                         + '<button ng-click="edit(' + row.avaliacao + ')" class="btn btn-success btn-circle" data-toggle="modal"  data-target="#edit_notas"><i class="fa fa-edit"></i></button> ' 
                         + '<button ng-click="remove(' + row.avaliacao + ')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#edit_notas" ><i class="fa fa-remove"></i></button>'
                        
                })
            ]
    }


    //init current app.controller
    $scope.init()

});
