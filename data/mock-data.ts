export type Role = 'Fleet Manager' | 'Driver' | 'Administrator'
export type Status = 'Active' | 'Idle' | 'Offline'
export type Vehicle = { id: string; vehicleId: string; registrationNumber: string; type: string; model: string; assignedDriverId: string; status: Status; latitude: number; longitude: number; speed: number; location: string; lastUpdated: string }
export type User = { id: string; name: string; email: string; role: Role; status: 'Active' | 'Inactive' }
export type Trip = { id: string; tripId: string; vehicleId: string; driverId: string; source: string; destination: string; startTime: string; expectedArrival: string; status: 'Scheduled' | 'Ongoing' | 'Completed' | 'Delayed' }
export const users: User[] = [
 {id:'u1',name:'Arjun Patnaik',email:'manager@fleetpulse.demo',role:'Fleet Manager',status:'Active'},
 {id:'u2',name:'Sneha Das',email:'sneha@fleetpulse.demo',role:'Fleet Manager',status:'Active'},
 {id:'u3',name:'Rohan Mohanty',email:'rohan@fleetpulse.demo',role:'Fleet Manager',status:'Active'},
 {id:'u4',name:'Sanjay Behera',email:'driver@fleetpulse.demo',role:'Driver',status:'Active'},
 {id:'u5',name:'Priya Sahu',email:'priya@fleetpulse.demo',role:'Driver',status:'Active'},
 {id:'u6',name:'Manoj Nayak',email:'manoj@fleetpulse.demo',role:'Driver',status:'Active'},
 {id:'u7',name:'Kabita Jena',email:'kabita@fleetpulse.demo',role:'Driver',status:'Active'},
 {id:'u8',name:'Deepak Rout',email:'deepak@fleetpulse.demo',role:'Driver',status:'Active'},
 {id:'u9',name:'Anita Swain',email:'anita@fleetpulse.demo',role:'Driver',status:'Active'},
 {id:'u10',name:'Bikash Panda',email:'bikash@fleetpulse.demo',role:'Driver',status:'Active'},
 {id:'u11',name:'Lipsa Mishra',email:'lipsa@fleetpulse.demo',role:'Driver',status:'Active'},
 {id:'u12',name:'FleetPulse Admin',email:'admin@fleetpulse.demo',role:'Administrator',status:'Active'},
]
const places = [
 ['Bhubaneswar',20.2961,85.8245],['Berhampur',19.3149,84.7941],['Rayagada',19.1712,83.4163],['Gunupur',19.081,83.8088],['Paralakhemundi',18.7811,84.0882],['Vizianagaram',18.1067,83.3956],['Cuttack',20.4625,85.883],['Puri',19.8135,85.8312],['Jeypore',18.8563,82.5716],['Sambalpur',21.4669,83.9812],['Khordha',20.182,85.616],['Gopalpur',19.2586,84.9052]
] as const
const registrations = ['OD-18-AB-1024','OD-18-AB-2048','OD-07-CD-3012','OD-02-EF-4086','OD-18-GH-5091','OD-07-JK-6103','OD-05-LM-7114','OD-02-NP-8125','OD-18-QR-9136','OD-07-ST-0147','OD-05-UV-1158','OD-02-WX-2169']
export const vehicles: Vehicle[] = Array.from({length:48},(_,i)=>{
 const [location,latitude,longitude]=places[i%places.length]
 const status:Status=i<32?'Active':i<42?'Idle':'Offline'
 const generatedRegistration=`OD-${['18','07','02','05'][i%4]}-${String.fromCharCode(65+(i*2)%26)}${String.fromCharCode(65+(i*3)%26)}-${String(3000+i).slice(-4)}`
 return {id:`v${i+1}`,vehicleId:`FP-${String(i+1).padStart(3,'0')}`,registrationNumber:registrations[i]??generatedRegistration,type:['Truck','Delivery Van','Mini Truck','Passenger Vehicle'][i%4],model:['Tata 407','Ashok Leyland Dost','Mahindra Bolero Pik-Up','Eicher Pro 2049'][i%4],assignedDriverId:`u${i%8+4}`,status,latitude:latitude+Math.floor(i/places.length)*.012,longitude:longitude+Math.floor(i/places.length)*.012,speed:status==='Active'?34+(i*7)%48:0,location,lastUpdated:`${i+1} min ago`}
})
export const trips: Trip[] = Array.from({length:36},(_,i)=>({id:`t${i+1}`,tripId:`TR-${2026}-${String(1842+i).padStart(4,'0')}`,vehicleId:`v${i+1}`,driverId:`u${i%8+4}`,source:places[i%places.length][0],destination:places[(i+3)%places.length][0],startTime:`${i%2?'Today':'Yesterday'}, ${String(7+i%10).padStart(2,'0')}:${i%2?'30':'15'} AM`,expectedArrival:`${String(13+i%7).padStart(2,'0')}:45 PM`,status:(i<18?'Ongoing':['Completed','Scheduled','Delayed'][i%3]) as Trip['status']}))
export const activity = [{day:'Mon',active:28,completed:34,total:41},{day:'Tue',active:32,completed:39,total:46},{day:'Wed',active:30,completed:31,total:39},{day:'Thu',active:36,completed:44,total:50},{day:'Fri',active:33,completed:38,total:45},{day:'Sat',active:29,completed:27,total:35},{day:'Sun',active:32,completed:36,total:43}]
export const locations = vehicles.flatMap((v,i)=>[0,1,2].map((step)=>({id:`${v.id}-p${step}`,vehicleId:v.id,latitude:v.latitude+step*.008,longitude:v.longitude+step*.006,timestamp:`${step+1} hr ago`,speed:Math.max(0,v.speed-step*4)})))
export const demoAccounts = [{role:'Fleet Manager' as Role,email:'manager@fleetpulse.demo',password:'demo123',name:'Arjun Patnaik'},{role:'Driver' as Role,email:'driver@fleetpulse.demo',password:'demo123',name:'Sanjay Behera'},{role:'Administrator' as Role,email:'admin@fleetpulse.demo',password:'demo123',name:'FleetPulse Admin'}]
