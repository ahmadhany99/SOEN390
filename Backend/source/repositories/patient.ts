import { patient } from '../models/patient';
import { accountModel } from '../models/account';
import { queryDatabase } from '../DatabaseServices';
import logging from '../config/logging';

const NAMESPACE = 'patient/repository';


// Get a patient's info given a patient ID
const getPatient = (patient: patient) => {
    const query = `SELECT * FROM patient WHERE patient.patientID = '${patient.patientID}'`;
    return queryDatabase(query);
}

// Count all the patients from the patient table
const countAllPatients = (patient: patient) => {
    const query = `SELECT COUNT(*) as countAllPatients FROM patient`;
    return queryDatabase(query);
}

// Check if the patient exists in the patient table given a patient ID
const checkIfPatientExistsInPatient = (patient : patient) =>{
    const query = `SELECT * FROM patient WHERE patientID = "${patient.patientID}"`;
      logging.debug(NAMESPACE, "query:", query);
    return queryDatabase(query) as unknown as patient[];
}

// Get the patient's doctor (doctor id and name) given a patient ID
const getDoctor = (patient: patient) => {
    const query = `SELECT doctor.doctorID, account.firstName, account.lastName
    FROM patient, account, doctor
    WHERE patient.doctorID = doctor.doctorID AND doctor.doctorID = account.accountID AND patient.patientID = '${patient.patientID}'`;
    return queryDatabase(query);
}

const getCovidStatus = (patientID: number) => {
    const query = `SELECT covidStatus FROM patient WHERE patientID = "${patientID}"`;
    return queryDatabase(query) as unknown as {covidStatus: Buffer}[];
}

const getCovidPosCount = (patientID: number) => {
    const query = `SELECT count(*) AS count FROM patient WHERE covidStatus = true`;
    return queryDatabase(query) as unknown as {count: number}[];
}

const setCovidStatus = (patientID: number, covidStatus: boolean) => {
    const query = `UPDATE patient SET covidStatus = ${covidStatus} WHERE patientID = "${patientID}"`;
    return queryDatabase(query);
}

export{
    getPatient,
    countAllPatients,
    checkIfPatientExistsInPatient,
    getDoctor,

    getCovidStatus,
    getCovidPosCount,
    setCovidStatus
};