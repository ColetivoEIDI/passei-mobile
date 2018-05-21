/**
 * PASSEI? (play.google.com/store/apps/details?id=com.eidi.passei)
 *
 * @link https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei
 * @copyright Copyright (c) 2016 Coletivo EIDI
 * @license https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei/blob/master/LICENSE (GNU GENERAL PUBLIC LICENSE)
 */
function UNEAL(){
	this.n1=0;
	this.n2=0;
	this.rf=0;
}

UNEAL.prototype=new Universidade(2,"UNEAL");




UNEAL.prototype.block=function(n,b){
	var media=((parseFloat(n[0])+parseFloat(n[1]))/2).toFixed(2);
	if(media<7 && media>=4){	
		document.getElementById(b[0]).disabled=false;
		//document.getElementById(b[0]).value="";
	}else{
		document.getElementById(b[0]).disabled=true;
		document.getElementById(b[0]).value="";
	}
}




UNEAL.prototype.carregaNotas=function(n1,n2,rf){
	this.n1=isNaN(n1)?1000:n1;
	this.n2=isNaN(n2)?1000:n2;
	this.rf=isNaN(rf)?1000:rf;
}

UNEAL.prototype.semRecuperacao=function(){
	
	if(this.trataExcecao([this.n1,this.n2],10,0)){
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Inválidos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Nota inválida. Valor(es) diferente(s) do esperado."});
		return 0;
	}
	var aprovacao="";
	var precisa="";

	var media=((parseFloat(this.n1)+parseFloat(this.n2))/2).toFixed(2);
	var direito ="";
	if(media>=7){
		aprovacao="Aprovado";
	}else{
		aprovacao="Reprovado";
	}
	if(media>=4 && media <7){
		direito ="Com direito a prova final";
		precisa="Você precisa de "+(((media*-0.6) + (5))/0.4).toFixed(2)+" pontos no mínimo para passar";
	}else{
		direito ="Sem direito a prova final";
	}

	this.setMensagemTitulo("<h4 class='"+aprovacao+"'> "+aprovacao+"</h4>");
	this.setMensagem({media:media,direito:direito,adicional:""});

}

UNEAL.prototype.recuperacaoFinal=function(){
	if(this.trataExcecao([this.n1,this.n2,this.r,this.rf],10,0)){
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Inválidos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Nota inválida. Valor(es) diferente(s) do esperado."});
		return 0;
	}

	var media=((parseFloat(this.n1)+parseFloat(this.n2))/2).toFixed(2);
	var mediaFinal=((media*0.6)+(this.rf*0.4)).toFixed(2);

	if( mediaFinal >=5 ){
		this.setMensagemTitulo("<h4 class='Aprovado'> Aprovado</h4>");
		this.setMensagem({media:mediaFinal,direito:"",adicional:""});
	}else{
		this.setMensagemTitulo("<h4 class='Reprovado'> Reprovado</h4>");
		this.setMensagem({media:mediaFinal,direito:"",adicional:""});
	}
}


UNEAL.prototype.organizador=function(){

	if(this.n1!=null && this.n2!=null && this.rf==null){
		this.semRecuperacao();
	}else if(this.n1!=null && this.n2!=null && this.rf!=null){
		this.recuperacaoFinal();
	}else{
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Incorretos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Verifique se digitou todos os campos obrigatorios*"});
	}
}
