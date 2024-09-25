<template>
    <div>
        <CreateOwner @data-fetched="fetchData" />
        <OwnersList :owners="owners" :fetchData="fetchData" />
    </div>
</template>

<script>

import { ref } from 'vue';
import CreateOwner from '../components/CreateOwners.vue';
import OwnersList from '../components/OwnersList.vue';
import app from '../realmApp';

const owners = ref([]);

const fetchData = async () => {
    const mongo = app.currentUser.mongoClient("mongodb-atlas");
    const collection = mongo.db("Owners_DB").collection("Owners");
    owners.value = await collection.find();
};

fetchData();

</script>