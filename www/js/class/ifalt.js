/**
 * PASSEI? (play.google.com/store/apps/details?id=com.eidi.passei)
 *
 * @link https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei
 * @copyright Copyright (c) 2016 Coletivo EIDI
 * @license https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei/blob/master/LICENSE (GNU GENERAL PUBLIC LICENSE)
 */
function IFALT(){
	this.n1=0;
	this.n2=0;
	this.r1=0;
	this.n3=0;
	this.n4=0;
	this.r2=0;
	this.rf=0;
	this.aviso="<br><br>OBS.: Por motivos de atualizações no regimento e no sistema acadêmico da instituição não estamos considerando os aredondamentos";
}
IFALT.prototype=new Universidade(3,"IFALT");
IFALT.prototype.block=function(n,b){
	/*
	var media=((parseFloat(n[0])+parseFloat(n[1]))/2);
	if(media<7 && media>=4){	
		document.getElementById(b[0]).disabled=false;
		//document.getElementById(b[0]).value="";
	}else{
		document.getElementById(b[0]).disabled=true;
		document.getElementById(b[0]).value="";
	}
	*/
}
IFALT.prototype.carregaNotas=function(n1,n2,r1,n3,n4,r2,rf){
	this.n1=isNaN(n1)?1000:n1;
	this.n2=isNaN(n2)?1000:n2;
	this.r1=isNaN(r1)?1000:r1;
	this.n3=isNaN(n3)?1000:n3;
	this.n4=isNaN(n4)?1000:n4;
	this.r2=isNaN(r2)?1000:r2;
	this.rf=isNaN(rf)?1000:rf;
}
IFALT.prototype.comRF=function(){

	if(this.trataExcecao([this.n1,this.n2],10,0)){
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Inválidos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Nota inválida. Valor(es) diferente(s) do esperado."});
		return 0;
	}

	var A=this.ordenador([this.n1,this.n2,this.r1]);
	var B=this.ordenador([this.n3,this.n4,this.r2]);
	

	var media=( ((A[0]+A[1]+B[0]+B[1])/4)*0.4 + (this.rf*0.6) ).toFixed(2); 	
	var aprovacao=(media>=5)?"Aprovado":"Reprovado";
	this.setMensagemTitulo("<h4 class='"+aprovacao+"'> "+aprovacao+"</h4>");
	this.setMensagem({media:media,direito:"",adicional:""});
}
IFALT.prototype.semRF=function(){

	if(this.trataExcecao([this.n1,this.n2],10,0)){
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Inválidos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Nota inválida. Valor(es) diferente(s) do esperado."});

		return 0;
	}
	var A=this.ordenador([this.n1,this.n2,this.r1]);
	var B=this.ordenador([this.n3,this.n4,this.r2]);

	var media=( (A[0]+A[1]+B[0]+B[1])/4).toFixed(2); 
	var aprovacao=(media>=6)?"Aprovado":"Reprovado";
	var precisa="";
	
	if(aprovacao!="Aprovado" && (A[0]+A[1]+B[0]+B[1])>=16){
		precisa="Precisa tirar no mínimo "+(((media*-0.6) + (5))/0.4).toFixed(2)+" pontos na Recuperação Final";
	}

	this.setMensagemTitulo("<h4 class='"+aprovacao+"'> "+aprovacao+"</h4>");
	this.setMensagem({media:media,direito:"",adicional:precisa});
}
IFALT.prototype.semR2=function(){

	if(this.trataExcecao([this.n1,this.n2],10,0)){
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Inválidos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Nota inválida. Valor(es) diferente(s) do esperado."});
		return 0;
	}

	var A=this.ordenador([this.n1,this.n2,this.r1]);
	var B=this.ordenador([this.n3,this.n4,this.r2]);
	var media=((A[0]+A[1]+B[0]+B[1])/4).toFixed(2);
	var aprovacao=(media>=6)?"Aprovado":"Reprovado";
	var precisa="";
	if(media<6){
		if((24-(A[0]+A[1]+B[0]))<=10){
			precisa="Precisa de "+(24-(A[0]+A[1]+B[0])).toFixed(2)+" pontos na R2";
		}else{
			precisa="Precisa fazer recuperação final";
		}
	}

	this.setMensagemTitulo("<h4 class='"+aprovacao+"'> "+aprovacao+"</h4>");
	this.setMensagem({media:media,direito:"",adicional:precisa});
}
IFALT.prototype.comR2=function(){

	if(this.trataExcecao([this.n1,this.n2,this.r2],10,0)){
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Inválidos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Nota inválida. Valor(es) diferente(s) do esperado."});
		return 0;
	}

	var A=this.ordenador([this.n1,this.n2,this.r1]);
	var B=this.ordenador([this.n3,this.n4,this.r2]);
	var media=((A[0]+A[1]+B[0]+B[1])/4).toFixed(2);
	var aprovacao=(media>=6)?"Aprovado":"Reprovado";
	var precisa="";
	if(media<6){
		if((A[0]<6 || A[1]<6) && this.r1==null){
			precisa="Sem direito a recuperação Final pois deixou de fazer a reposição1";
		}else{
			if((A[0]+A[1]+B[0]+B[1]) >=16){
				precisa="Precisa de "+(((media*-0.6) + (5))/0.4).toFixed(2)+" pontos na recuperação final";
			}else{
				precisa="Sem direito a recuperação Final, porque não atingiu a nota mínima de 16 pontos durante os 4 bimestres";
			}
		}
	}

	this.setMensagemTitulo("<h4 class='"+aprovacao+"'> "+aprovacao+"</h4>");
	this.setMensagem({media:media,direito:precisa,adicional:""});
}
IFALT.prototype.comR1=function(){

	if(this.trataExcecao([this.n1,this.n2,this.r1],10,0)){
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Inválidos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Nota inválida. Valor(es) diferente(s) do esperado."});
		return 0;
	}

	var A=this.ordenador([this.n1,this.n2,this.r1]);
	var media=((A[0]+A[1])/2).toFixed(2);
	var aprovacao=(media>=6)?"Aprovado":"Reprovado";
	var precisa="";
	
	if(media<6){
		precisa="Reprovado nesse primeiro semestre mas com possibilidade de aprovação no proximo. Bons Estudos!";
	}else{
		precisa="Aprovado com êxito até o atual momento";
	}
	this.setMensagemTitulo("<h4 class='"+aprovacao+"'> "+aprovacao+"</h4>");
	this.setMensagem({media:media,direito:"",adicional:precisa});
}

