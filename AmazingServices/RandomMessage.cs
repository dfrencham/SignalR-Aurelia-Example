using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Timers;
using Microsoft.AspNet.SignalR;
using System.Diagnostics;

namespace AmazingServices
{
    /// <summary>
    /// Broadcasts a random log message using a SignalR hub at a set interval
    /// </summary>
    public class RandomMessageBroadcaster
    {
        private IHubContext _logHub;
        private RandomLogEventGenerator _randomLogGenerator;
        private const int _broadcastMessageFrequency = 3000;

        public RandomMessageBroadcaster()
        {
            _logHub = GlobalHost.ConnectionManager.GetHubContext<LogHub>();
            _randomLogGenerator = new RandomLogEventGenerator();

            var timer = new Timer(_broadcastMessageFrequency);
            timer.Elapsed += new ElapsedEventHandler(OnTimedEvent);
            timer.Start();
        }

        private void OnTimedEvent(object sender, ElapsedEventArgs e)
        {
            var message = _randomLogGenerator.GetEvent();
            _logHub.Clients.All.broadcastMessage(message);
            Debug.Print("Sent Message: {0}  UID: {2}  [{1}]  {3}", message.datetime, message.type, message.id, message.desc);
        }
    }
}

