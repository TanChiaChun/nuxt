<script setup lang="ts">
import { PRODUCTIVITY_FREQUENCIES } from '#shared/constants';

definePageMeta({
  middleware: (to, from) => {
    return navigateTo(`/productivities/${PRODUCTIVITY_FREQUENCIES[0]}`)
  }
})
</script>
