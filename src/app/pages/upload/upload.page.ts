import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriesPage } from '../categories/categories.page';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.openCat()
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }

  async openCat(){

    const modal = await this.modalCtrl.create({
      component: CategoriesPage,
      cssClass: 'categoriesModal',
      showBackdrop: true
    })
    return await modal.present();

  }

}
