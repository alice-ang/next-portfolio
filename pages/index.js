import Head from "next/head";
import About from "@components/About";
import styled from "styled-components";
import groq from "groq";
import client from "../client";
import { Breakpoints } from "@styles/styles";
import { useNextSanityImage } from "next-sanity-image";
import Link from "next/link";
import Img from "next/image";

const MainContent = styled.main({
  margin: "0 auto",
});

const Container = styled.div({
  display: "grid",
  gridAutoRows: "150px 150px",
  gridGap: "5px",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gridAutoFlow: "dense",
  [Breakpoints.LaptopOrLarger]: {
    gridAutoRows: "300px 300px",
    gridGap: "10px",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  },
});
const Project = styled.div({
  height: "100%",
  width: "100%",
  position: "relative",
  color: "white",
  h1: {
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
    [Breakpoints.TabletOrSmaller]: {
      fontSize: "1.2rem",
    },
  },
  overflow: "auto",
  ul: {
    padding: 0,
    margin: 0,
    li: {
      display: "inline-block",
      padding: "0px 5px",
    },
  },
  img: {
    filter: "blur(2px)",
  },
});

const Text = styled.div({
  opacity: 1,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 4,
});

const Overlay = styled.div({
  position: "absolute",
  top: 0,
  width: "100%",
  height: "100%",
  left: 0,
  backgroundColor: "#000",
  opacity: 0.5,
  zIndex: 3,
  display: "block",
  [Breakpoints.LaptopOrLarger]: {
    position: "relative",
  },
});

export default function Home({ props }) {
  const { projectData, aboutData } = props.data;
  return (
    <>
      <Head>
        <title>Alice Anglesjö | Portfolio</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Bodoni:wght@600&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MainContent>
        <About props={aboutData} />
        {/* <Gallery
          heading="Sneak peak 👀 "
          images={galleryData.images}
          title="All projects"
          link={galleryData.buttonLink}
        /> */}
        <Container>
          {Object.values(projectData).map((project) => {
            return (
              <Project key={project.title}>
                <Text>
                  <Link
                    href={`/project/${encodeURIComponent(
                      project.slug.current
                    )}`}
                  >
                    <h1>{project.title}</h1>
                  </Link>
                </Text>
                <Img
                  src={useNextSanityImage(client, project.mainImage)}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                />
                <Overlay />
              </Project>
            );
          })}
        </Container>
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
const projectQuery = groq`*[_type == "project"]{
    title,
    slug,
    mainImage
  }`;

Home.getInitialProps = async function () {
  const aboutData = await client.fetch(authorQuery);
  const galleryData = await client.fetch(galleryQuery);
  const projectData = await client.fetch(projectQuery);
  const data = { galleryData, aboutData, projectData };
  return {
    props: {
      data,
    },
    revalidate: 1,
  };
};
