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

        var _Events = Events;

        _createDecoratedClass(_Events, [{
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
        }, {
          key: 'activeFilter',
          get: function () {
            return 'Active filter: ' + this.filterText;
          }
        }, {
          key: 'filteredLogEvents',
          decorators: [computedFrom(['filterText', 'logEvents'])],
          get: function () {
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

        Events = inject(CssAnimator)(Events) || Events;
        return Events;
      })();

      _export('Events', Events);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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