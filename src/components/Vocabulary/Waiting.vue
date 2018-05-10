<template>
      <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="true"
      class="elevation-1"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.az }}</td>
        <td class="text-xs-right">{{ props.item.pron }}</td>
        <td class="text-xs-right">{{ props.item.ru }}</td>
      </template>
    </v-data-table>
</template>

<script>
export default {
data () {
    return {
      headers: [
        { text: 'Az', value: 'az' },
        { text: 'Pron...', value: 'ru' },
        { text: 'Ru', value: 'ru' }
      ],
      desserts: [
        {
          az: false,
          pron: 'Frozen Yogurt',
          ru: 159,
         
        },
        {
          az: false,
          pron: 'Ice cream sandwich',
          ru: 237,
        
        },
        {
          az: false,
          pron: 'Eclair',
          ru: 262,
        
        },
        {
          az: false,
          pron: 'Cupcake',
          ru: 305,
      
        },
 
        {
          az: false,
          pron: 'Jelly bean',
          ru: 375,
         
        },
        {
          az: false,
          pron: 'Lollipop',
          ru: 392,
       
        },

      ]
    }
  }
}
</script>

<style>

</style>
