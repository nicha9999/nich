import Patient from "#models/patient"
import db from "@adonisjs/lucid/services/db"


export default class PatientService {

    public  async getHosGuide() {
        try {
          const hosguide = await db.rawQuery("SELECT upper(concat('{', UUID(), '}')) as p_guid")
          return hosguide[0][0].p_guid
        } catch (error) {
          console.error(error)
          return null
        }
      }

      public async insertPatient(data: Partial<Patient>): Promise<Patient> {
      
        const patient =  await Patient.create(data);
         return patient
      }
    
      public async updatePatient(id: number, data: Partial<Patient>): Promise<Patient | null> {
        // Fetch the existing record
        const patient = await Patient.findBy({hn: id});
    
        if (!patient) {
          return null; // Record not found
        }
    
        // Update the record with new data
        patient.merge(data);
    
        // Save the updated record back to the database
        await patient.save();
    
        return patient;
      }
    
      public async deletePatient(id: number): Promise<Patient | null> {
        // Fetch the existing record
        const patient = await Patient.findBy({ hn: id });
    
        if (!patient) {
            return null; // Record not found
        }
    
        // Delete the record from the database
        await patient.delete();
    
        return patient; // Record deleted successfully
    }
}
