import { Component, NgZone } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ToastController } from "ionic-angular";
import { BLE } from "@ionic-native/ble";

@IonicPage()
@Component({
  selector: "page-device",
  templateUrl: "device.html"
})
export class DevicePage {
  peripheral: any = {};
  statusMessage: string;
  device: any;
  deviceName: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ble: BLE,
    private toastCtrl: ToastController,
    private ngZone: NgZone
  ) {
    this.device = navParams.get("device");
    this.deviceName = this.device.name;
    this.setStatus("Connecting to " + this.deviceName);

    // this.ble
    //   .connect(this.device.id)
    //   .subscribe(
    //     peripheral => this.onConnected(peripheral),
    //     peripheral => this.onDeviceDisconnected(peripheral)
    //   );
  }

  onConnected(peripheral) {
    this.ngZone.run(() => {
      this.setStatus("connected");
      this.peripheral = peripheral;
    });
  }

  onDeviceDisconnected(peripheral) {
    let toast = this.toastCtrl.create({
      message: "The peripheral unexpectedly disconnected",
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

  // Disconnect peripheral when leaving the page
  ionViewWillLeave() {
    console.log("ionViewWillLeave disconnecting Bluetooth");
    this.ble
      .disconnect(this.peripheral.id)
      .then(
        () => console.log("Disconnected " + JSON.stringify(this.peripheral)),
        () =>
          console.log("ERROR disconnecting " + JSON.stringify(this.peripheral))
      );
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }
}
