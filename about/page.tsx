
export default function AboutPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px", lineHeight: 1.7 }}>
      <h1>About FreeShortVideoStudio</h1>

      <p>
        FreeShortVideoStudio is a free, browser-based AI video generation
        tool. It lets anyone describe an idea in a sentence or two, and our
        AI automatically splits that idea into multiple scenes, generates a
        short video clip for each scene, and stitches them together into a
        complete short video — entirely in your browser.
      </p>

      <h2>Why We Built This</h2>
      <p>
        Video generation AI is normally expensive and requires technical
        expertise. We wanted to make it accessible to everyone, at no cost,
        with no installation and no technical knowledge required.
      </p>

      <h2>How It Works</h2>
      <p>
        You type in your idea, choose how many scenes and what aspect ratio
        you want, and our system handles the rest — from scene writing to
        video generation to final stitching.
      </p>

      <h2>Fair Use</h2>
      <p>
        To keep this service free and available for everyone, we limit each
        visitor to a set number of video generations per day.
      </p>

      <h2>Contact</h2>
      <p>
        Questions, feedback, or bug reports are welcome via our GitHub
        repository.
      </p>
    </main>
  );
}
