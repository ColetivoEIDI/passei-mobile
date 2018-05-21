/**
 * PASSEI? (play.google.com/store/apps/details?id=com.eidi.passei)
 *
 * @link https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei
 * @copyright Copyright (c) 2016 Coletivo EIDI
 * @license https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei/blob/master/LICENSE (GNU GENERAL PUBLIC LICENSE)
 */
function UFAL(){
	this.n1=0;
	this.n2=0;
	this.r=0;
	this.rf=0;

	this.mediaPraFazerRec=7;
	this.mediaPraFazerRf=5;
}
UFAL.prototype=new Universidade(1,"UFAL");

UFAL.prototype.carregaNotas=function(n1,n2,r,rf){
	this.n1=isNaN(n1)?1000:n1;
	this.n2=isNaN(n2)?1000:n2;
	this.r=isNaN(r)?1000:r;
	this.rf=isNaN(rf)?1000:rf;
}
UFAL.prototype.block=function(n,b){
	var r=( document.getElementById(b[0]).value==null || document.getElementById(b[0]).value=="")?null:document.getElementById(b[0]).value;

	if((n[0]!=null && n[1]!=null) && (n[0]<=7 || n[1]<=7)){
		document.getElementById("rec").disabled=false;
	}else{
		document.getElementById("rec").disabled=true;
		document.getElementById("rec").value="";
	}
	var notas = this.ordenador([n[0],n[1],r]);

	var media = ((parseFloat(notas[0])+parseFloat(notas[1]))/2).toFixed(2);
	//console.log(media);
	if( (n[0]!=null && n[1]!=null && r!=null) && ( media<7 && media>=5 ) ){
		document.getElementById("rf").disabled=false;	
	}else{
		document.getElementById("rf").disabled=true;
		document.getElementById("rf").value="";
	}
}
UFAL.prototype.semRecuperacao=function(){
	
	if(this.trataExcecao([this.n1,this.n2],10,0)){
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Inválidos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Nota inválida. Valor(es) diferente(s) do esperado."});

		return 0;
	}
	
	
	var media=((parseFloat(this.n1)+parseFloat(this.n2))/2).toFixed(2);
	

	var direito="Sem direito a RA";
	if(this.n1<=7 || this.n2<=7){
		direito="Com direito a RA";
	}

	if(media>=this.mediaPraFazerRec){
		this.setMensagemTitulo("<h4 class='Aprovado'> Aprovado</h4>");
		this.setMensagem({media:media,direito:direito,adicional:""});
	}else{
		var notas=this.ordenador([this.n1,this.n2]);
		var necessarioParaPassar="";
		
		if(direito!="Sem direito a RA"){
			necessarioParaPassar=((14-parseFloat(notas[0])) <=10)?"Precisa tirar "+(14-parseFloat(notas[0])).toFixed(2)+" pontos no mínimo na RA":"Impossivel passar mesmo fazendo a RA, será necessario fazer prova final.";	
		}else{
			necessarioParaPassar="Sua nota está muito abaixo da média, sem possibilidade de aprovação";
		}


		this.setMensagemTitulo("<h4 class='Reprovado'> Reprovado</h4>");
		this.setMensagem({media:media,direito:direito,adicional:""});
	}
}
UFAL.prototype.comRecuperacao=function(){
	if(this.trataExcecao([this.n1,this.n2,this.r],10,0)){
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Inválidos</h4>");
		this.setMensagem({media:"inválida",direito:"inválido",adicional:"Nota inválida. Valor(es) diferente(s) do esperado."});
		return 0;
	}


	var notas=this.ordenador([this.n1,this.n2,this.r]);

	var media=((parseFloat(notas[0])+parseFloat(notas[1]))/2).toFixed(2);
	
	var necessarioParaPassar="";
	var direito="Sem direito a prova final";
	if(media>=5 && media<7){
		direito="Com direito a prova final";

		//formula: (meida*0.6+final*0.4)>=5.5
		necessarioParaPassar="Você precisa tirar no mínimo "+(((media*-0.6) + (5.5))/0.4).toFixed(2)+" pontos na prova final";
	}

	if(media>=this.mediaPraFazerRec){
		this.setMensagemTitulo("<h4 class='Aprovado'> Aprovado</h4>");
		this.setMensagem({media:media,direito:direito,adicional:""});
	}else{
		this.setMensagemTitulo("<h4 class='Reprovado'> Reprovado</h4>");
		this.setMensagem({media:media,direito:direito,adicional:""});
	}
}
UFAL.prototype.recuperacaoFinal=function(){
	if(this.trataExcecao([this.n1,this.n2,this.r,this.rf],10,0)){
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Inválidos</h4>");
		this.setMensagem({media:"inválida",direito:"inválido",adicional:"Nota inválida. Valor(es) diferente(s) do esperado."});
		return 0;
	}

	var notas=this.ordenador([this.n1,this.n2,this.r]);

	var media=((parseFloat(notas[0])+parseFloat(notas[1]))/2).toFixed(2);
	var mediaFinal=((media*0.6)+(this.rf*0.4)).toFixed(2);

	if( mediaFinal >=5.5 ){
		this.setMensagemTitulo("<h4 class='Aprovado'> Aprovado</h4>");
		this.setMensagem({media:mediaFinal,direito:"",adicional:""});
	}else{
		this.setMensagemTitulo("<h4 class='Reprovado'> Reprovado</h4>");
		this.setMensagem({media:mediaFinal,direito:"",adicional:""});
	}
}
//organiza a situação para a melhor resposta
UFAL.prototype.organizador=function(){
	if(this.n1!=null && this.n2!=null && this.r==null){
		this.semRecuperacao();
	}else if(this.n1!=null && this.n2!=null && this.r!=null && this.rf==null){
		this.comRecuperacao();
	}else if(this.n1!=null && this.n2!=null && this.r!=null && this.rf!=null){
		this.recuperacaoFinal();
	}else{
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Incorretos</h4> ");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Verifique se digitou todos os campos obrigatorios*"});
	}
}