using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AmazingServices
{
    /// <summary>
    /// Generates random log messages of type LogMessage
    /// </summary>
    public class RandomLogEventGenerator
    {

        // starting log Id
        private int idCount = 100;

        // Pool of possible app events
        // Events prefixed with "!" are error events
        public List<string> appEvents = new List<string>
           {
            "Submitted a complaint",
            "Bought a {0}",
            "Updated their password",
            "Exploded",
            "!Caused an exception (cause: {0})",
            "Viewed a list of {0}s",
            "Searched for a {0}",
            "Shared a Facebook link for a {0}",
            "Reviewed an item",
            "Likes turtles",
            "!Attempted a SQL injection"
           };

        // pool of possible product types for possible app events
        public List<string> productTypes = new List<string>
        {
            "cat",
            "banana",
            "milkshake"
        };

        // pool of possible user Ids for log events
        public List<string> userIds = new List<string> { "231", "452", "678", "351", "827" };

        private Random _rand;

        public RandomLogEventGenerator()
        {
            _rand = new Random();
        }

        // retrieve a random log event
        public LogMessage GetEvent()
        {
            var userId = userIds[_rand.Next(0, userIds.Count - 1)];
            var userAction = appEvents[_rand.Next(0, appEvents.Count - 1)];
            var productType = productTypes[_rand.Next(0, productTypes.Count-1)];

            var type = "message";
            if (userAction.StartsWith("!"))
            {
                type = "error";
                userAction = userAction.Substring(1);
            }

            var formattedUserAction = string.Format(userAction, productType);

            var message = new LogMessage
            {
                datetime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                desc = formattedUserAction,
                type = type,
                id = idCount.ToString()
            };

            idCount++;

            return message;
        }
    }
}