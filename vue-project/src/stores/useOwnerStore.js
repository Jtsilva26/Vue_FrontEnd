import { defineStore } from "pinia";
import app from '../RealmApp';
import { BSON } from 'realm-web';

export const useOwnerStore = defineStore('ownerStore', {
    state: () => ({
        owners: [],
        selectedOwner: null,
        ownerFiles: [],
        file : null,
        fileUrl : null,
        ownerName : null,
        entityType : null,
        ownerType : null,
        address : null,
        error : null,
        statusMessage : null,
        ownerHoldingsCount : [],
    }),
    actions: {

        async resetForm (){
            this.ownerName = '';
            this.entityType = '';
            this.ownerType = '';
            this.address = '';
        },

        
        async createOwner () {
            if(!this.ownerName || !this.entityType || !this.ownerType || !this.address){
                this.error = "Please fill out all required fields.";
                this.statusMessage = '';
                return;
            }
            
            try{
                const mongo = app.currentUser.mongoClient("mongodb-atlas");
                const collection = mongo.db("Owners_DB").collection("Owners");
                const existingOwner = await collection.findOne({
                    ownerName: this.ownerName,
                    address: this.address
                });

                if(existingOwner){
                    this.error = "An Owner with the same Name and Address already exists.";
                    this.statusMessage = '';
                }
                else{
                    await collection.insertOne({
                        ownerName : this.ownerName,
                        entityType : this.entityType,
                        ownerType : this.ownerType,
                        address : this.address,
                        totalLandHoldings : this.totalLandHoldings
                    });

                    this.statusMessage = "Owner created successfully!";
                    this.error;
                    this.resetForm();
                    this.fetchOwners();
                }

            }catch(err){
                this.error = "An error occurred while creating the owner. Please try again.";
                this.statusMessage = '';
            }
        },

        async handleDelete (ownerId) {

            if (confirm("Are you sure you want to delete this owner and all associated land holdings?")) {
                try {
                    const result = await app.currentUser.callFunction("Delete", { ownerId });
                    if (result.status === "success") {
                        alert(result.message);
                        this.fetchOwners();
        
                    } else {
                        alert(`Error: ${result.message}`);
                    }
                } catch (err) {
                    alert(`Error: ${err.message}`);
                }
            }
        },

        async handleFileUpload (event) {
            this.file = event.target.files[0];
        },

        async fetchHoldingsCounts () {
            const mongo = app.currentUser.mongoClient("mongodb-atlas");
            const collection = mongo.db("Owners_DB").collection("LandHoldings");
            const allHoldings = await collection.find(); // Fetch all holdings
            const counts = {}; // Initialize empty count object
        
            // Counts the number of land holdings for each owner
            allHoldings.forEach(holding => {
                const ownerId = holding.ownerId; // Get the owner ID form
                counts[ownerId] = (counts[ownerId] || 0) + 1; // Increments the count for owner
            });
        
            this.ownerHoldingsCount = counts; // Update state with counts
        },
        
        // async fetchOwners() {
        //     try {
        //         const result = await app.currentUser.callFunction("getOwners");
        //         if (result) {
        //             this.owners = result;
        //         }
        //     } catch (err) {
        //         console.error("Error fetching owners:", err);
        //     }
        // },

        async fetchOwners(){
            try{
                const mongo = app.currentUser.mongoClient("mongodb-atlas");
                const collection = mongo.db("Owners_DB").collection("Owners");
                this.owners = await collection.find({});
            }catch(err){
                console.error('Error fetching owners:', err);
            }
        },
        
        async fetchOwnersFiles() {
            if(this.selectedOwner && this.selectedOwner.fileUrl){
                this.ownerFiles = this.selectedOwner.fileUrl;
            }else{
                this.ownerFiles = [];
            }
        },

        async uploadFile () {
            if (!this.selectedOwner) {
                alert('Please select an owner.');
                return;
            }
            if (!this.file) {
                alert('Please upload a file.');
                return;
            }
        
            try {
                const formData = new FormData();
                formData.append('file', this.file);
        
                // Sending file to cloudflare worker
                const response = await fetch('https://file-upload-worker.slvjordan2626.workers.dev', {
                    method: 'POST',
                    body: formData,
                });
        
                const data = await response.json();
        
                if (response.ok) {
                    this.fileUrl = data.fileUrl;
        
                    const mongo = app.currentUser.mongoClient("mongodb-atlas");
                    const ownersCollection = mongo.db("Owners_DB").collection("Owners");
        
                    try {
                        // Update the owner's fileUrl array
                        const updateResult = await ownersCollection.updateOne(
                            { _id: new BSON.ObjectId(this.selectedOwner._id) },
                            { $addToSet: { fileUrl: this.fileUrl } }
                        );
        
                        if (updateResult.modifiedCount === 0) {
                            throw new Error("Owner not found");
                        }
                        // Refresh the file list for the owner
                        this.fetchOwnerFiles();
        
                        alert("Owner updated and file uploaded successfully");
        
                    } catch (err) {
                        console.error('Error processing MongoDB operations:', err);
                        alert('Failed to update owner or insert file');
                    }
        
                } else {
                    throw new Error(data.message || 'Failed to upload file');
                }
            } catch (err) {
                console.error('Error uploading file:', err);
                alert('Failed to upload file');
            }
        },
        // selectedOwner(owner){
        //     this.selectedOwner = owner;
        //     this.fetchOwnersFiles();
        // },
    },
});