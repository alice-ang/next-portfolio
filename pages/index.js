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
export default function Home({ props }) {
  const { galleryData, aboutData } = props.data;

  return (
    <>
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <MainContent>
        <About props={aboutData} />
        <Gallery images={galleryData.images} />
      </MainContent>
      <Footer />
    </>
  );
}

const authorQuery = groq`*\[_type=="author"][0]{
  name,
  mail,
  image,
  github,
  linkedin,
  bio,
  location
}`;

const galleryQuery = groq`*\[_type=="gallery" && title == "Featured"][0]{
  title,
  images
  }`;

Home.getInitialProps = async function () {
  const aboutData = await client.fetch(authorQuery);
  const galleryData = await client.fetch(galleryQuery);
  const data = { galleryData, aboutData };
  return {
    props: {
      data,
    },
    revalidate: 1,
  };
};
