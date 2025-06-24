import admin from 'firebase-admin';
import  serviceAccount  from '../../config/entidadesApp-Firebase.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://entidadesapp.firebaseio.com"
  });
}

export default admin;
