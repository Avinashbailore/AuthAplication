import { useState, useEffect } from 'react';
import { projectStorage, projectFireStore, timestamp } from '../FireBase/firebase';


const useStorage = (file) => {
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //reference


        const collectionRef = projectFireStore.collection('images');

        console.log(collectionRef);

        let firebaseStorageRef = projectStorage.ref();
        let imagesRef = firebaseStorageRef.child('images');
        const storageRef = imagesRef.child(file.name);

        storageRef.put(file).on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        }, (err) => {
            console.log(err)
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({ url, createdAt })
            setUrl(url);
        });
    }, [file]);

    return { progress, url, error }
}

export default useStorage