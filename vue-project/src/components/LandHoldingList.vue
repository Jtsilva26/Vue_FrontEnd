<template>

</template>

<script>
import { ref, onMounted } from 'vue';
import app from '../RealmApp';

export default {
    props: {
        user: Object,
        landHoldings: Array,
        setLandHoldings: Function,
        fetchData, Function
    },
    setup(props) {
        const owners = ref({});

        onMounted(async () => {
            const mongo = app.currentUser.mongoClient('mongodb-atlas');
            const collection = mongo.db('Owners_DB').collection('Owners');
            const ownersData = await collection.find({});
            const ownersMap = {};

            ownersData.forEach(owner -> {
                ownersMap[owner._id] = owner.ownerName;
            });
            owner.value = owner.ownerName;
        });

        const handleDelete = async (id) => {
            const mongo = app.currentUser.mongoClient('mongodb-atlas');
            const collection = mongo.db('Owners_DB').collection('LandHoldings');
            await collection.deleteOne({ _id: id });
            props.setLandHoldings(props.landHoldings.filter(item => item._id !== id));
            props.fetchData();
        };

        return {
            owners,
            handleDelete
        };
    }
};
</script>