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
    width: "70%",
    margin: "20px auto",
    gridAutoRows: "200px 200px",
    gridGap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  },
});
const Project = styled.div({
  height: "100%",
  width: "100%",
  position: "relative",
  h1: {
    fontSize: "1.2rem",
  },
  overflow: "auto",
  background: "red",
  [Breakpoints.LaptopOrLarger]: {},
  ul: {
    padding: 0,
    margin: 0,
    li: {
      display: "inline-block",
    },
  },
});

const Text = styled.div({
  opacity: 1,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
  zIndex: 4,
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
                <Img
                  src={useNextSanityImage(client, project.mainImage)}
                  layout="responsive"
                  sizes="(max-width: 800px) 100vw, 800px"
                />

                {project.categories && (
                  <ul>
                    {project.categories.map((category) => (
                      <li key={category}>{category}</li>
                    ))}
                  </ul>
                )}
              </Text>
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
