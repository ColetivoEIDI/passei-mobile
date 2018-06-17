import { InputsPage } from './../inputs/inputs';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private listUnivers:Array<{name,rules,id}>;

  constructor(public navCtrl: NavController) {
    this.listUnivers=[];
    this.listUniversity();
  }

  private listUniversity():Promise<any>{
    var self=this;
    return new Promise((resolve)=>{
      firebase.firestore()
      .collection("universities")
      .onSnapshot((result:firebase.firestore.QuerySnapshot)=>{
        this.listUnivers=[];
        //colocar em um pipe depois
        for(let item of result.docs){
          self.listUnivers.push({
            name:item.data().name,
            rules:item.data().rules,
            id:item.id
          });
        }
        resolve(true);
      });
    });
  }

  public getListUniversity():Array<{name,rules,id}>{
    return this.listUnivers;
  }

  public openInput(item:{name,rules,id}):void{
    this.navCtrl.push(InputsPage,{university:item});
  }


}



  // firebase.firestore()
    //   .collection("universities")
    //   .doc()
    //   .set({
    //     "name":"UFAL",
    //     "rules":{
    //         "inputs":{
    //             "in1": {"name":"in1"},
    //             "in2": {"name":"in2"},
    //             "r": {"name":"r"},
    //             "rf": {"name":"rf"}
    //         },
    //         "if":{
    //             "result":{
    //                 "in1&in2&": {
    //                     "calc":"(val['in1']+val['in2'])/2",
    //                     "if":{"res>=7":"Aprovado!","res<7":"Reprovado! Com direito a resposição!"}
    //                 },
    //                 "in1&in2&r&":{
    //                     "calc":"( (val['in1'] >= val['in2']) ? val['in1'] : ( r > val['in1'] : r ? val['in1'] ) ) + ( (val['in2'] > val['in1']) ? val['in2'] : ( r > val['in2'] : r ? val['in2'] ) ) / 2"
    //                 },
    //                 "in1&in2&rf&":{
    //                     "calc":"1"
    //                 },
    //                 "in1&in2&r&rf&":{
    //                     "calc":"1"
    //                 }
    //             }
    //         }
    //     }
    // });