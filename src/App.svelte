<script>
  import FrontPage from './components/FrontPage.svelte';
</script>

<svelte:head>
  <title>KUBES</title>
  <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png" />
  <link rel="manifest" href="./site.webmanifest" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Nunito:ital@1&display=swap"
    rel="stylesheet"
  />
  <script src="https://kit.fontawesome.com/929d0d8056.js" crossorigin="anonymous">
  </script>
</svelte:head>
<main>
  <FrontPage />
  <form name="contactForm" netlify netlify-honeypot="bot-field" hidden>
    <input type="email" name="contactEmail" />
    <input type="text" name="contactText" />
    <button type="submit" name="button">Send</button>
  </form>
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    overflow: hidden;
    width: 100%;
    height: 100vh;
    color: #fff;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    position: relative;
    animation: change 20s ease-in-out infinite;
    font-family: 'Nunito', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  @keyframes change {
    0% {
      background-position: 0% 0%;
    }
    10% {
      background-position: 0% 50%;
    }
    20% {
      background-position: 0% 100%;
    }
    30% {
      background-position: 50% 100%;
    }
    40% {
      background-position: 100% 100%;
    }
    50% {
      background-position: 100% 50%;
    }
    60% {
      background-position: 100% 0%;
    }
    70% {
      background-position: 50% 0%;
    }
    80% {
      background-position: 0% 0%;
    }
  }
</style>
