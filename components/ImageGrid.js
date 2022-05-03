import { useState } from "react";
import client from "../client.js";
import { useNextSanityImage } from "next-sanity-image";

import styled from "styled-components";
import Img from "next/image";
import { Breakpoints } from "@styles/styles";

const MainImage = styled.div`
  grid-area: main;
  cursor: default;
`;
const ImageContainer = styled.div`
  display: grid;
  grid-gap: 0.3rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    "main main main"
    "main main main";
  cursor: pointer;
  ${Breakpoints.Large}: {
    grid-gap: 1rem;
  }
`;

export const ImageGrid = ({ images }) => {
  const [mainUrl, setMainUrl] = useState(images[0]);
  return (
    <ImageContainer>
      <MainImage>
        <Img
          src={mainUrl}
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
          alt="alt"
        />
      </MainImage>

      {images.map((image) => {
        return (
          <Img
            key={image}
            src={image}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            alt="alt"
            onClick={() => {
              setMainUrl(image);
            }}
          />
        );
      })}
    </ImageContainer>
  );
};
