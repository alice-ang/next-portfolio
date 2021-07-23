import BlockContent from "@sanity/block-content-to-react";
import client from "../client";
import styled from "styled-components";
import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1em",
});

const ImageContainer = styled.div({
  position: "relative",
  height: 200,
  width: 200,
  marginBottom: 10,
  img: {
    borderRadius: "50%",
  },
});

export default function About({ props }) {
  return (
    <Container>
      <ImageContainer>
        <Img
          src={useNextSanityImage(client, props.image)}
          alt={props.slug}
          layout="fill"
          objectFit="cover"
        />
      </ImageContainer>
      <BlockContent
        blocks={props.bio}
        projectId={client.projectId}
        dataset={client.dataset}
      />
    </Container>
  );
}
