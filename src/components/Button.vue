<template>
  <div>
    <div class="pt-2">
      <button class="button glass-effect text-gray-100" @click="openContact">
        <div class="">Contact</div>
      </button>
    </div>
    <div
      v-if="isContactOpen"
      class="fixed inset-0 z-50 justify-center items-center overflow-x-hidden overflow-y-auto flex"
    >
      <div class="contact-bg p-8 rounded-lg w-full h-full">
        <div class="cursor-pointer flex justify-end" @click="openContact">
          <svg
            class="h-16 w-16 text-white"
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
        <ContactForm />
      </div>
    </div>
  </div>
</template>

<script>
import ContactForm from "./ContactForm";

export default {
  name: "Button",
  components: {
    ContactForm,
  },
  methods: {
    openContact: function(event) {
      event.stopPropagation();
      this.isContactOpen = !this.isContactOpen;
      if (document.body.classList.contains("overflow-hidden")) {
        document.body.classList.remove("overflow-hidden");
      } else {
        document.body.classList.add("overflow-hidden");
      }
    },
  },
  data() {
    return {
      isContactOpen: false,
    };
  },
};
</script>

<style>
.contact-bg {
  background-color: #28b191;
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
