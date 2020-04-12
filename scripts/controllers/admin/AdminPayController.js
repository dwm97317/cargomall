angular.module('app').controller('AdminPayController', function($scope, $cookies, $filter, $state, $sce, $uibModal, $templateCache, $localStorage, $log, $location, HTTPService, IndexOverlayFactory) {
	//console.log('Hello !');
    // $scope.DEFAULT_LANGUAGE = 'TH';
    // $log.log($scope.session_storage.user_data);
    if(!checkEmptyField($scope.session_storage.user_data)){
      // alert('คุณไม่มีสิทธิ์ใช้งานเมนูนี้');
      window.location.replace('admin/signin');
      // history.back();
      return;
    }

    if(!checkEmptyField($scope.UserData.is_admin) && !$scope.UserData.is_admin){
      alert('คุณไม่มีสิทธิ์ใช้งานเมนูนี้');
      history.back();
      return;
    }

    $templateCache.removeAll();

    $scope.getPayList = function(){
    	IndexOverlayFactory.overlayShow();
  		var params = {'condition' : $scope.condition
                  , 'currentPage': $scope.Pagination.currentPage
                  , 'limitRowPerPage': $scope.Pagination.limitRowPerPage
                };
  		HTTPService.clientRequest('admin/pay/list', params).then(function(result){
  		if(result.data.STATUS == 'OK'){
  			
        $scope.DataList =  result.data.DATA.DataList;
        $scope.Pagination.totalPages = result.data.DATA.Total;
              
  		}else{
  		  var alertMsg = result.data.DATA;
  		  alert(alertMsg);
  		}
  		IndexOverlayFactory.overlayHide();
  		});
    }

    $scope.getUserList = function(){
      HTTPService.clientRequest('admin/user/list', null).then(function(result){
        if(result.data.STATUS == 'OK'){
          
          $scope.UserList =  result.data.DATA.DataList;
        }
      });
    }

    $scope.goToPage = function(page){
        $scope.getPayList();
    }

    $scope.pageChanged = function() {
        $scope.goToPage($scope.currentPage);
    };

    $scope.getPayType = function(pay_type){
      if(pay_type == 1){
        return 'ชำระค่าสินค้าบริการ';
      }else if(pay_type == 2){
        return 'ชำระค่าขนส่ง';
      }else if(pay_type == 3){
        return 'โอนเงินไปจีน';
      }else if(pay_type == 4){
        return 'ฝากจ่าย';
      }else if(pay_type == 5){
        return 'นำเข้าสินค้า';
      }
    }

    $scope.condition = {'user_id' : null, 'pay_type' : null};
    // 1 = ชำระค่าสินค้าบริการ 2 = ชำระค่าขนส่ง, 3=โอนเงินไปจีน, 4=ฝากจ่าย, 5=นำเข้าสินค้า
    $scope.Pagination = {'totalPages' : 0, 'currentPage' : 0, 'limitRowPerPage' : 15, 'limitDisplay' : 10};

    $scope.getUserList();
    $scope.getPayList();

});
