<template>
          <v-snackbar
        :timeout="timeout"
        :color="color"
        :multi-line="mode === 'multi-line'"
        :vertical="mode === 'vertical'"
        v-model="snack"
      >
        {{ text }}
        <v-btn dark flat @click.native="snack = false">Close</v-btn>
      </v-snackbar>
</template>

<script>
export default {
    props:['text','snackbar'],
  data: () => ({
    color: "",
    mode: "",
    timeout: 10000,
  }),

  computed:{
      snack() {
          return this.snackbar;
      }
  }
};
</script>

<style>
</style>
