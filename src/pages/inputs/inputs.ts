import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
@Component({
  selector: 'page-inputs',
  templateUrl: 'inputs.html',
})
export class InputsPage {
  private university:{name,rules,id};
  public inputs:Array<{id,body}>;
  public inputsValues={};
  public resposta:{mensagem:string,media:number};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.resposta = {mensagem:"",media:null};
    this.university = navParams.get("university");
    this.getUniversityInputs();
  }
  public getUniversity():{name,rules,id}{
    return this.university;
  }
  private getUniversityInputs():any{
    this.inputs=[];
    var lista = this.getUniversity().rules.inputs;
    for(let i in lista){
      this.inputsValues[i]=null;
      this.inputs.push({
        id:i,
        body:lista[i]
      });
    }
  }

  public calc():void{
    var val = {};
    for(let i in this.inputsValues){
      val[i] = parseFloat(this.inputsValues[i]);
    }
    var res = eval(this.university.rules.if.result[this.returnHash()].calc);
    
    for(let key in this.university.rules.if.result[this.returnHash()].if){
      if(eval(key)){
        this.resposta.mensagem = this.university.rules.if.result[this.returnHash()].if[key];
        console.log(this.university.rules.if.result[this.returnHash()].if[key]);
        break;
      }
    }
    this.resposta.media = res;
    console.log(res);
  }

  private returnHash():string{
      var cast = ""; 
      for(let item in this.inputsValues){
        if(this.inputsValues[item]!=null && this.inputsValues[item]!=""){
          cast+=item+"&";
        }
      }
      return cast;
  }
}