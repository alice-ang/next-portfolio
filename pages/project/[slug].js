import groq from "groq";
import client from "../../client";
import styled from "styled-components";

const Project = (props) => {
  const { title = "Missing title", categories } = props;
  return (
    <article>
      <h1>{title}</h1>
      {categories && (
        <ul>
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}
    </article>
  );
};

const query = groq`*[_type == "project" && slug.current == $slug][0]{
  title,
  "categories": categories[]->title
}`;

Project.getInitialProps = async function (context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.query;
  return await client.fetch(query, { slug });
};

export default Project;
