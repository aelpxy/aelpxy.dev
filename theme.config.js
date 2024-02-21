const YEAR = new Date().getFullYear();

export default {
  head: ({ meta }) => {
    return (
      <>
        <title>Aelpxy - {meta.title}</title>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="canonical" href="https://aelpxy.dev" />
        <meta name="author" content="Aelpxy" />
        <meta name="title" content={meta.title} />
        <meta property="description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:image"
          name="og:image"
          content="https://avatars.githubusercontent.com/u/84912564"
        />
        <meta property="og:url" content="https://aelpxy.dev" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@aelpxy" />
        <meta property="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:url" content="https://aelpxy.dev" />
      </>
    );
  },
  footer: (
    <div style={{ display: "flex", alignItems: "center", paddingTop: "50px" }}>
      <small style={{ marginRight: "0" }}>
        © <time>{YEAR}</time> Aelpxy
        <style jsx>{`
          a {
            margin-left: 1rem;
          }
        `}</style>
      </small>
      <a
        href="https://github.com/aelpxy"
        rel="noreferrer noopener"
        target="_blank"
        style={{ marginLeft: "auto" }}
      >
        github
      </a>
      <a
        href="https://x.com/aelpxy"
        rel="noreferrer noopener"
        target="_blank"
        style={{ marginLeft: "5px" }}
      >
        twitter
      </a>
      <a
        href="mailto:aelpxy@velta.dev"
        rel="noreferrer noopener"
        target="_blank"
        style={{ marginLeft: "5px" }}
      >
        email
      </a>
    </div>
  ),
  readMore: "Read More →",
  darkMode: true,
};
