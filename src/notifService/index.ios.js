import {PushNotificationIOS} from 'react-native';

export default class NotifService {
    localNotif(title, message) {
        PushNotificationIOS.presentLocalNotification({
            alertBody: message || '',
            alertAction: 'alertAction',
            alertTitle: title || '',
            soundName: 'soundName',
            category: 'category',
        });
    }
}
