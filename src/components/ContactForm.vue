<template>
  <div>
    <form
      name="contactForm"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input name="contactFormInput" type="hidden" />
      <input type="email" name="contactEmail" placeholder="E-mail" />
      <br />
      <input type="text" name="contactText" placeholder="Message" />
      <br />
      <button type="submit" name="button">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactForm",
};
</script>

<style></style>
