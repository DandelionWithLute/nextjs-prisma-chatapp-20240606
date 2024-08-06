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
7.Difference between "margin-left", and "left" (or "margin-right", and "right")
https://stackoverflow.com/questions/3859801/difference-between-margin-left-and-left-or-margin-right-and-right
Gemini:
Margin-top is like adding spacers on top of the book to create distance from other books. The book itself stays put, but the overall height on the shelf increases.
Top is like physically picking up the book and placing it higher on the shelf. The book itself moves, but the space it originally occupied remains the same size.
Top only works for elements with a positioning value set (usually relative, absolute, or fixed).
onClick={await handleStartANewDialogue()} under pay attention to "await" under server mode (function expected but got object error)
onchange was only on client side and this is the client side  onChange={async (e) => {console.log(await e.target.value);myInputValue = await e.target.value;}}