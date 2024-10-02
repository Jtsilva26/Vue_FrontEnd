import { defineStore } from "pinia";

export const useOwnerStore = defineStore('owner', {
    state: () => ({
        owners: [],
        selectedOwner: null,
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

        async fetchOwners(){
            try{
                const mongo = app.currentUser.mongoClient("mongodb-atlas");
                const collection = mongo.db("Owner_DB").collection("Owners");
                this.owners = await collection.find({});
            }catch(err){
                console.error('Error fetching owners:', error.value);
            }
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
                    this.fetchData();
                }
            }catch(err){
                this.error = "An error occurred while creating the owner. Please try again.";
                this.statusMessage = '';
            }
        },

        async fetchData (){
            try {
                const result = await app.currentUser.callFunction("getOwners");
                if (result) {
                    this.owners = result;
                }
            } catch (err) {
                console.error("Error fetching owners:", err);
            }
        },

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