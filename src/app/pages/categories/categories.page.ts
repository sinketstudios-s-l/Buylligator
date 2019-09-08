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
      name: "Todas las Categorias",
      icon: "infinite",
      id: "all",
      mode: "ios"
    },
    {
      name: "Coches",
      icon: "car",
      id: "cars",
      mode: "ios"
    },
    {
      name: "Motos, Bicicletas & Patinetes",
      icon: "bicycle",
      id: "bikes",
      mode: "ios"
    },
    {
      name: "Consolas & Videojuegos",
      icon: "logo-game-controller-a",
      id: "gaming",
      mode: "ios"
    },
    {
      name: "Coleccionismo & Arte",
      icon: "easel",
      id: "art",
      mode: "ios"
    },
    {
      name: "Joyas",
      icon: "watch",
      id: "",
      mode: "md"
    },
    {
      name: "Moda & Accesorios",
      icon: "shirt",
      id: "moda",
      mode: "md"
    },
    {
      name: "Inmobiliaria",
      icon: "home",
      id: "home",
      mode: "md"
    },
    {
      name: "Libros & Música",
      icon: "bookmarks",
      id: "books",
      mode: "md"
    },
    {
      name: "Viajes",
      icon: "airplane",
      id: "travel",
      mode: "ios"
    },
    {
      name: "Electrónica",
      icon: "desktop",
      id: "pc",
      mode: "md"
    },
    {
      name: "Otros",
      icon: "globe",
      id: "others",
      mode: "ios"
    },
    {
      name: "+ 18",
      icon: "flame",
      id: "nfsw",
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