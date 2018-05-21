/**
 * PASSEI? (play.google.com/store/apps/details?id=com.eidi.passei)
 *
 * @link https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei
 * @copyright Copyright (c) 2016 Coletivo EIDI
 * @license https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei/blob/master/LICENSE (GNU GENERAL PUBLIC LICENSE)
 */
function CESMAC(){
	this.n1=0;
	this.n2=0;
	this.n3=0;
	this.r=0;
}

CESMAC.prototype=new Universidade();


CESMAC.prototype.carregaNotas=function(n1,n2,n3,r){
	this.n1=isNaN(n1)?1000:n1;
	this.n2=isNaN(n2)?1000:n2;
	this.n3=isNaN(n3)?1000:n3;
	this.r=	isNaN(r)?1000:r;
}


CESMAC.prototype.semR=function(){
	if(this.trataExcecao([this.n1,this.n2,this.n3],10,0)){
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Inválidos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Nota inválida. Valor(es) diferente(s) do esperado."});
		return 0;
	}

	var media=((this.n1+this.n2+this.n3)/3).toFixed(2);
	var aprovacao=(media>=6)?"Aprovado":"Reprovado";
	
	this.setMensagemTitulo("<h4 class='"+aprovacao+"'> "+aprovacao+"</h4>");
	this.setMensagem({media:media,direito:"",adicional:""});
}

CESMAC.prototype.comR=function(){

	if(this.trataExcecao([this.n1,this.n2,this.n3,this.r],10,0)){
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Inválidos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Nota inválida. Valor(es) diferente(s) do esperado."});
		return 0;
	}

	var nostasOrdenadas=this.ordenador([this.n1,this.n2,this.n3,this.r]);

	var media=((nostasOrdenadas[0]+nostasOrdenadas[1]+nostasOrdenadas[2])/3).toFixed(2);
	var aprovacao=(media>=6)?"Aprovado":"Reprovado";
	this.setMensagemTitulo("<h4 class='"+aprovacao+"'> "+aprovacao+"</h4>");
	this.setMensagem({media:media,direito:"",adicional:""});
}


CESMAC.prototype.organizador=function(){

	var A=(this.n1!=null && this.n2!=null && this.n3!=null);
	var B=(this.r!=null);

	if(A && !B){
		this.semR();
		return 0;
	}else if(A){
		this.comR();
		return 0;
	}else{	
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Incorretos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Verifique se digitou todos os campos obrigatorios*"});

	}
}