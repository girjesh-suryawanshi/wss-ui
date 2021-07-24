export class IncidentMaster{
   
    public username: string;
    public incidentType: string;
    public name: string;
    public locationCode: string;
    public locationName: string;
    public officeType :string;
    public incident: string;
    public incidentObject: string;
    public incidentObjectType: string;
    public employeeType: string;
    public incidentDate:Date;
    public incidentDescription: string;
  
    setName(name: string) {
      this.name = name;
    }
  
    getName(): string {
      return this.name;
  
    }

    setIncidentType(incidentType:string){
      this.incidentType = incidentType;
    }

    getIncidentType():string{
      return this.incidentType;
    }

    setIncidentDate(incidentDate:Date){
      this.incidentDate = incidentDate;
    }

    getIncidentDate():Date{
      return this.incidentDate;
    }

  
    setIncident(incident:string){
      this.incident = incident;
    }
  
    getIncident():string{
      return this.incident;
    }
  
    setIncidentObject(incidentObject:string){
      this.incidentObject = incidentObject;
  
    }
    getIncidentObject():string{
      return this.incidentObject;
    }
  
    setIncidentObjectType(incidentObjectType:string){
       this.incidentObjectType = incidentObjectType;
    }
  
    getIncidentObjectType():string{
      return this.incidentObjectType;
    }

    setEmpployeeType(employeeType:string){
      this.employeeType = employeeType;
   }
 
   getEmployeeType():string{
     return this.employeeType;
   }
  
    setIncidentDescription(incidentDescription:string){
        this.incidentDescription = incidentDescription;
    }
    getIncidentDescription():string{
      return this.incidentDescription;
    }
  
      setUsername(username : string){
          this.username = username;
      }
  
      getUsername() : string{
          return this.username
      }
  
      setLocationCode(locationCode : string){
        this.locationCode = locationCode;
      }
  
      getLocationCode() : string{
        return this.locationCode;
      }
  
      setLocationName(locationName:string){
        this.locationName = locationName;
      }
  
      getLocationName():string{
        return this.locationName;
      }
  
      setOfficeType(officeType:string){
        this.officeType = officeType;
      }
  
      getOfficeType():string{
        return this.officeType;
      }
  
  
  }