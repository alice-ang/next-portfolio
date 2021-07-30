import Head from "next/head";
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
});
export default function Home({ props }) {
  const { galleryData, aboutData } = props.data;
  return (
    <>
      <Head>
        <title>Alice Anglesjö</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContent>
        <About props={aboutData} />
        <Gallery
          images={galleryData.images}
          title="All projects"
          link={galleryData.buttonLink}
        />
      </MainContent>
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
  images,
  buttonLink
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
