<template>
    <div>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Word</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{formTitle}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.text" label="Text" :rules="[() => editedItem.text.trim().length > 0 || 'This field is required']" required></v-text-field>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div v-if="vocabulary">
      <v-data-table
        :headers="headers"
        :items="vocabularyByDate"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-">{{ props.item.en.text}}</td>
          <td class="text-xs-">{{ props.item.az.text }}</td>
          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      </div>
      <div>
        <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
      </div>

          <v-snackbar
        :timeout="timeout"
        :color="color"
        :multi-line="mode === 'multi-line'"
        :vertical="mode === 'vertical'"
        v-model="snackbar"
      >
        {{ snackbarMessage }}
        <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>

    
  </div>


</template>

<script>
import { mapGetters } from "vuex";

// import FieldErrorSnackbar from '@/components/Helper/FieldError.vue';

export default {
  props: ["vocabulary"],
  components: {
    // FieldErrorSnackbar
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Word" : "Edit Word";
    },
    vocabularyByDate() {
      if (this.vocabulary.words) return this.vocabulary.words.waiting; //.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
    }
  },
  data: () => ({
    dialog: false,
    snackbar: false,
    snackbarMessage: "say hello",

    color: "",
    mode: "",
    timeout: 10000,
    headers: [
      {
        text: "EN",
        sortable: false,
        value: "en"
      },
      {
        text: "AZ",
        sortable: false,
        value: "az"
      },
      { text: "Actions", value: "en", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      text: ""
    },
    defaultItem: {
      text: ""
    },
    sendData: {
      vocabulary_id: "5b002ba758ac9b1e0c2dddcc",
      text: "",
      language: {
        from: "en",
        to: "az"
      }
    }
  }),

  methods: {
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.sendData.text = this.editedItem;
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.sendData.text = this.editedItem.text;

      this.$store
        .dispatch("words/create", this.sendData)
        .then(succ => {
          this.close();
          this.$store.dispatch(
            "vocabularies/getVocabulary",
            "5b002ba758ac9b1e0c2dddcc"
          );
        })
        .catch(err => {
          this.snackbarMessage = err.response.data.message;
          this.snackbar = true;
        });
    }
  }
};
</script>

<style>
.table__overflow {
  overflow-y: auto !important;
  height: 455px;
}
.snack__content {
  padding: 28px 24px;
}
</style>
