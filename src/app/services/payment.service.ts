import { Injectable, Query } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { PayPal, PayPalConfiguration, PayPalPayment } from '@ionic-native/paypal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  prodID
  main
  sub
  purchases
  constructor(private stripe: Stripe, private afs: AngularFirestore, private userSvc: UserService, private paypal: PayPal) { }

  paypalPay(amount: string, desc: string, ID: string, currency: string) {

    this.prodID = ID  

    this.paypal.init({
      PayPalEnvironmentProduction: 'AaTRJ46xz16heiPZ6tk0Up75jJu1S13ztVkCGe7qJg8daXw_CxqT1yG0PLXNq4RNKtonV0_qHc6rehKi',
      PayPalEnvironmentSandbox: 'AQXfuNp7iLqBWU8UX7WJJ1OjeST8vn26QRCkrhoZM_cB_fdF8oZKp-4MTnTO-FIxXS7hITZiR1cAITzy'
    }).then(() => {

      this.paypal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        acceptCreditCards: true,
        merchantName: "Buylligator",
        payPalShippingAddressOption: 3,
        rememberUser: true
      })).then(() => {
        let payment = new PayPalPayment(amount, currency, desc, 'sale')
        this.paypal.renderSinglePaymentUI(payment).then(() => {
          const ref = Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 16).toUpperCase()
          
          this.afs.doc(`QR-Codes/${ref}`).set({
            buyerName: name,
            buyerID: this.userSvc.getUID(),
          })

          this.afs.doc(`products/${this.prodID}`).update({
            status: "paidout",
            qrRef: ref
          })

          console.log('successfully paid')
        }, err => {
          console.log(err)
        })
      }, err => {
        console.log(err)
      })
    }, err => {
      console.log(err)
    })

  }

  // payment(number: string, expMonth: number, expYear: number, cvc: string) {

  //   this.stripe.setPublishableKey('pk_test_BmC7WET9Gf52ObXuGpgGJP3x00GBSOGhTY')

  //   let card = {
  //     number: number,
  //     expMonth: expMonth,
  //     expYear: expYear,
  //     cvc: cvc
  //   }

  //   this.stripe.createCardToken(card)
  //     .then(token => {
  //       const ref = Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 16).toUpperCase()

  //       this.afs.doc(`QR-Codes/${ref}`).set({
  //         tokenID: token.id,
  //         userID: this.userSvc.getUID()
  //       })

  //       console.log(token.id)
  //     })
  //     .catch(error => console.error(error));

  // }



}
