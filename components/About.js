import BlockContent from "@sanity/block-content-to-react";
import client from "../client";
import styled from "styled-components";
import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";
import BlockButton from "./buttons/BlockButton";
import { Breakpoints } from "@styles/styles";
import { FaLinkedin, FaGithub } from "react-icons/fa";

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
  [Breakpoints.LaptopOrLarger]: {
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

const Text = styled.div({
  display: "none",
  [Breakpoints.LaptopOrLarger]: {
    display: "block",
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
      <h4>📍 {props.location}</h4>
      <Text>
        <BlockContent
          blocks={props.bio}
          projectId={client.projectId}
          dataset={client.dataset}
        />
      </Text>
      <Buttons>
        <BlockButton title="Github" link={props.github} target="_blank">
          <FaGithub />
        </BlockButton>
        {/* <BlockButton title="Message" link={`mailto:${props.mail}`}>
          <FaEnvelope />
        </BlockButton> */}
        <BlockButton
          title="Linkedin"
          link={props.linkedin}
          target="_blank"
          isLight
        >
          <FaLinkedin />
        </BlockButton>
      </Buttons>
    </Container>
  );
}
