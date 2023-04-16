const YEAR = new Date().getFullYear();

export default {
  head: ({ meta }) => {
    return (
      <>
        <meta name="author" content="Aelpxy" />
        <link rel="canonical" href="https://aelpxy.space" />
        <meta name="title" content={meta.title} />
        <meta property="description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content="https://aelpxy.space" />
        {/* <meta
          property="og:image"
          content={meta.image || "https://aelpxy.space/logo.png"}
        /> */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@aelpxy" />
        <meta property="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:url" content="https://aelpxy.space" />
        {/* <meta
          property="twitter:image"
          content={meta.image || "https://aelpxy.space/logo.png"}
        /> */}
      </>
    );
  },
  footer: (
    <div>
      <hr />
      <a href="https://github.com/aelpxy" rel="noreferrer noopener" target="_blank">
        GitHub
      </a>
      {" "}
      <a href="mailto:aelpxy@velta.dev" rel="noreferrer noopener" target="_blank">
        Email
      </a>
      {" "}
      <a href="https://patreon.com/aelpxy" rel="noreferrer noopener" target="_blank">
        Donate
      </a>
      <small style={{ display: "block", marginTop: "8rem" }}>
        <time>{YEAR}</time> © Aelpxy.
        <style jsx>{`
          a {
            float: right;
          }
        `}</style>
      </small>
    </div>
  ),
  readMore: "Read More →",
  darkMode: true,
};
