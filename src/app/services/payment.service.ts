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
  location
  constructor(private stripe: Stripe, private afs: AngularFirestore, private userSvc: UserService, private paypal: PayPal) { }

  paypalPay(amount: string, desc: string, currency: string, ID: string) {

    this.prodID = ID

    this.paypal.init({
      PayPalEnvironmentProduction: 'AaTRJ46xz16heiPZ6tk0Up75jJu1S13ztVkCGe7qJg8daXw_CxqT1yG0PLXNq4RNKtonV0_qHc6rehKi',
      PayPalEnvironmentSandbox: 'AQXfuNp7iLqBWU8UX7WJJ1OjeST8vn26QRCkrhoZM_cB_fdF8oZKp-4MTnTO-FIxXS7hITZiR1cAITzy'
    }).then(() => {

      this.paypal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        acceptCreditCards: true,
        merchantName: "Buylligator",
        payPalShippingAddressOption: 1,
        rememberUser: true
      })).then(() => {
        let payment = new PayPalPayment(amount, currency, desc, 'sale')
        this.paypal.renderSinglePaymentUI(payment).then(() => {

          console.log('successfully paid')
          const ref = Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 16).toUpperCase()

          this.main = this.afs.doc(`users/${this.userSvc.getUID()}`)
          this.sub = this.main.valueChanges().subscribe(ev => {

            this.location = ev.locations

          })

          this.afs.doc(`QrCodes/${ref}`).set({
            buyerID: this.userSvc.getUID(),
            buyerLoc: this.location[0],
            date: new Date()
          })

          this.afs.doc(`products/${this.prodID}`).update({
            status: "paidout",
            qrCodeRef: ref,
            verificated: false
          })

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
