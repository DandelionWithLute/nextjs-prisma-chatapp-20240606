chatapp
create uuid room and store it into the database\

errors met:
1.schema.prisma not updated[done]
2.ORM id unregularly increases

to be done later:
1.password.js userInputToGet in bcrypt
2.add zod
https://zod.dev/?id=schema-methods
https://authjs.dev/getting-started/authentication/credentials
3.I should delete ./utils/password.js and just leave it to the callback.
4.Register page and Login page
5.Api Routes Should Protect Itself From Unauthenticated requests.
6.To Build Private Chat App I Must Make Rooms Hidden From Others.
7.I'll just give client all data and let it do it's own filter works.
Nextjs will cache the data for me anyway!
8.User-API-Database fetch Data logic, only fetch data of my own and groups I joined.
Sequence=>use email to find Dialogues I own => use email to find Dialogues I'm in
9.Add Dialogue Members Model
10.Building Headers
https://www.freepik.com/search?format=search&query=talking%20
11./explore/post & /api/explore & /explore
12.You should only get a few posts on /explore but not getting all from database.
on /explore & /api/explore
13.Having considered the username should link to the user's main page,
I'm going to get multiple queries.
14.Account Info Page July 21 2024
https://authjs.dev/guides/pages/signin
15.Change User Avatar one day
File and FileReader https://javascript.info/file
16./dialogue/[id]/page.jsx may add swr mutate below & may need to protect routes
17.If I need multiple members chatting under gpt, I always need to get from the api.
18.New Chat Page Design: When the params.id was equal to new under subpage
client side:post to api normally / api side:if it was new, create a new dialogue and then new dialoguedata instead of posting dialoguedata into the normal uuid.
19.How to solve the /dialogue/new post fetch problem of losing callbacks?
A. Add extra identification data for tracking in the database.
B. Get Specific data from the database.
C. Get title as information then get the latest one of the same titles.
Tips:In google gemini there's a refresh on the browser side.
My Answer:got to subpage, server fetch, redirect
Or you may refresh? And get the latest one? How to do that? (Could be the simplest one.)
20.Start a new folder under app or not?
Not: add an extra msg in fetch
Server side rendering is a must through api and with client you need swr.
An extra dialogue mode doesn't need to be stored into database, it only needs to go to api.
AI mode: checkbox => Dialogue (no, just reverse this order with checkbox) => combobox(discarded) => Toast
21.Add resizable to the main page.
22.May add bearer token from flowise under/dialogue/[id]/pageServerFetch.jsxd
23.I found it hard to combine client components and server components.
https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#supported-pattern-passing-server-components-to-client-components-as-props


Next Request
urlList: [ URL {} ],
    url: URL {
      href: 'http://localhost:3000/api/dialogue/71d50db5-0e9b-4e3c-ba2b-41356154ce54?id=myRoomId&name=myRoomName',       
      origin: 'http://localhost:3000',
      protocol: 'http:',
      username: '',
      password: '',
      host: 'localhost:3000',
      hostname: 'localhost',
      port: '3000',
      pathname: '/api/dialogue/71d50db5-0e9b-4e3c-ba2b-41356154ce54',
      search: '?id=myRoomId&name=myRoomName',
      searchParams: URLSearchParams { 'id' => 'myRoomId', 'name' => 'myRoomName' },
      hash: ''
    }


I've been here. June 11th 2024
I've been here. June 12th 2024
https://console.cloud.tencent.com/cos
https://cloud.tencent.com/document/product/460/6962
https://cloud.tencent.com/document/product/460/90276
0 to 1
yeah...
busy with davinci 19 demo
end of term media homework
trying to find leverages