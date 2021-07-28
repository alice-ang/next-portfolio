import BlockContent from "@sanity/block-content-to-react";
import client from "../client";
import styled from "styled-components";
import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";
import BlockButton from "./buttons/BlockButton";
import { Breakpoints } from "@styles/styles";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1em",
  h2: {
    marginBottom: "0.5em",
  },
  h4: {
    margin: 0,
  },
  [Breakpoints.BigScreenOrLarger]: {
    maxWidth: "500px",
    margin: "0 auto",
  },
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

const Buttons = styled.div({
  width: "100%",
  marginTop: 10,
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

      <h2>{props.name}</h2>
      <h4>{props.location}</h4>
      {/* <BlockContent
        blocks={props.bio}
        projectId={client.projectId}
        dataset={client.dataset}
      /> */}
      <Buttons>
        <BlockButton
          title="Linkedin"
          link={props.linkedin}
          target="_blank"
          isLight
        />
        <BlockButton title="Message" link={`mailto:${props.mail}`} />
      </Buttons>
    </Container>
  );
}
