// import withAuth from "next-auth/middleware";
// import { NextResponse } from "next/server";



// export default withAuth(
//   function middleware() {
//     console.log("Middleware running");
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token , req}) => {
//         console.log("Token: ", token);
//         const {pathname} = req.nextUrl;

//         if (
//           pathname.startsWith("/verifyemail") ||
//           pathname === "/login" ||
//           pathname === "/signup"
//         ) {
//           return true;
//         }


//         // public path
//         // if(
//         //   pathname === "/" ||
//         //   pathname.startsWith("/api/products") ||
//         //   pathname.startsWith("/products") 
//         // ){
//         //   return true;
//         // }

//         // Admin routes required admin role
//         // if(pathname.startsWith("/admin")){
//         //   return token?.role === "admin"
//         // }

//         // All other routes required authentication
//         return !!token
      
//       },
//     },
//   }
// )


// export const config = {
//   matcher: [
//     "/",
//     "/profile",
//     "/profile/:path*",
//     "/login",
//     "/signup",
//     "/verifyemail",
//     "/admin/:path*",
//   ],
// };








// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     const token = req.nextauth.token;
//     const { pathname } = req.nextUrl;

//     if (token && (pathname === "/login" || pathname === "/signup" || pathname === "/verifyemail" || pathname === "/")) {
//       if (token.role === "admin") return NextResponse.redirect(new URL("/admin", req.url));
//       if (token.role === "donor") return NextResponse.redirect(new URL("/donor", req.url));
//       if (token.role === "receiver") return NextResponse.redirect(new URL("/receiver", req.url));
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         const { pathname } = req.nextUrl;

//         // Allow public paths (No token required)
//         if (
//           pathname === "/" ||
//           pathname === "/about" ||
//           pathname === "/signup" ||
//           pathname === "/login" ||
//           pathname === "/verifyemail"
//         ) {
//           return true;
//         }

//         // Admin Protection
//         if (pathname.startsWith("/admin")) {
//           return token?.role === "admin";
//         }

//         // Donor Protection
//         if (pathname.startsWith("/donor")) {
//           return token?.role === "donor";
//         }

//         // Receiver Protection
//         if (pathname.startsWith("/receiver")) {
//           return token?.role === "receiver";
//         }

//         // All other dashboard routes (like /profile) just need a valid token
//         return !!token;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/",
//     "/about",
//     "/login",
//     "/signup",
//     "/verifyemail",
//     "/admin/:path*",
//     "/donor/:path*",
//     "/receiver/:path*",
//     "/profile/:path*",
//   ],
// };


// // (verify email page)



import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Redirect logged-in users away from Auth pages
    if (token && (pathname === "/login" || pathname === "/signup" || pathname === "/verifyemail" || pathname === "/")) {
      const url = req.nextUrl.clone();
      
      if (token.role === "admin") url.pathname = "/admin";
      else if (token.role === "donor") url.pathname = "/donor";
      else if (token.role === "receiver") url.pathname = "/receiver";
      else url.pathname = "/"; // Fallback

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Public paths
        const publicPaths = ["/", "/about", "/signup", "/login", "/verifyemail"];
        if (publicPaths.includes(pathname)) return true;

        // Protected paths based on roles
        if (pathname.startsWith("/admin")) return token?.role === "admin";
        if (pathname.startsWith("/donor")) return token?.role === "donor";
        if (pathname.startsWith("/receiver")) return token?.role === "receiver";

        return !!token;
      },
    },
    // CRITICAL: Explicitly pass the secret for Vercel production
    secret: process.env.NEXTAUTH_SECRET,
  }
);

export const config = {
  matcher: [
    "/",
    "/about",
    "/login",
    "/signup",
    "/verifyemail",
    "/admin/:path*",
    "/donor/:path*",
    "/receiver/:path*",
    "/profile/:path*",
  ],
};