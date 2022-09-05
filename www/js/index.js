/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready


function save_device_token(token) {
    var user_id = '1'
    var url_webservice = 'http://192.168.68.111:8002/infra_webservice';
    // var llave_app = "Ll4v3*!4pp1Nfr4.#";

    console.log("User id: ", user_id);
    $.ajax({
        type: "POST",
        url: url_webservice + "/op_in.php",
        data: {
            // llave_app: llave_app,
            op: "save_device_token",
            user_id: user_id,
            token: token
        },
        dataType: "json",
        success: function (response) {
            console.log(response)
            if (response.status) {
                localStorage.SetItem('Success token_device', token)
            }
        },
        error: function(request, status, error) {
            console.log("request: ", request)
            console.log("status: ", status)
            console.log("error: ", error)
        }
    })
}

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    var count = 1;
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    FirebasePlugin.getToken(function (fcmToken) {
        console.log(fcmToken);
        save_device_token(fcmToken)
    }, function (error) {
        console.error(error);
    });

    FirebasePlugin.onMessageReceived(function (message) {
        console.log("Message type: " + message.messageType);
        if (message.messageType === "notification") {
            console.log("Notification message received");
            if (message.tap) {
                console.log("Tapped in " + message.tap);
            }
        }

    }, function (error) {
        console.error(error);
    });

}