IFALT.prototype.semR1=function(){

	if(this.trataExcecao([this.n1,this.n2],10,0)){
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Inválidos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Nota inválida. Valor(es) diferente(s) do esperado."});
		return 0;
	}

	var A=this.ordenador([this.n1,this.n2,this.r1]);
	var media=((A[0]+A[1])/2).toFixed(2);
	var aprovacao=(media>=6)?"Aprovado":"Reprovado";
	var precisa="";
	
	if(A[0] <=6 || A[1] <=6){
		precisa="Com direito a reposição";
	}else{
		precisa="Sem direito a reposição";
	}

	this.setMensagemTitulo("<h4 class='"+aprovacao+"'> "+aprovacao+"</h4>");
	this.setMensagem({media:media,direito:precisa,adicional:(aprovacao=="Aprovado")?"Aprovado nesse primeiro semestre":"Reprovado nesse primeiro semestre"});
}


IFALT.prototype.organizador=function(){
	var A=(this.n1!=null && this.n2!=null);
	var B=(this.n3!=null && this.n4!=null);
	var C=(this.r1!=null);
	var D=(this.r2!=null);
	var E=(this.rf!=null);
	if(A && B && E){
		this.comRF();
		return 0;
	}
	if(A && B && C && D && this.rf==null){
		this.semRF();
		return 0;
	}
	if(A && B && D && this.rf==null){
		this.comR2();
		return 0;
	}
	if(A && B && this.rf==null){
		this.semR2();
		return 0;
	}
	if(A && C && this.n3==null){
		this.comR1();
		return 0;
	}
	if(A==true && this.n3==null){
		this.semR1();
		return 0;
	}else{
		this.setMensagemTitulo("<h4 class='Reprovado'> Dados Incorretos</h4>");
		this.setMensagem({media:"Inválida",direito:"Inválido",adicional:"Verifique se digitou todos os campos obrigatorios*"});
		return 0;
	}
}