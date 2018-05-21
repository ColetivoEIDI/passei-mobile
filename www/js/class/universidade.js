/**
 * PASSEI? (play.google.com/store/apps/details?id=com.eidi.passei)
 *
 * @link https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei
 * @copyright Copyright (c) 2016 Coletivo EIDI
 * @license https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei/blob/master/LICENSE (GNU GENERAL PUBLIC LICENSE)
 */
function Universidade(id,nome){
	this.id=id;
	this.nome=nome;
	this.mensagem="";
	this.mensagemTitulo="";
}

Universidade.prototype={
	getNome:function(){
		return this.nome;
	},
	getId:function(){
		return this.id;
	},
	setMensagemTitulo:function(mensagem){
		this.mensagemTitulo=mensagem;
	},
	//função que mostra mensagem
	setMensagem:function(mensagem){
		this.mensagem=mensagem;
	},
	getMensagem:function(){
		return {"corpo":this.mensagem,"titulo":this.mensagemTitulo};	
	},
	//verifica se o usuario não digitou um numero não correspondente a notas validas
	trataExcecao:function(lista,max,min){

		for (var i = 0; i < lista.length; i++) {
			if(lista[i]<min || lista[i]>max){
				//this.setMensagem("Dados Incorretos");
				return true;
				break;
			}
		}

		return false;
	},
	//Ordena as notas com a recuperação
	ordenador:function(lista){
		return lista.sort(function(a, b){return b-a});
	}
}