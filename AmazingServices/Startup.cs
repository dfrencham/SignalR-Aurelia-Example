using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.SignalR;

[assembly: OwinStartup(typeof(AmazingServices.Startup))]

namespace AmazingServices
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HubConfiguration();

            // need want this locally, so we can service requests
            // from local clients running on different ports
            config.EnableJSONP = true;  

            config.EnableDetailedErrors = true;
            app.MapSignalR(config);

            // send random log messages
            var rm = new RandomMessageBroadcaster();
        }
    }
}
