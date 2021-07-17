<script>
  import ContactFormContent from './ContactFormContent.svelte';

  import { fade } from 'svelte/transition';

  let isContactOpen = false;

  function openContact(event) {
    event.stopPropagation();
    isContactOpen = !isContactOpen;
    if (document.body.classList.contains('overflow-hidden')) {
      document.body.classList.remove('overflow-hidden');
    } else {
      document.body.classList.add('overflow-hidden');
    }
  }
</script>

<div>
  <div class="pt-2">
    <button class="button glass-effect text-gray-100" on:click={openContact}>
      <div>Contact</div>
    </button>
  </div>

  {#if isContactOpen}
    <div
      in:fade={{ delay: 100 }}
      out:fade={{ delay: 100 }}
      class="fixed inset-0 justify-center items-center overflow-x-hidden overflow-y-auto flex"
    >
      <!-- Blurry background goes here (h-full w-full bg-black) -->
      <div class="contact-bg p-8 rounded-lg h-full w-full">
        <div class="flex justify-end">
          <svg
            on:click={openContact}
            class="h-16 w-16 text-white cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <ContactFormContent />
      </div>
    </div>
  {/if}
</div>

<style>
  .contact-bg {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    position: relative;
    animation: change 20s ease-in-out infinite;
  }

  .glass-effect {
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3)
    );
  }

  .button {
    height: 4rem;
    width: 12rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 600;
    border-radius: 0.375rem;
  }
</style>
