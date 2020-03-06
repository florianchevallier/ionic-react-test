import { UrbanAirShip } from '@ionic-native/urbanairship';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;

async function registerNotification() {
  try {
    await UrbanAirShip.takeOff({
      development: {
        appKey: "xxxxxxx",
        appSecret: "xxxxxxxxx"
      },
      production: {
        appKey: "",
        appSecret: ""
      }
    })
    await UrbanAirShip.setUserNotificationsEnabled(true)

    PushNotifications.addListener('registration', 
      (token: PushNotificationToken) => {
        console.log('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', 
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', 
      (notification: PushNotification) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', 
      (notification: PushNotificationActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );

  } catch (err) {
    console.log(err);
  }
}

export default registerNotification;
