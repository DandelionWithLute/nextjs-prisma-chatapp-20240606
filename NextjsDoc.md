https://nextjs.org/docs

[src]Image src can be external
[style]Image src="..." style={imageStyle} ;const imageStyle = {css files}
[middleware]return NextResponse.redirect(new URL('/home', request.url))
[Catch-all]For example, pages/shop/[...slug].js will match /shop/clothes, but also /shop/clothes/tops, /shop/clothes/tops/t-shirts, and so on.

[Common Knowledges]
1.Private session check(not done for private) dialogue/[...id]/route.js
2.No cache could be used in fetch to prevent infinite looping.[wrong reason]
return new NextResponse(JSON.stringify(getUserFromSession[0], { status: 200 }));
True Reason:NextResponse can't have [] which will result in the infinite loop.
3.Call use in your component to read the value of a resource like a Promise or context.
https://react.dev/reference/react/use
4.Why is my fetch request being called twice?
https://stackoverflow.com/questions/50029580/why-is-my-fetch-request-being-called-twice
5.const { searchParams } = new URL(req.url)(One hour wasted)
6.There's no need for dynimic api as dynamic routes need an exact position to fetch.(Two hour wasted)