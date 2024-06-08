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
7.Private session check(not done for private) dialogue/[...id]/route.js
8.No cache could be used in fetch to prevent infinite looping.[wrong reason]
return new NextResponse(JSON.stringify(getUserFromSession[0], { status: 200 }));
True Reason:NextResponse can't have [] which will result in the infinite loop.