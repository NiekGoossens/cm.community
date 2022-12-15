using Microsoft.AspNetCore.SignalR;

namespace CmApi.Hubs
{
    public class FeedHub : Hub
    {
        public async Task askServer(string someTextFromClient)
        {
            string tempString;

            if (someTextFromClient == "hey")
            {
                tempString = "message was 'hey'";
            }
            else
            {
                tempString = "message was something else";
            }

            await Clients.Client(this.Context.ConnectionId).SendAsync("askServerResponse", tempString);
        }
        
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}