import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

const useFirebaseLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const databaseRef = firebase.database().ref();
    const locationRef = databaseRef.child('rPyQOFDu9zVLGdWiA7tJZ7cs6wX2/readings/1682490369');
    locationRef.once('value', snapshot => {
      const latitudeVal = snapshot.child('latitude').val();
      const longitudeVal = snapshot.child('longitude').val();
      setLatitude(latitudeVal);
      setLongitude(longitudeVal);
    });
  }, []);

  return [latitude, longitude];
};

export default useFirebaseLocation;