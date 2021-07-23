import groq from "groq";
import client from "../../client";
import BlockContent from "@sanity/block-content-to-react";
import Tag from "@components/Tag";
import styled from "styled-components";

const Tags = styled.div({
  display: "flex",
  flexWrap: "wrap",
  padding: "10px 5px",
});

const Project = (props) => {
  const { title = "Missing title", categories, body } = props;
  return (
    <article>
      <h1>{title}</h1>
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
    </article>
  );
};

const query = groq`*[_type == "project" && slug.current == $slug][0]{
  title,
  "categories": categories[]->title,
  body
}`;

Project.getInitialProps = async function (context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.query;
  return await client.fetch(query, { slug });
};

export default Project;
