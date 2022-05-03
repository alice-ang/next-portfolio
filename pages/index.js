import Head from "next/head";
import About from "@components/About";
import Gallery from "@components/Gallery";
import styled from "styled-components";
import groq from "groq";
import client from "../client";

const MainContent = styled.main({
  margin: "0 auto",
});
export default function Home({ props }) {
  const { galleryData, aboutData } = props.data;
  return (
    <>
      <Head>
        <title>Alice Anglesjö | Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Bodoni:wght@600&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MainContent>
        <About props={aboutData} />
        <Gallery
          heading="Sneak peak 👀 "
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
