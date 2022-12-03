// import { SessionProvider } from "next-auth/react";
// import { ChakraProvider, Grid } from "@chakra-ui/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return <Component {...pageProps} />;

  // return (
  //   <SessionProvider session={session}>
  //     <ChakraProvider>
  //       <Grid
  //         sx={{
  //           h: "100vh",
  //           px: "5rem",
  //           placeItems: "center",
  //           textAlign: "center",
  //         }}
  //       >
  //         <Component {...pageProps} />
  //       </Grid>
  //     </ChakraProvider>
  //   </SessionProvider>
  // );
}

export default MyApp;
