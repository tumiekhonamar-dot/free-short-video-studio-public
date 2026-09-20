
export default function PrivacyPolicy() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px", lineHeight: 1.7 }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toISOString().slice(0, 10)}</p>

      <p>
        FreeShortVideoStudio ("we", "our", or "the service") respects your privacy.
        This page explains what information we collect and how we use it.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We do not require account registration. When you use our AI video
        generation tool, your text prompts are sent to our AI provider to
        generate video content. We do not permanently store your prompts or
        generated videos on our servers beyond what is necessary to process
        your request.
      </p>

      <h2>Cookies and Advertising</h2>
      <p>
        This site may display advertisements served by third-party vendors,
        including Google. Google's use of advertising cookies enables it and
        its partners to serve ads based on your visit to this site and/or
        other sites on the Internet. You may opt out of personalized
        advertising by visiting{" "}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">
          Google Ads Settings
        </a>.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We use third-party AI services to generate video content from your
        text prompts. These providers may process the data you submit
        according to their own privacy policies.
      </p>

      <h2>Data Retention</h2>
      <p>
        We limit usage per visitor to prevent abuse. This limit is tracked
        using your IP address and is not linked to any personal profile.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this privacy policy, please contact us
        through our GitHub repository.
      </p>
    </main>
  );
}
