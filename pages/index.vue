<template>
  <div><input type="text" /></div>
</template>

<script lang="ts">
import Vue from 'vue'
import io from 'socket.io-client'

export default Vue.extend({
  data() {
    return {
      socket: '' as any,
      msgs: [] as string[],
    }
  },
  mounted(): void {
    this.socket = io('http://localhost:3001')
    this.socket.on('new-msg', (msg: string) => {
      this.msgs.push(msg)
    })
  },
})
</script>
