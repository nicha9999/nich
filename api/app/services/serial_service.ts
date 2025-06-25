import Serial from "#models/serial";

export default class SerialService{

    public static async getSerial(name: string){
        try {
      
          const serial: any = await Serial.findBy({name: name})
        
          let seriallNo = 0;
           
          if(serial != null){
            seriallNo = serial.serial_no
             serial.serial_no = serial.serial_no+1;
             await serial.save();
            return seriallNo + 1
          }else{
            await Serial.create({name: name, serial_no: 1})
            return 1
          }         
  
        } catch (error) {
          console.error(error)
          return 0
        }
  
      }

}