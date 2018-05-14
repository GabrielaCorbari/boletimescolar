var app = angular.module('customerApp', ['datatables'])
app.controller('customerCtrl', function($scope, $compile, $http, DTOptionsBuilder, DTColumnBuilder) {

    /**
     * init the controller
     */
    $scope.init = function() {
        $scope.db = {}
        $scope.customer = {}
        $scope.customers = {}
        $scope.dtInstance = {};
        $scope.init_dataTable()
        $scope.new()
    }

    /**
     * edit the supplier
     */
    $scope.edit = function(id) {
        $('#saveButton').show()
        $scope.customer = $scope.db[id]
    }

    /**
     * add new supplier
     */
    $scope.new = function() {
        $('#saveButton').show()
        $scope.customer = {
            name: "",
            address: "",
            post: "",
            phone: "",
            province: "",
            city: "",
            region: "",
            
        }
    }

    $scope.view = function(id){
        $('#saveButton').hide();
        $scope.customer = $scope.db[id]
    }

    /**
     * confirm to delete supplier
     */
    $scope.remove = function(id) {
        var customer = $scope.db[id]
        if (customer) {
            ngcurd.confirm({
                title: 'Confirm remove ',
                message: 'Warning: all this customer\'s data will be removed!',
                ok: function() {
                    ngcurd.post('/customer/remove', {id: id}, {
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

        ngcurd.post('/customer/update', $scope.customer, {
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
                url: '/customer/query',
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
            
                DTColumnBuilder.newColumn('id').withTitle('Id'),
                DTColumnBuilder.newColumn('name').withTitle('Name'),
                DTColumnBuilder.newColumn('address').withTitle('Address'),
                DTColumnBuilder.newColumn('post').withTitle('Post'),
                DTColumnBuilder.newColumn('phone').withTitle('Phone'),
                DTColumnBuilder.newColumn('province').withTitle('Province'),
                DTColumnBuilder.newColumn('city').withTitle('City'),
                DTColumnBuilder.newColumn('region').withTitle('Region'),
                DTColumnBuilder.newColumn('id').withTitle('').notSortable().renderWith(function(col, type, row) {
                    $scope.db[row.id] = row
                    return '<button ng-click="view(' + row.id + ')" class="btn btn-default btn-circle" data-toggle="modal"  data-target="#edit_customer" ><i class="fa fa-eye"></i></button> '
                         + '<button ng-click="edit(' + row.id + ')" class="btn btn-success btn-circle" data-toggle="modal"  data-target="#edit_customer"><i class="fa fa-edit"></i></button> ' 
                         + '<button ng-click="remove(' + row.id + ')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#edit_customer" ><i class="fa fa-remove"></i></button>'
                        
                })
            ]
    }


    //init current app.controller
    $scope.init()

});
