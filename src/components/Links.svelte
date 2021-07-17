<script>
  import { svg_element } from 'svelte/internal';
</script>

<div class="my-8 mx-auto">
  <a href="https://gitlab.com/helgejs" target="_blank">
    <i class="fab fa-gitlab text-4xl mx-6 gitlab" />
  </a>
  <a href="https://twitter.com/helgejs" target="_blank">
    <i class="fab fa-twitter text-4xl mx-6 twitter" /></a
  >
  <a href="https://www.linkedin.com/in/helgejs/" target="_blank">
    <i class="fab fa-linkedin-in text-4xl mx-6 linkedin" />
  </a>
</div>

<style>
  .gitlab {
    color: white;
  }
  .gitlab:hover {
    /* color: linear-gradient(90deg, #e24329 0%, #fc6d26 50%, #fca326 100%); */
    color: #fc6d26;
  }
  .twitter {
    color: white;
  }
  .twitter:hover {
    color: #1da1f2;
  }
  .linkedin {
    color: white;
  }
  .linkedin:hover {
    color: #0077b5;
  }
</style>
