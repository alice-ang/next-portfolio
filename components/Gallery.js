import styled from "styled-components";
import { Breakpoints } from "@styles/styles";
import Img from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import client from "../client";
import LinkButton from "./buttons/LinkButton";

const Container = styled.div({
  textAlign: "center",
});
const GalleryContainer = styled.div({
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

const Item = styled.div({
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
});

const CTA = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  textTransform: "uppercase",
});

export default function Gallery({ images, title, link }) {
  return (
    <Container>
      <GalleryContainer>
        {images.map((image, index) => {
          return (
            image.asset && (
              <Item key={index}>
                <Img
                  src={useNextSanityImage(client, image)}
                  alt="gallery"
                  layout="fill"
                  objectFit="cover"
                />
              </Item>
            )
          );
        })}
      </GalleryContainer>
      <CTA>
        <LinkButton title={title} isRight link={link} />
      </CTA>
    </Container>
  );
}
