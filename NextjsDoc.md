https://nextjs.org/docs

[src]Image src can be external
[style]Image src="..." style={imageStyle} ;const imageStyle = {css files}
[middleware]return NextResponse.redirect(new URL('/home', request.url))
[Catch-all]For example, pages/shop/[...slug].js will match /shop/clothes, but also /shop/clothes/tops, /shop/clothes/tops/t-shirts, and so on.