<script>
  import Logo from './Logo.svelte';
  import Person from './Person.svelte';
  import Links from './Links.svelte';
  import ContactForm from './ContactForm.svelte';
  import Swetrix from 'swetrix';

  import { fade } from 'svelte/transition';

  Swetrix.trackViews();
</script>

<div in:fade={{ delay: 500 }}>
  <Logo />
  <Person />
  <Links />
  <ContactForm />
</div>
