import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
//import { HomePage } from "../pages/home/home";
//import { ListPage } from "../pages/list/list";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { ConnectPage } from "./../pages/connect/connect";
import { DevicePage } from "../pages/device/device";
import { BLE } from "@ionic-native/ble";

@NgModule({
  declarations: [MyApp, ConnectPage, DevicePage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ConnectPage, DevicePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BLE
  ]
})
export class AppModule {}
