interface Patient{
    name:string,
    id:string,
    status:string
}
interface ComplaintData{
    department:string,
    count:number
}
interface DUMMYDATA{
    label:string,
    value:number
}
interface DeptData{
    department:string,
    patients:number,
    fullMark:number
}
const INDIAN_PATIENTS :Patient[]= [
  { name: "Aarav Sharma", id: "PT-501", status: "Critical" },
  { name: "Ishani Patel", id: "PT-502", status: "Stable" },
  { name: "Vihaan Gupta", id: "PT-503", status: "Observation" },
  { name: "Ananya Iyer", id: "PT-504", status: "Stable" },
  { name: "Aditya Verma", id: "PT-505", status: "Critical" },
  { name: "Saanvi Reddy", id: "PT-506", status: "Stable" },
  { name: "Arjun Malhotra", id: "PT-507", status: "Observation" },
  { name: "Kavya Nair", id: "PT-508", status: "Stable" },
  { name: "Rohan Deshmukh", id: "PT-509", status: "Critical" },
  { name: "Zoya Khan", id: "PT-510", status: "Stable" },
  { name: "Shivam Tripathi", id: "PT-590", status: "Critical" },
];
const COMPLAINT_DATA :ComplaintData[]= [
  { department: "Cardiology", count: 12 },
  { department: "Pediatrics", count: 45 },
  { department: "Radiology", count: 8 },
  { department: "Orthopedics", count: 22 },
  { department: "Emergency", count: 58 },
  { department: "Neurology", count: 15 },
]
const DUMMY_DAYS :DUMMYDATA[]= [
  { label: "Mon", value: 40 },
  { label: "Tue", value: 30 },
  { label: "Wed", value: 65 },
  { label: "Thu", value: 45 },
  { label: "Fri", value: 90 },
]

const DUMMY_MONTHS :DUMMYDATA[]= [
  { label: "Jan", value: 400 },
  { label: "Feb", value: 300 },
  { label: "Mar", value: 500 },
  { label: "Apr", value: 280 },
  { label: "May", value: 590 },
]

const DUMMY_YEARS :DUMMYDATA[]= [
  { label: "2023", value: 4500 },
  { label: "2024", value: 5200 },
  { label: "2025", value: 6100 },
]
const DEPT_DATA :DeptData[]= [
  { department: "Cardiology", patients: 120, fullMark: 150 },
  { department: "Pediatrics", patients: 98, fullMark: 150 },
  { department: "Radiology", patients: 86, fullMark: 150 },
  { department: "Orthopedics", patients: 99, fullMark: 150 },
  { department: "Emergency", patients: 145, fullMark: 150 },
  { department: "Neurology", patients: 40, fullMark: 150 },
]
export { INDIAN_PATIENTS, COMPLAINT_DATA, DUMMY_DAYS, DUMMY_MONTHS, DUMMY_YEARS, DEPT_DATA };