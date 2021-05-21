export default function Timestamp(datatime){
        
        let timestamp_obj = new Date(datatime);

    return "Date : " + timestamp_obj.getDay() 
                     + " / " 
                     + timestamp_obj.getMonth() 
                     + " / " 
                     + timestamp_obj.getFullYear() 
                     + " - " 
                     + timestamp_obj.getHours() 
                     + " : " 
                     + timestamp_obj.getMinutes() 
                     + " : " 
                     + timestamp_obj.getSeconds();
}