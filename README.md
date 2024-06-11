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