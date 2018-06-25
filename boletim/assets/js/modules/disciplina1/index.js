var app = angular.module('disciplinaApp', ['datatables'])
app.controller('disciplinaCtrl', function($scope, $compile, $http, DTOptionsBuilder, DTColumnBuilder) {

    /**
     * init the controller
     */
    $scope.init = function() {
        $scope.db = {}
        $scope.disciplina = {}
        $scope.disciplinas = {}
        $scope.dtInstance = {};
        $scope.init_dataTable()
		   $scope.new()
    }
	
	
    /**
     * edit the supplier
     */
    $scope.edit = function(id) {
        $('#saveButton').show()
        $scope.disciplina = $scope.db[id]
    }

    /**
     * add new supplier
     */
    $scope.new = function() {
        $('#saveButton').show()
        $scope.disciplina = {
            professor: "",
            
        }
    }

    $scope.view = function(id){
        $('#saveButton').hide();
        $scope.disciplina = $scope.db[id]
    }

    /**
     * confirm to delete supplier
     */
    $scope.remove = function(id) {
        var disciplina = $scope.db[id]
        if (disciplina) {
            ngcurd.confirm({
                title: 'Confirm remove ',
                message: 'Warning: all this disciplina\'s data will be removed!',
                ok: function() {
                    ngcurd.post('/disciplina/remove', {nome: id}, {
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

        ngcurd.post('/disciplina/update', $scope.disciplina, {
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
                url: '/disciplina/query',
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
            
                DTColumnBuilder.newColumn('nome').withTitle('Nome'),
                DTColumnBuilder.newColumn('professor').withTitle('Professor'),
                DTColumnBuilder.newColumn('nome').withTitle('').notSortable().renderWith(function(col, type, row) {
                    $scope.db[row.nome] = row
                    return '<button ng-click="view(' + row.nome + ')" class="btn btn-default btn-circle" data-toggle="modal"  data-target="#edit_disciplina" ><i class="fa fa-eye"></i></button> '
                         + '<button ng-click="edit(' + row.nome + ')" class="btn btn-success btn-circle" data-toggle="modal"  data-target="#edit_disciplina"><i class="fa fa-edit"></i></button> ' 
                         + '<button ng-click="remove(' + row.nome + ')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#edit_disciplina" ><i class="fa fa-remove"></i></button>'
                        
                })
            ]
    }


    //init current app.controller
    $scope.init()

});
