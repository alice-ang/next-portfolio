import groq from "groq";
import client from "../../client";
import BlockContent from "@sanity/block-content-to-react";
import Tag from "@components/Tag";
import styled from "styled-components";
import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaDesktop } from "@react-icons/all-files/fa/FaDesktop";
import Link from "next/link";

const Container = styled.div({
  padding: "1em",
  h3: {
    margin: 0,
  },
});

const IconContainer = styled.div({
  display: "flex",
  justifyContent: "space-around",
  padding: "1em 0",
  svg: {
    fontSize: "1.5em",
  },
});

const Tags = styled.div({
  display: "flex",
  flexWrap: "wrap",
  padding: "10px 5px",
});

const Project = (props) => {
  const {
    title = "Missing title",
    categories,
    body,
    mainImage,
    githubUrl,
    demoUrl,
  } = props;

  return (
    <Container>
      <Img
        src={useNextSanityImage(client, mainImage)}
        alt={title}
        layout="responsive"
        objectFit="contain"
      />
      <IconContainer>
        {githubUrl && (
          <Link href={githubUrl} target="_blank">
            <FaGithub />
          </Link>
        )}
        {demoUrl && (
          <Link href={demoUrl} target="_blank">
            <FaDesktop />
          </Link>
        )}
      </IconContainer>
      <h3>{title}</h3>
      <BlockContent
        blocks={body}
        projectId={client.projectId}
        dataset={client.dataset}
      />
      {categories && (
        <Tags>
          {categories.map((category) => (
            <Tag key={category}>{category}</Tag>
          ))}
        </Tags>
      )}
    </Container>
  );
};

const query = groq`*[_type == "project" && slug.current == $slug][0]{
  title,
  "categories": categories[]->title,
  mainImage,
  demoUrl,
  githubUrl,
  body
}`;

Project.getInitialProps = async function (context) {
  const { slug = "" } = context.query;
  return await client.fetch(query, { slug });
};

export default Project;
