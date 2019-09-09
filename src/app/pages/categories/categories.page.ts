import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: categories[] = [
    {
      name: "Coches",
      icon: "car",
      id: "Coches",
      mode: "ios"
    },
    {
      name: "Motos, Bicicletas & Patinetes",
      icon: "bicycle",
      id: "Motos, Bicicletas & Patinetes",
      mode: "ios"
    },
    {
      name: "Consolas & Videojuegos",
      icon: "logo-game-controller-a",
      id: "Consolas & Videojuegos",
      mode: "ios"
    },
    {
      name: "Coleccionismo & Arte",
      icon: "easel",
      id: "Coleccionismo & Arte",
      mode: "ios"
    },
    {
      name: "Joyas",
      icon: "watch",
      id: "Joyas",
      mode: "md"
    },
    {
      name: "Moda & Accesorios",
      icon: "shirt",
      id: "Moda & Accesorios",
      mode: "md"
    },
    {
      name: "Inmobiliaria",
      icon: "home",
      id: "Inmobiliaria",
      mode: "md"
    },
    {
      name: "Libros & Música",
      icon: "bookmarks",
      id: "Libros & Música",
      mode: "md"
    },
    {
      name: "Viajes",
      icon: "airplane",
      id: "Viajes",
      mode: "ios"
    },
    {
      name: "Electrónica",
      icon: "desktop",
      id: "Electrónica",
      mode: "md"
    },
    {
      name: "Otros",
      icon: "globe",
      id: "Otros",
      mode: "ios"
    },
    {
      name: "+ 18",
      icon: "flame",
      id: "+ 18",
      mode: "md",
      color: "danger"
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
  color?: string
}