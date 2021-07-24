import Head from "next/head";
import Footer from "@components/Footer";
import Nav from "@components/Nav";
import About from "@components/About";
import Gallery from "@components/Gallery";
import styled from "styled-components";
import groq from "groq";
import client from "../client";
import { Breakpoints } from "@styles/styles";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;
const MainContent = styled.main({
  margin: "0 auto",
  [Breakpoints.BigScreenOrLarger]: {
    width: "80%",
  },
});
export default function Home(props) {
  return (
    <>
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <MainContent>
        {/* <About props={props} />  */}
        <Gallery images={props.images} />
      </MainContent>
      <Footer />
    </>
  );
}

// const query = groq`*[_type=="author"][0]{
//   name,
//   mail,
//   image,
//   github,
//   linkedin,
//   bio
// }`;

const query = groq`*[_type=="gallery" && title == "Featured"][0]{
  title,
  images
  }`;
Home.getInitialProps = async function (context) {
  const { title = "" } = context.query;
  return await client.fetch(query, { title });
};
