<script>
  import ContactFormContent from './ContactFormContent.svelte';

  import { fade } from 'svelte/transition';

  export let isContactOpen = false;

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
      <div class="h-full w-full modal-wrapper">
        <div class="modal md:rounded-lg w-full md:w-2/4 h-screen md:h-1/2 mx-auto my-0 md:my-28">
          <div class="flex justify-end">
            <svg
              on:click={openContact}
              class="h-16 w-16 text-white cursor-pointer pb-2"
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
    </div>
  {/if}
</div>

<style>
  .modal {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: change 20s ease-in-out infinite;
    min-height: 26rem;
    /* position: relative; */
    padding: 1rem;
    /* margin: auto auto; */
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
  .modal-wrapper {
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    position: fixed;
  }
</style>
