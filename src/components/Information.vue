<template>
  <div class="fade-block">
    <div>
      <h1 class="text-7xl font-semibold my-8">{{ msg }}</h1>
    </div>
    <div class="py-8">
      <h2 class="text-3xl">Helge Johansen</h2>
      <p class="text-xl">
        System Developer
      </p>
    </div>
    <div class="my-8">
      <a href="https://gitlab.com/helgejs" target="_blank">
        <i class="fab fa-gitlab text-4xl mx-6 hover:text-gray-300"></i>
      </a>
      <a href="https://twitter.com/helgejs" target="_blank">
        <i class="fab fa-twitter text-4xl mx-6 hover:text-gray-300"></i
      ></a>
      <a href="https://www.linkedin.com/in/helgejs/" target="_blank">
        <i class="fab fa-linkedin-in text-4xl mx-6 hover:text-gray-300"></i>
      </a>
    </div>
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
        <form
          name="contactForm"
          method="POST"
          data-netlify="true"
          class="w-full"
        >
          <div class="w-full">
            <input name="contactFormInput" type="hidden" />
            <label
              for="name"
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
              >Name</label
            ><input
              name="contactName"
              type="text"
              placeholder="John Doe"
              maxlength="40"
              required="required"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
            />
            <p class="text-left mb-6"></p>
          </div>
          <div class="w-full">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
              >E-Mail</label
            ><input
              name="contactMail"
              type="text"
              placeholder="mail@company.com"
              maxlength="40"
              required="required"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
            />
            <div class="w-full">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                >Message</label
              ><textarea
                type="textarea"
                placeholder=""
                maxlength="240"
                rows="5"
                cols="60"
                name="message"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded pt-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <p class="text-left mb-6"></p>
            </div>
            <p class="text-left mb-6"></p>
          </div>
          <button
            type="submit"
            value="Send Message"
            class="button glass-effect text-gray-100"
          >
            Send
          </button>
        </form>
      </div>
    </div>
    <div
      v-if="isContactOpen"
      @click="openContact"
      class="absolute inset-0 z-40 opacity-60 bg-black"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Information",
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
  props: {
    msg: String,
  },
};
</script>
<style scoped>
@font-face {
  font-family: Protomolecule-Medium;
  src: url(../assets/Protomolecule-Medium.ttf);
}
h1 {
  font-family: "Protomolecule-Medium";
}
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.fade-block {
  opacity: 0;
  animation-delay: 2s;
  animation: fadein 3s ease;
  animation-fill-mode: forwards;
}
@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
