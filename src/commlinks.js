(function() {
    window.Commlink = function (win) {

        if(typeof win === 'undefined')
        {
            win = window;
        }
        else if(typeof win.postMessage !== 'function')
        {
            console.error('Commlinks plugin: The first argument passed to the Commlink function must be a Window interface instance.')
            return;
        }

        this.window = win;

        /**
         * Send a message to the window object
         * @param message
         * @param data
         * @param target
         */
        this.send = function (message, data, target) {
            if(! target)
                target = '*';

            if(! data)
                data = {};

            data._message = message;
            this.window.postMessage(data, target);
        }
    }

    /**
     * The global Commlinks variable
     * @type {{events: {}, init: Commlinks.init, on: Commlinks.on, fireListeners: Commlinks.fireListeners}}
     */
    window.Commlinks = {

        /**
         * Store the message listeners
         * @param events
         */
        events: {},

        /**
         * Commlinks init
         */
        init: function(){
            let that = this;
            window.addEventListener('message', function (event) {
                that.fireListeners(event.data._message, event);
            });
        },

        /**
         * Register a listener for a message
         *
         * @param message
         * @param callback
         */
        on: function (message, callback) {
            if (typeof this.events[message] === 'undefined') {
                this.events[message] = [];
            }

            this.events[message].push(callback);
        },

        /**
         * Fire the message listener functions
         * @param message
         * @param event
         */
        fireListeners: function (message, event) {
            if (typeof this.events[message] !== 'undefined') {
                this.events[message].forEach(function (callback) {
                    callback(event.data, event);
                });
            }
        }
    };

    // Initialize the Commlinks plugin
    window.Commlinks.init();
})();