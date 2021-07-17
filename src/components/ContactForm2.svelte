<script>
  import Modal from 'sv-bootstrap-modal';
  let isOpen = false;
</script>

<Modal bind:open={isOpen}>
  <div class="modal-header">
    <h5 class="modal-title">Modal title</h5>
    <button type="button" class="close" on:click={() => (isOpen = false)}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">Woohoo, you're reading this text in a modal!</div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary">Close</button>
    <button type="button" class="btn btn-primary">Save changes</button>
  </div>
</Modal>

<button class="btn btn-primary" on:click={() => (isOpen = true)}>Open Modal</button>

<style scoped>
  @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css');
</style>
