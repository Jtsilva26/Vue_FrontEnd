<template>
  <div class="land-holdings-page">
    <h1>Create Land Holding</h1>
    
    <form @submit.prevent="createLandHolding">
      <!-- Other input fields for creating a landholding -->
      <input type="text" v-model="landHoldingName" placeholder="Land Holding Name" />

      <!-- File input for uploading a landholding-related file -->
      <input type="file" @change="handleFileUpload" />

      <button type="submit">Create Land Holding</button>
    </form>

    <!-- Display uploaded file link (if any) -->
    <div v-if="fileUrl">
      <p>File Uploaded: <a :href="fileUrl" target="_blank">{{ fileUrl }}</a></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      landHoldingName: '', // Landholding name field
      file: null,          // File to be uploaded
      fileUrl: ''          // URL of the uploaded file
    };
  },
  methods: {
    // Handle file input change
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    // Function to create the landholding and upload the file
    async createLandHolding() {
      if (!this.file) {
        alert('Please upload a file for the landholding.');
        return;
      }

      try {
        // Perform file upload
        const formData = new FormData();
        formData.append('file', this.file);

        // Make a POST request to your Cloudflare Worker
        const response = await fetch('https://your-worker-name.workers.dev', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          // Store the file URL after successful upload
          this.fileUrl = data.fileUrl;

          // Optionally, make a request to your MongoDB backend to save the landholding details,
          // including the uploaded file's URL
          alert('Landholding created and file uploaded successfully!');
        } else {
          throw new Error(data.message || 'Failed to upload file');
        }
      } catch (error) {
        console.error('Error creating landholding:', error);
        alert('Failed to create landholding.');
      }
    }
  }
};
</script>
