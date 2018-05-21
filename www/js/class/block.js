/**
 * PASSEI? (play.google.com/store/apps/details?id=com.eidi.passei)
 *
 * @link https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei
 * @copyright Copyright (c) 2016 Coletivo EIDI
 * @license https://github.com/paulohrodriguesaifal/ColetivoEIDI-Passei/blob/master/LICENSE (GNU GENERAL PUBLIC LICENSE)
 */
function Block(page,inputs,blocks,objeto){
	this.page=page;
	this.inputs=inputs;
	this.objeto=objeto;
	this.blocks=blocks;

	for (var i = 0; i < blocks.length; i++) {
		document.getElementById(blocks[i]).disabled=true;
	}
	

	var THIS=this; 
	document.getElementById(this.page).addEventListener("keyup",function(){
		
		var n=[]; 	
		for (var i = 0; i < inputs.length; i++) {
			n.push( THIS.atribuiValor(document.getElementById(inputs[i]).value) );
		}
		
		THIS.objeto.block(n,THIS.blocks);
	});
}


Block.prototype={

	atribuiValor:function(valor){
		return (valor==null || valor=="")?null:valor;
	}
}