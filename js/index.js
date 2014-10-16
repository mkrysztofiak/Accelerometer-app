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
        this.sendSMS();
        alert('on device ready');
    },
    startWatch: function () {
        var options = {frequency: 100};
        this.watchID = navigator.accelerometer.watchAcceleration(this.onSuccess, this.onError, options);
    },
    stopWatch: function () {
        if (this.watchID) {
            navigator.accelerometer.clearWatch(this.watchID);
            this.watchID = null;
            $('#accelerometer').html('Stopped');
        }
    },
    onSuccess: function (acceleration) {
        setInterval(function () {
            var contWidth = parseInt($('#ballContainer').width());
            var newBallLeft = parseInt($('#ball').css('left')) + acceleration.y;
            if (newBallLeft < contWidth && newBallLeft > 0) {
                console.log(newBallLeft);
                $('#ball').animate({
                    left: newBallLeft
                }, 100);
            }
        }, 100);
//        $('#accelerometer').html(
//                'Acceleration X: ' + acceleration.x + '<br />' +
//                'Acceleration Y: ' + acceleration.y + '<br />' +
//                'Acceleration Z: ' + acceleration.z + '<br />' +
//                'Timestamp: ' + acceleration.timestamp + '<br />'
//                );
    },
    onError: function () {
        alert('onError!');
    },
    sendSMS: function () {
        alert('send SMS');
        $("#btnDefaultSMS").click(function () {
            alert('btn clicked');
            var number = $("#numberTxt").val();
            var message = $("#messageTxt").val();
            var intent = ""; //leave empty for sending sms using default intent
            var success = function () {
                alert('Message sent successfully');
            };
            var error = function (e) {
                alert('Message Failed:' + e);
            };
            sms.send(number, message, intent, success, error);
        });
    }
};