import { defineStore } from "pinia";
import app from '../RealmApp';

export const useOwnerStore = defineStore('ownerStore', {
    state: () => ({
        owners: [],
        selectedOwner: null,
        ownerHoldingsCount : [],
        ownerFiles: [],
        ownerName : null,
        entityType : null,
        ownerType : null,
        address : null,
        error : null,
        statusMessage : null,
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
                const result = await app.currentUser.callFunction("Duplicate", {
                    ownerName : this.ownerFiles,
                    entityType : this.entityType,
                    ownerType : this.ownerType,
                    address : this.address,
                    totalLandHoldings: 0,
                    landHoldings: [],
                });
                
                if(result.status === "failed"){
                    this.error = result.message;
                    this.statusMessage = '';
                }else{
                    this.statusMessage = result.message;
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

        async fetchOwners(){
            try{
                const mongo = app.currentUser.mongoClient("mongodb-atlas");
                const collection = mongo.db("Owners_DB").collection("Owners");
                this.owners = await collection.find({});
            }catch(err){
                console.error('Error fetching owners:', err);
            }
        },

        // async fetchData (){
        //     try {
        //         const result = await app.currentUser.callFunction("getOwners");
        //         if (result) {
        //             this.owners = result;
        //         }
        //     } catch (err) {
        //         console.error("Error fetching owners:", err);
        //     }
        // },

        async fetchOwnersFiles(){
            if(this.selectedOwner && this.selectedOwner.fileUrl){
                this.ownerFiles = this.selectedOwner.fileUrl;
            }else{
                this.ownerFiles = [];
            }
        },
        selectedOwner(owner){
            this.selectedOwner = owner;
            this.fetchOwnersFiles();
        },
    },
});