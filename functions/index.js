const functions = require("firebase-functions");
const admin = require('firebase-admin');
const {Firestore} = require('@google-cloud/firestore');

const firestore = new Firestore();

admin.initializeApp();

const recipesRef = firestore.collection('recipes')

exports.onAuthorNameChange = functions.firestore
    .document('users/{docId}')
    .onUpdate((change, context) => {
        const uid = context.params.docId;

        const newValue = change.after.data();
        const previousValue = change.before.data();

        const newName = { firstName: newValue.firstName, lastName: newValue.lastName, uid };
        const previousName = { firstName: previousValue.firstName, lastName: previousValue.lastName, uid };

        //If name is unchanged return
        if (newName === previousName) return;

        const getRecipeIds = async () => {
            const query = recipesRef.where("author.uid", "==", uid)
            
            let documentIds = []

            query.stream().on('data', (documentSnapshot) => {
                documentIds.push(documentSnapshot.id)
            }).on('end', () => {
                for (i = 0; i < documentIds.length; i++) {
                    const documentRef = recipesRef.doc(documentIds[i]);
                    documentRef.update({ author: newName }).catch(err => { return err })
                }
            });
        };

        getRecipeIds();
        return null

    });