/**
 * PASSEI? (play.google.com/store/apps/details?id=com.eidi.passei)
 *
 * @link https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei
 * @copyright Copyright (c) 2016 Coletivo EIDI
 * @license https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei/blob/master/LICENSE (GNU GENERAL PUBLIC LICENSE)
 */
angular.module('app.controllers', [])
.controller('iNFORAESCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {
}])   
.controller('ufalController', ['$ionicModal','$scope', '$stateParams','$ionicPopup','$cordovaFileTransfer', 
function ($ionicModal,$scope, $stateParams,$ionicPopup,$cordovaFileTransfer) {	

	$scope.Download = function () {
		new DownloadRegimentos("ufal");
	}

	var ufal = new UFAL();
	new Block("page6",["n1","n2"],["rec","rf"],ufal);

	$scope.submitEvento=function(form){

		var n1 = (form.ab1==null || form.ab1==="")?null:form.ab1;
		var n2 = (form.ab2==null || form.ab2==="")?null:form.ab2;
		var r  = (form.rec==null || form.rec==="")?null:form.rec;
		var rf = (form.rf ==null || form.rf ==="")?null:form.rf;		

		ufal.carregaNotas(n1,n2,r,rf);
		ufal.organizador();

		dados={
			titulo:ufal.getMensagem()["titulo"],
			corpo:ufal.getMensagem()["corpo"]
		};
		
		if(new Modal($ionicModal,$scope)){
			setTimeout(function(){
				$scope.modal.show();
			},400);
		}

	}
}])
.controller('unealController', ['$ionicModal','$scope', '$stateParams','$ionicPopup','$cordovaFileTransfer', 
function ($ionicModal,$scope, $stateParams,$ionicPopup,$cordovaFileTransfer) {


	$scope.Download = function () {
		new DownloadRegimentos("uneal");
	}

	var uneal=new UNEAL();
	new Block("pageUneal",["n1","n2"],["r"],uneal);

	$scope.submitEvento=function(form){

		var n1 = (form.n1==null || form.n1==="")?null:form.n1;
		var n2 = (form.n2==null || form.n2==="")?null:form.n2;
		var r  = (form.r ==null || form.r ==="")?null:form.r;		


		uneal.carregaNotas(n1,n2,r);
		uneal.organizador();

		dados={
			titulo:uneal.getMensagem()["titulo"],
			corpo:uneal.getMensagem()["corpo"]
		};
		
		if(new Modal($ionicModal,$scope)){
			setTimeout(function(){
				$scope.modal.show();
			},400);
		}

	}
}])
 .controller('ifalTecnicoController', ['$ionicModal','$scope', '$stateParams','$ionicPopup','$cordovaFileTransfer', 
function ($ionicModal,$scope, $stateParams,$ionicPopup,$cordovaFileTransfer) {


	$scope.Download = function () {
		new DownloadRegimentos("ifal");
	}

	var ifal = new IFALT();
	//new Block("pageIfalT",["n1","n2","n3","n4"],["r1","r2","rf"],ifal);

	$scope.submitEvento=function(form){

		var n1  = (form.n1==null  || form.n1==="")?null:form.n1;
		var n2  = (form.n2==null  || form.n2==="")?null:form.n2;
		var n3  = (form.n3==null  || form.n3==="")?null:form.n3;
		var n4  = (form.n4==null  || form.n4==="")?null:form.n4;
		var r1  = (form.r1==null  || form.r1==="")?null:form.r1;
		var r2  = (form.r2==null  || form.r2==="")?null:form.r2;
		var rf  = (form.rf==null  || form.rf==="")?null:form.rf;		


		ifal.carregaNotas(n1,n2,r1,n3,n4,r2,rf);
		ifal.organizador();

		dados={
			titulo:ifal.getMensagem()["titulo"],
			corpo:ifal.getMensagem()["corpo"]
		};
		
		if(new Modal($ionicModal,$scope)){
			setTimeout(function(){
				$scope.modal.show();
			},400);
		}
	}
}])
.controller('cesmacController', ['$scope', '$stateParams','$ionicPopup','$cordovaFileTransfer','$ionicModal', 
function ($scope, $stateParams,$ionicPopup,$cordovaFileTransfer,$ionicModal) {
	
	var baixar="";
	$scope.Download = function () {
		baixar=new DownloadRegimentos("cesmac");
	}

	var cesmac = new CESMAC();
	//new Block("pageIfalT",["n1","n2","n3","n4"],["r1","r2","rf"],ifal);

	$scope.submitEvento=function(form){
		var n1  = (form.n1==null  || form.n1==="")?null:form.n1;
		var n2  = (form.n2==null  || form.n2==="")?null:form.n2;
		var n3  = (form.n3==null  || form.n3==="")?null:form.n3;
		var r  	= (form.r==null   || form.r ==="")?null:form.r;		

		cesmac.carregaNotas(n1,n2,n3,r);
		cesmac.organizador();

		dados={
			titulo:cesmac.getMensagem()["titulo"],
			corpo:cesmac.getMensagem()["corpo"]
		};
		
		if(new Modal($ionicModal,$scope)){
			setTimeout(function(){
				$scope.modal.show();
			},400);
		}
	}


}])
.controller('uncisalController', ['$scope', '$stateParams','$ionicPopup','$cordovaFileTransfer', 
function ($scope, $stateParams,$ionicPopup,$cordovaFileTransfer) {

	$scope.aviso=function(){
		var modal=$ionicPopup.alert({
			title:"<h4>Informação:</h4>",
			template:"Não conseguimos entender de forma geral o método de cálculo das notas desta instituição.<br>Se você tiver informações de como funciona a mesma, entre em contato com a gente através do email: coletivo.eidi@gmail.com.<br>Contamos com sua ajuda para melhorar nossa aplicação."
		});
	}
}])
.controller('calculadorUniversidadesCtrl', ['$scope', '$stateParams','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
function ($scope, $stateParams,$ionicPopup) {

}])

.controller('modal', ['$scope', '$stateParams','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
function ($scope, $stateParams,$ionicPopup) {
	$scope.modal=dados;
	function trim(vlr){
		return vlr.replace(" ","");
    }
	
	//console.log(dados.titulo);	

	if(trim(dados.titulo)==trim("<h4 class='Aprovado'> Aprovado</h4>")){
		$scope.cor="green";
	}else{
		$scope.cor="#E62117";
	}

}])