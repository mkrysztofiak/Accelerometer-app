var application = {
    watchID: null,
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },
    onDeviceReady: function () {
        this.sendSMS();
        this.startWatch();
    },
    startWatch: function () {
        var options = {frequency: 250};
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
            var newBallLeft = parseInt($('#ball').css('left')) + (acceleration.y * 50);
            if (newBallLeft < contWidth && newBallLeft > 0) {
                $('#ball').animate({
                    left: newBallLeft
                }, 200);
            }
        }, 250);
        $('#accelerometer').html(
//                'Acceleration X: ' + acceleration.x + '<br />' +
                'Acceleration Y: ' + acceleration.y// + '<br />' +
//                'Acceleration Z: ' + acceleration.z + '<br />' +
//                'Timestamp: ' + acceleration.timestamp + '<br />'
                );
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