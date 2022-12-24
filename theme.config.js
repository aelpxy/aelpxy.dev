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
      <a href="https://twitter.com/aelpxy" rel="noreferrer noopener" target="_blank">
        Twitter
      </a>
      ·{" "}
      <a href="https://github.com/aelpxy" rel="noreferrer noopener" target="_blank">
        GitHub
      </a>
      ·{" "}
      <a href="https://www.patreon.com/aelpxy" rel="noreferrer noopener" target="_blank">
        Patreon
      </a>
      ·{" "}
      <a href="https://reddit.com/u/aelpxy" rel="noreferrer noopener" target="_blank">
        Reddit
      </a>
      ·{" "}
      <a href="mailto:hello@aelpxy.space" rel="noreferrer noopener" target="_blank">
        hello@aelpxy.space
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
