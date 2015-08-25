System.register(['aurelia-framework', 'aurelia-animator-css', 'jquery', 'ms-signalr-client'], function (_export) {
  'use strict';

  var inject, computedFrom, CssAnimator, $, Events;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_aureliaAnimatorCss) {
      CssAnimator = _aureliaAnimatorCss.CssAnimator;
    }, function (_jquery) {
      $ = _jquery['default'];
    }, function (_msSignalrClient) {}],
    execute: function () {
      Events = (function () {
        _createDecoratedClass(Events, [{
          key: 'activeFilter',
          get: function get() {
            return 'Active filter: ' + this.filterText;
          }
        }, {
          key: 'filteredLogEvents',
          decorators: [computedFrom(['filterText', 'logEvents'])],
          get: function get() {
            if (this.filterText === '' || this.filterText === '*') {
              if (this.logEvents.length > 10) {
                return this.logEvents.slice(-10);
              } else {
                return this.logEvents;
              }
            } else {
              var filter = this.filterText;
              var result = this.logEvents.filter(function (item) {
                return item.desc.toLowerCase().includes(filter);
              });
              console.log(result);
              return result;
            }
          }
        }]);

        function Events(animator) {
          _classCallCheck(this, _Events);

          this.heading = 'Log Viewer';
          this.filterText = '';
          this.lastUpdate = 'test';
          this.hubConnected = false;
          this.logEvents = [{ datetime: '2015-04-15 12:14:33.3', desc: 'User logged in', id: '49' }, { datetime: '2015-04-15 12:15:54.2', desc: 'User logged out', id: '50' }, { datetime: '2015-04-15 13:15:34.1', desc: 'Bacon found', id: '51' }, { datetime: '2015-04-16 13:18:32.8', desc: 'Hounds released', id: '52' }, { datetime: '2015-04-16 12:14:33.3', desc: 'User exploded', id: '53' }, { datetime: '2015-04-16 12:15:54.2', desc: 'User died', id: '54' }, { datetime: '2015-04-16 13:15:34.1', desc: 'User forcibly disconnected (reason: poor fashion sense)', id: '55' }, { datetime: '2015-04-16 13:18:32.8', desc: 'Exception somewhere, in something, for some reason', id: '56' }];
          this.logEvents = [];

          this.animator = animator;
        }

        _createDecoratedClass(Events, [{
          key: 'activate',
          value: function activate() {
            var signalrAddress = 'http://localhost:36823';
            var hubName = 'LogHub';

            var connection = $.hubConnection(signalrAddress);
            var eventHubProxy = connection.createHubProxy(hubName);
            var vm = this;
            eventHubProxy.on('broadcastMessage', function (message) {

              vm.lastUpdate = message.datetime;
              console.log('last update ' + vm.lastUpdate);

              vm.logEvents.push(message);

              vm.animator.removeClass(vm.elGridCount, 'au-attention').then(vm.animator.addClass(vm.elGridCount, 'au-attention'));
            });
            connection.start({ jsonp: true }).done(function () {
              console.log('Now connected, connection ID=' + connection.id);
              vm.hubConnected = true;
            }).fail(function () {
              console.log('Could not connect');
              vm.hubConnected = false;
            });
          }
        }]);

        var _Events = Events;
        Events = inject(CssAnimator)(Events) || Events;
        return Events;
      })();

      _export('Events', Events);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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