<template>
  <div class="owner-page">
    <h1>Create Owner</h1>
    
    <form @submit.prevent="createOwner">
      <!-- Other input fields for creating an owner -->
      <input type="text" v-model="ownerName" placeholder="Owner Name" />

      <!-- File input for uploading an owner-related file -->
      <input type="file" @change="handleFileUpload" />

      <button type="submit">Create Owner</button>
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
      ownerName: '', // Owner name field
      file: null,    // File to be uploaded
      fileUrl: ''    // URL of the uploaded file
    };
  },
  methods: {
    // Handle file input change
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    // Function to create the owner and upload the file
    async createOwner() {
      if (!this.file) {
        alert('Please upload a file for the owner.');
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

          // You can also make a request to your MongoDB backend to save the owner details,
          // including the uploaded file's URL if needed
          alert('Owner created and file uploaded successfully!');
        } else {
          throw new Error(data.message || 'Failed to upload file');
        }
      } catch (error) {
        console.error('Error creating owner:', error);
        alert('Failed to create owner.');
      }
    }
  }
};
</script>
