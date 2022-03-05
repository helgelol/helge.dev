<script lang="ts">
  import Logo from './Logo.svelte';
  import Person from './Person.svelte';
  import Links from './Links.svelte';
  import ContactForm from './ContactForm.svelte';

  import { fade } from 'svelte/transition';
</script>

<div in:fade={{ delay: 500 }}>
  <Logo />
  <Person />
  <Links />
  <ContactForm />
</div>
