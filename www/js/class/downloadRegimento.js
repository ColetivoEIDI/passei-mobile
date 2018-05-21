/**
 * PASSEI? (play.google.com/store/apps/details?id=com.eidi.passei)
 *
 * @link https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei
 * @copyright Copyright (c) 2016 Coletivo EIDI
 * @license https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei/blob/master/LICENSE (GNU GENERAL PUBLIC LICENSE)
 */
function DownloadRegimento(ionic,faculdade,$cordovaFileTransfer,cordova,$scope){
	this.url="";
	var listaDocs=
	{
		"ufal":"http://www.ufal.edu.br/transparencia/institucional/estatuto-e-regimento/Estatuto_Regimento_Ufal.pdf",
		"uneal":"http://www.uneal.edu.br/orgaos/consu/regimento-geral-uneal-atualizacao-21-01-2014.pdf",
		"cesmac":"http://www.cesmac.edu.br/admin/wp-content/uploads/2014/11/ESTATUTO-CESMAC.pdf",
		"ifal":"http://www.saomiguel.ifal.edu.br/arquivos/caa/normas-de-organizacao-didatica-do-ifal",
		"uncisal":"http://www.uncisal.edu.br/wp-content/uploads/2011/04/REGIMENTO-GERAL-DA-UNCISAL-20131.pdf"
	};

	var SELF=this;
	ionic.Platform.ready(function(){
		
		var filename = listaDocs[faculdade].split("/").pop();
		var targetPath = cordova.file.externalRootDirectory+'Download/'+filename;
		SELF.url=targetPath;
		$cordovaFileTransfer.download(listaDocs[faculdade], targetPath, {}, true).then(function (result) {
			$scope.hasil = 'Download finalizado com sucesso! Verifique em seu card SD /Download';
		}, function (error) {
			$scope.hasil = 'Error Download file';
		}, function (progress) {
			document.getElementById("download").style.display="block";
			$scope.downloadProgress = Math.floor((progress.loaded/progress.total)*100);
		});
	});
}


