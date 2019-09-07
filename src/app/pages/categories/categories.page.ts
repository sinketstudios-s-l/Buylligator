import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: categories[] = [
    {
      name: "Coches",
      icon: "car",
      mode: "ios",
      id: "cars"
    },
    {
      name: "Motos",
      icon: "car",
      mode: "ios",
      id: "bikes"
    },
    {
      name: "Motor y Accesorios",
      icon: "car",
      mode: "ios",
      id: "motor"
    },
    {
      name: "Bicicletas",
      icon: "bicycle",
      mode: "md",
      id: "bicycles"
    },
    {
      name: "Deportes y Ocio",
      icon: "football",
      mode: "ios",
      id: "sports"
    },
  ]

  id

  constructor(private afs: AngularFirestore, private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.id = this.navParams.get('id')
  }

  category(event){

    const catID = event.target.id

    this.afs.doc(`products/${this.id}`).update({
      category: catID
    }).then(() =>{
      this.modalCtrl.dismiss({
        
      })
    })

  }

}

interface categories {
  name:string,
  icon: string,
  id: string,
  mode: string
}