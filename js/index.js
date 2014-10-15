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
    startWath: function () {
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
    }
};