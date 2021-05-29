

UI component for chatting.

Technologies stack:
React.js + javascript + bootstrap + html + css + axios


I’ve chosen React.js while I’m familiar with it, I’ve been working with it daily in current company. 
Connection with backend service is over Stomp+SockJS (receiving new messages) and messages are sent via HTTP (axios). I used axios while it formats response for us, the response is returned as : json, so we can handle the logic lately in easier manner.

Initially, I started this app development ambitiously so we can see many utility functions, I mean “layers” in code. Than I realized I have no enough time for that..

If I had more time I would definitelly manage memory differently: now only state values are passes between component. We use redux store in company I’m working at and it is great. It is centralizing state into global, single, store. But, I didn’t have enough time for that. So that’s the reason why you see state values from one component can be found in another, too. (Luckily, these components only show state from parent component, and not change it:)) )

Also, I don't like the way css is used in code.
I'm sure there are a lot libraries which wraps your code, so css for components will be more readable.
Anyway, bootstrap here at least gave it responsible design.

________________________________________________________


Please checkout project from git: Github  https://github.com/natalija94/chat-ui-private. Please find two files docker-compose.yml + Dockerfile. 
Please run the command docker-compose up - in order to start the service.
Frontend and backend communicate through network : chatting-rs.
