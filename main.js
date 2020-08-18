window.onload = function(){

var csv_data  = '/link.csv'
    var object = {};
    var  arr = [];
    window.array = arr;

    fetch(csv_data).then((res)=>res.text())
        .then((data)=>{
            //change breack and space
            var newString = data.replace(/(?:\r\n|\r|\n)/g, ";");
            //create row -> array
            var csv_array = newString.split(';')
            for(var i=0; i<csv_array.length; i++){
                arr.push({tabNum:csv_array[i], link:csv_array[i+1] } );
                i=i+1
            }

        })
        .catch((err) => console.log(err));
}

var qrcode = new QRCode(document.getElementById('qrcode'));


function generatorQR() {
    // var data = qrdata.value;
    if (sendData()) {

        document.getElementById("er").innerText = '';
        qrcode.makeCode(sendData());
        document.querySelector('#qrcode').style.opacity = 1;
    }else {
        document.querySelector('#qrcode').style.opacity = 0;
        document.getElementById("er").innerText = 'Помилка при вводі номеру планшету';
    }

}

function sendData() {
    console.log('start')
    let data = window.array;

       //  "android.app.action.GET_PROVISIONING_MODE":"PROVISIONING_MODE_MANAGED_PROFILE",
       //  "android.app.extra.PROVISIONING_WIFI_SSID":"GLCS3",
       //  "android.app.extra.PROVISIONING_WIFI_PASSWORD":"Green-2009",
       //  "android.app.extra.PROVISIONING_WIFI_SECURITY_TYPE":"WPA",
       //  "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":"com.eset.endpoint/com.eset.commoncore.core.broadcast.AdminReceiver",
       //  "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":"AYjD0xIyufhmoNU0IJD4deQxjF0K1t6DV1wPjZPqZMw=",
       //  "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":"https://download.eset.com/com/eset/apps/business/ees/android/latest/ees.apk",
       //  //"android.app.extra.PROVISIONING_WIFI_PROXY_HOST":"192.168.1.1",
       // // "android.app.extra.PROVISIONING_WIFI_PROXY_PORT":"8087",

    //     "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":"https://download.eset.com/com/eset/apps/business/ees/android/latest/ees.apk",
    //     "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":"com.eset.endpoint/com.eset.commoncore.core.broadcast.AdminReceiver",
    //     "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":"AYjD0xIyufhmoNU0IJD4deQxjF0K1t6DV1wPjZPqZMw=",
    //     // "android.app.extra.PROVISIONING_LOCALE":"ru_RU",
    //     // "android.app.extra.PROVISIONING_TIME_ZONE":"Europe/Amsterdam",
    //     "android.net.wifi.PICK_WIFI_NETWORK":"",
    //     "android.app.extra.PROVISIONING_WIFI_SSID":"GLCS3",
    //     "android.app.extra.PROVISIONING_WIFI_SECURITY_TYPE":"WPA2",
    //     "android.app.extra.PROVISIONING_WIFI_PASSWORD":"Green-2009",
    //     "android.app.extra.PROVISIONING_SKIP_ENCRYPTION":"true",
    //     // "android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":"true",
    //     // "android.app.extra.PROVISIONING_SKIP_USER_CONSENT":"true",
    //     "android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{   "enrollment_link":""   }
    // }
    let urlstring = {
        "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://support.mobileiron.com/cloud-android/current/MobileIron-Go-latest.apk",
            "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":    "com.mobileiron.anyware.android/com.mobileiron.polaris.manager.device.AndroidDeviceAdminReceiver",
        "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":    "H2IxQHNSEQDujQ7aEQUzvl43Ngik_w9AGHExJhhWELE",
        "android.app.extra.PROVISIONING_LOCALE":    "en_US",
        "android.app.extra.PROVISIONING_TIME_ZONE":    "Europe/Amsterdam",
        "android.app.extra.PROVISIONING_WIFI_SSID":    "MY_SSID",
        "android.app.extra.PROVISIONING_WIFI_SECURITY_TYPE":    "WPA",
        "android.app.extra.PROVISIONING_WIFI_PASSWORD":    "MY_WPA_KEY",
        "android.app.extra.PROVISIONING_SKIP_ENCRYPTION":    "true",
        "android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":    "true",
        "android.app.extra.PROVISIONING_SKIP_USER_CONSENT":    "true",
        "android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":    {
            "server"    :        "na2.mobileiron.com",
            "user"    :        "myUser",
            "quickStart"    :        false,
            "qrCode"  :    true,
            "enrollment_link":""
    }

}

    let tabNumber = document.getElementById("qr-data")
    console.log(tabNumber.value)
        for (let i = 0; i < data.length; i++) {

            if(tabNumber.value == data[i].tabNum){
                urlstring["android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE"].enrollment_link = data[i].link
                // console.log(JSON.stringify(urlstring))
                return JSON.stringify(urlstring);
            }


        }
    return false



}  