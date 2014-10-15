var application = {
    watchID: null,
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },
    onDeviceReady: function () {
        this.startWatch();
        console.log('device is ready');
    },
    startWatch: function () {
        var options = {frequency: 3000};
        watchID = navigator.accelerometer.watchAcceleration(this.onSuccess, this.onError, options);
    },
    stopWatch: function () {
        if (this.watchID) {
            navigator.accelerometer.clearWatch(this.watchID);
            this.watchID = null;
            $('#accelerometer').html('Stopped');
        }
    },
    onSuccess: function (acceleration) {
        $('#accelerometer').html(
                'Acceleration X: ' + acceleration.x + '<br />' +
                'Acceleration Y: ' + acceleration.y + '<br />' +
                'Acceleration Z: ' + acceleration.z + '<br />' +
                'Timestamp: ' + acceleration.timestamp + '<br />'
                );
    },
    onError: function () {
        alert('onError!');
    },
    sendSMS: function() {
        $("#btnDefaultSMS").click(function(){
            var number = $("#numberTxt").val();
            var message = $("#messageTxt").val();
            var intent = ""; //leave empty for sending sms using default intent
            var success = function () { alert('Message sent successfully'); };
            var error = function (e) { alert('Message Failed:' + e); };
            sms.send(number, message, intent, success, error);
        });
    }
};