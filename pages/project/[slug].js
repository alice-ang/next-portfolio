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
import { ImageGrid } from "@components/ImageGrid";

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
    "&:hover": {
      transform: "scale(1.2)",
      transition: "0.2s",
      cursor: "pointer",
      color: ({ theme }) => theme.colors.accent,
    },
  },
});

const Grid = styled.div`
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
`;

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
    imagesGallery,
    githubUrl,
    demoUrl,
  } = props;

  return (
    <Container>
      {/* <ImageGrid images={imagesGallery} /> */}
      <Img
        src={useNextSanityImage(client, mainImage)}
        alt={title}
        layout="responsive"
        objectFit="contain"
      />
      {/* <Grid>
        {imagesGallery.map((image) => {
          return (
            <Img
              src={image}
              alt="alt"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          );
        })}
      </Grid> */}
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
  "imagesGallery": imagesGallery[].asset->url,
  demoUrl,
  githubUrl,
  body
}`;

Project.getInitialProps = async function (context) {
  const { slug = "" } = context.query;
  return await client.fetch(query, { slug });
};

export default Project;
