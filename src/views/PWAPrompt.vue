<template>
  <div v-if="shown" class="d-grid gap-2 col-6 mx-auto">
    Добавить приложение на главный экран?
    <button class="btn btn-success" @click="installPWA">Установить</button>
    <button class="btn btn-danger" @click="dismissPrompt">
      Спасибо, не надо!
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    shown: false,
  }),

  beforeMount() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.installEvent = e;
      this.shown = true;
    });
  },

  methods: {
    dismissPrompt() {
      this.shown = false;
    },

    installPWA() {
      this.installEvent.prompt();
      this.installEvent.userChoice.then((choice) => {
        this.dismissPrompt(); // Hide the prompt once the user's clicked
        if (choice.outcome === "accepted") {
          // Do something additional if the user chose to install
        } else {
          // Do something additional if the user declined
        }
      });
    },
  },
};
</script>
