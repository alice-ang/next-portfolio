import groq from "groq";
import client from "../client";
import styled from "styled-components";
import Link from "next/link";
import Img from "next/image";
import { Breakpoints } from "@styles/styles";
import { useNextSanityImage } from "next-sanity-image";

const Container = styled.div({
  display: "grid",
  gridAutoRows: "150px 150px",
  gridGap: "5px",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gridAutoFlow: "dense",
  [Breakpoints.LaptopOrLarger]: {
    width: "80%",
    margin: "20px auto",
    gridAutoRows: "300px 300px",
    gridGap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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

const Projects = (props) => {
  return (
    <>
      <Container>
        {Object.values(props).map((project) => {
          return (
            <Project key={project.title}>
              <Text>
                <Link
                  href={`/project/${encodeURIComponent(project.slug.current)}`}
                >
                  <h1>{project.title}</h1>
                </Link>
                {/* {project.categories && (
                  <ul>
                    {project.categories.map((category) => (
                      <li key={category}>{category}</li>
                    ))}
                  </ul>
                )} */}
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
    </>
  );
};

const query = groq`*[_type == "project"]{
  title,
  slug,
  "categories": categories[]->title,
  mainImage
}`;

Projects.getInitialProps = async function (context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { title = "" } = context.query;
  return await client.fetch(query, { title });
};

export default Projects;
