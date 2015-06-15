import {inject, computedFrom} from 'aurelia-framework';
import {CssAnimator} from 'aurelia-animator-css';
//import moment from 'moment';
import $ from 'jquery';
/*import 'jquery.signalr-2.2.0';*/
import 'ms-signalr-client';

@inject(CssAnimator)
export class Events{

  heading = 'Log Viewer';
  filterText = '';
  lastUpdate = 'test';
  hubConnected = false;

  logEvents = [
    { datetime: '2015-04-15 12:14:33.3', desc: 'User logged in', id: '49' },
    { datetime: '2015-04-15 12:15:54.2', desc: 'User logged out', id: '50' },
    { datetime: '2015-04-15 13:15:34.1', desc: 'Bacon found', id: '51' },
    { datetime: '2015-04-16 13:18:32.8', desc: 'Hounds released', id: '52' },
    { datetime: '2015-04-16 12:14:33.3', desc: 'User exploded', id: '53' },
    { datetime: '2015-04-16 12:15:54.2', desc: 'User died', id: '54' },
    { datetime: '2015-04-16 13:15:34.1', desc: 'User forcibly disconnected (reason: poor fashion sense)', id: '55' },
    { datetime: '2015-04-16 13:18:32.8', desc: 'Exception somewhere, in something, for some reason', id: '56' }
  ];

  logEvents = [];

  get activeFilter(){
    return `Active filter: ${this.filterText}`;
  }

  @computedFrom(['filterText','logEvents'])
  get filteredLogEvents() {
    if ((this.filterText === '') || (this.filterText === '*')) {
      if (this.logEvents.length > 10){
        return this.logEvents.slice(-10);
      }
      else
      {
        return this.logEvents
      }
    }
    else
    {
        var filter = this.filterText;
        var result = this.logEvents.filter(function(item) {
          return (item.desc.toLowerCase().includes(filter));
        });
        console.log(result);
        return result;
    }
  }

  constructor(animator) {
    this.animator = animator;
  }

  activate() {
    var signalrAddress = 'http://localhost:36823';
    var hubName = 'LogHub';
  
    var connection = $.hubConnection(signalrAddress);
    var eventHubProxy = connection.createHubProxy(hubName);
    var vm = this;
    eventHubProxy.on('broadcastMessage', function(message) {

        vm.lastUpdate = message.datetime;
        console.log('last update ' + vm.lastUpdate);

        vm.logEvents.push(message);
        /*if (vm.logEvents.length > 10)
        {
          vm.logEvents.shift();
        }*/

        vm.animator.removeClass(vm.elGridCount, 'au-attention').then(vm.animator.addClass(vm.elGridCount, 'au-attention'));
        //vm.animator.addClass(vm.elRow, 'an-bounce');
    });
    connection.start({ jsonp: true })
    .done(function(){ 
      console.log('Now connected, connection ID=' + connection.id); 
      vm.hubConnected = true;
     })
    .fail(function(){ 
      console.log('Could not connect'); 
      vm.hubConnected = false;
      });
  }
}
