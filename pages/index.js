import Head from "next/head";
import Footer from "@components/Footer";
import Nav from "@components/Nav";
import About from "@components/About";
import styled from "styled-components";
import groq from "groq";
import client from "../client";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Nav />
        <About props={props} />
      </main>
      <Footer />
    </>
  );
}

const query = groq`*[_type=="author"][0]{
  name,
  mail,
  image,
  github,
  linkedin,
  bio
}`;

Home.getInitialProps = async function (context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.query;
  return await client.fetch(query, { slug });
};
