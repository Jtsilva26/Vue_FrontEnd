import { defineStore } from "pinia";
import app from '../RealmApp';
import { BSON } from 'realm-web';


export const useLandHoldingsStore = defineStore('landHoldingsStore', {
    state: () => ({
        owners: [],
        landHoldings: [],
        selectedLandHolding: null,
        file: null,
        fileUrl: null,
        selectOwnerId : null, 
        legalEntity : null, 
        netMineralAcres : 0, 
        mineralOwnerRoyalty : 0, 
        section : null, 
        township : null, 
        range : null, 
        titleSource : null, 
        error : null, 
        statusMessage : null, 
    }),
    actions: {

        async resetForm() {
            this.statusMessage = '';
            this.selectOwnerId = '';
            this.legalEntity = '';
            this.netMineralAcres = 0;
            this.mineralOwnerRoyalty = 0;
            this.section = '';
            this.township = '';
            this.range = '';
            this.titleSource = '';
        },

        async handleSubmit() {
            if (!this.selectOwnerId || !this.legalEntity || !this.netMineralAcres || !this.mineralOwnerRoyalty || !this.section || !this.township || !this.range || !this.titleSource) {
                this.error = "Please fill in all required fields.";
                return;
            }
            if (!/^\d{3}$/.test(this.section)) {
                if(!/^\d{3}[NS]$/.test(this.township)){
                    if(!/^\d{3}[EW]$/.test(this.range)){
                        this.error = "Section must be exactly 3 digits, Township must be 4 characters: first 3 digits followed by 'N' or 'S', and Range must be 4 characters: first 3 digits followed by 'E' or 'W'.";
                        return;
                    }
                    else{
                        this.error = "Section must be exactly 3 digits and Township must be 4 characters: first 3 digits followed by 'N' or 'S'";
                        return;
                    }
                }
                else if(!/^\d{3}[EW]$/.test(this.range)){
                    this.error = "Section must be exactly 3 digits and Range must be 4 characters: first 3 digits followed by 'E' or 'W'.";
                    return;
                }
                else{
                    this.error = "Section must be exactly 3 digits.";
                    return;
                }
            }
            if (!/^\d{3}[NS]$/.test(this.township)) {
                if(!/^\d{3}[EW]$/.test(this.range)){
                    this.error = "Township must be 4 characters: first 3 digits followed by 'N' or 'S', and Range must be 4 characters: first 3 digits followed by 'E' or 'W'.";
                    return;
                }
                else{
                    this.error = "Township must be 4 characters: first 3 digits followed by 'N' or 'S'.";
                    return;
                }
            }
            if (!/^\d{3}[EW]$/.test(this.range)) {
                this.error = "Range must be 4 characters: first 3 digits followed by 'E' or 'W'.";
                return;
            }
        
            try {
                const mongo = app.currentUser.mongoClient("mongodb-atlas");
                const collection = mongo.db("Owners_DB").collection("LandHoldings");
                await collection.insertOne({
                    ownerId: this.selectOwnerId,
                    legalEntity: this.legalEntity,
                    netMineralAcres: this.netMineralAcres,
                    mineralOwnerRoyalty: this.mineralOwnerRoyalty,
                    sectionName: `${this.section}-${this.township}-${this.range}`,
                    name: `${this.legalEntity}-${this.section}`,
                    section: this.section,
                    township: this.township,
                    range: this.range,
                    titleSource: this.titleSource,
                });
                alert("Land Holding created successfully!");
                this.error = '';
                this.resetForm();
                this.fetchData();
            } catch (err) {
                console.error("Error details:", err);
                this.error = "Error creating Land Holding. Please try again.";
                this.statusMessage = '';
            }
        },

        async handleFileUpload(event) {
            this.file = event.target.files[0];
        },

        async uploadFile() {
            if (!this.selectedLandHolding) {
              alert('Please select a land holding.');
              return;
            }
            if (!this.file) {
              alert('Please upload a file.');
              return;
            }
          
            try {
              // Prepare the file for upload
              const formData = new FormData();
              formData.append('file', this.file);
          
              // Send file to Cloudflare Worker
              const response = await fetch('https://file-upload-worker.slvjordan2626.workers.dev', {
                method: 'POST',
                body: formData,
              });
          
              const data = await response.json();
          
              if (response.ok) {
                this.fileUrl = data.fileUrl;
          
                // Get MongoDB client
                const mongo = app.currentUser.mongoClient("mongodb-atlas");
                const landHoldingsCollection = mongo.db("Owners_DB").collection("LandHoldings");
                const ownersCollection = mongo.db("Owners_DB").collection("Owners");
          
                try {
                  // Update the Land Holding with the fileUrl
                  const updateResult = await landHoldingsCollection.updateOne(
                    { _id: new BSON.ObjectId(this.selectedLandHolding._id) },
                    { $set: { fileUrl: this.fileUrl} },
                  );
          
          
                  if (updateResult.modifiedCount === 0) {
                    throw new Error("Land Holding not found");
                  }
          
                  // Update the list of links for the owners collection
                  // $addToSet prevents duplicates and is similar to push function
                  await ownersCollection.updateOne(
                      {_id: new BSON.ObjectID(this.selectedLandHolding.ownerId) },
                      { $addToSet: { fileUrl: this.fileUrl } }
                  );
          
                  alert("Land Holding updated and file uploaded successfully");
          
                } catch (err) {
                  console.error('Error processing MongoDB operations:', err);
                  alert('Failed to update Land Holding or insert file');
                }
          
              } else {
                throw new Error(data.message || 'Failed to upload file');
              }
            } catch (err) {
              console.error('Error uploading file:', err);
              alert('Failed to upload file');
            }
        },

        async handleDelete(id) {
            if (confirm("Are you sure you want to delete this land holding?")) {
                try {
                    const mongo = app.currentUser.mongoClient("mongodb-atlas");
                    const collection = mongo.db("Owners_DB").collection("LandHoldings");
                    await collection.deleteOne({ _id: id });
                    this.setLandHoldings(this.landHoldings.filter(item => item._id != id));
                    this.fetchData();
                } catch (err) {
                    console.error("Error deleting land holding:", err);
                }
            }
        },

        async setLandHoldings(newHoldings) {
            this.landHoldings = newHoldings;
        },

        async fetchData() {
            try {
                const mongo = app.currentUser.mongoClient('mongodb-atlas');
                const collection = mongo.db('Owners_DB').collection('LandHoldings');
                const data = await collection.find({});
                this.landHoldings = data;
            } catch (error) {
                console.error("Error fetching land holdings:", authStore.state.error);
            }
        },

        async fetchOwners(){
            try{
                const mongo = app.currentUser.mongoClient("mongodb-atlas");
                const collection = mongo.db("Owners_DB").collection("Owners");
                const ownersData = await collection.find({});
                const ownersMap = {};
                ownersData.forEach(owner => {
                    ownersMap[owner._id] = owner.ownerName;
                });
                this.owners = ownersMap
            }catch(err){
                console.error('Error fetching owners:', err);
            }
        },
    }

});