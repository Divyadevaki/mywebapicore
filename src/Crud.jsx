import { useState,Fragment,useEffect } from 'react'
import './index.css'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Crud = ()=> {    
    const [empid , setEmpid]=useState(0)
    const [empname , setEmpname]=useState('')
    const [salary , setSalary]=useState('')
    const [dept , setDept]=useState('')
    const [dob , setDob]=useState('0000-00-00')
    const [gender , setGender]=useState('')

    const [adempname , setAdEmpname]=useState('')
    const [adsalary , setAdSalary]=useState('')
    const [addept , setAdDept]=useState('')
    const [addob , setAdDob]=useState('0000-00-00')
    const [adgender , setAdGender]=useState('')

    const [delempid , setdelEmpid]=useState(0)

    const [data, setData] = useState([]);

    const [adshow, setAdShow] = useState(false);
    const [show, setShow] = useState(false);
    const [delshow, delsetShow] = useState(false);    

    const getEmployeedata=()=>{
    axios.get('http://localhost:5209/api/Employee')
    .then((result)=>setData(result.data))
    .catch((error)=>console.log(error.data))
  }

  useEffect(() => {
    getEmployeedata()},[]);    

const Mdelete_handleremove=()=>{
    delsetShow(false);
 const url=`http://localhost:5209/api/Employee/${delempid}`;
 axios.delete(url).then((result)=>{
    if(result.status==200)
        { 
            toast.success('Employee Deleted Successfully!');            
        }
      getEmployeedata();})
     .catch((error)=>console.log(error));
}

const Mdelete_handleClose = () => delsetShow(false);

const Mdelete_handleShow = (data) =>{    
    setdelEmpid(data);
    delsetShow(true);
  }
  const Medit_handleClose = () => setShow(false);
  const Medit_handleShow = (data) =>{
axios.get(`http://localhost:5209/api/Employee/${data}`)
.then((result)=>{
setEmpid(result.data.id);
setEmpname(result.data.empname);
setSalary(result.data.salary);
setDob(result.data.dob);
setDept(result.data.department);
setGender(result.data.gender);
});
setShow(true);
}

const Medit_handlesave=()=>{    
    setShow(false);
    
if(empname==""){    
    toast.warning("Employee Name should not be empty...!");
}else if(salary==""){      
    toast.warning("Salary should not be empty...!");
}else if(dob==""){      
    toast.warning("Select the valid Date of Birth...!");
}else if(dept==""){     
    toast.warning("Department should not be empty...!");      
}else if(gender==""){      
    toast.warning("Select the gender...!");
}else{
     const url=`http://localhost:5209/api/Employee/${empid}`;
    const data={
  "id":empid,
  "empname": empname,
  "salary": salary,
  "dob": dob,
  "department": dept,
  "gender": gender
}
    axios.put(url,data).then((result)=>{if(result.status==200){toast.success("Employee Details Modified Successfully!");}  getEmployeedata();}).catch((error)=>console.log(error));
}
}

const MAdd_handlesave=()=>{    
    setAdShow(false);
    
if(adempname==""){
    toast.warning("Employee Name should not be empty...!");
}else if(adsalary==""){    
    toast.warning("Salary should not be empty...!");
}else if(addob==""){    
    toast.warning("Select the valid Date of Birth...!");
}else if(addept==""){    
    toast.warning("Department should not be empty...!");
}else if(adgender==""){    
    toast.warning("Select the gender...!");
}else{

    const url="http://localhost:5209/api/Employee";
    const data={
  "empname": adempname,
  "salary": adsalary,
  "dob": addob,
  "department": addept,
  "gender": adgender
}
    axios.post(url,data).then((result)=>{if(result.status==200){toast.success("Employee Added Successfully!");}  getEmployeedata();}).catch((error)=>console.log(error));
}}

const MAdd_handleClose = () => setAdShow(false);
const MAdd_handleShow = () => {
setAdShow(true);    
setAdEmpname('');
setAdSalary('');
setAdDob('');
setAdDept('');
setAdGender('');
}

  return (
    <>
    <ToastContainer/>   
    <h1>Employee Details</h1> 
    <div style={{ textAlign: "left" ,paddingBottom:'10px'}}>
    <button id="newAddbtnid" className="btn btn-primary" onClick={()=>MAdd_handleShow()}>Add New Employee</button>
    </div>          
    <Fragment>
        
     <Table striped responsive>
      <thead>
        <tr>        
          <th>Employee Id</th>
          <th>Employee Name</th>
          <th>Salary</th>
          <th>DOB</th>
          <th>Department</th>
          <th>Gender</th>
          <th>Actions</th>          
        </tr>
      </thead>
      <tbody>
       
          {
            data && data.length >0 ?
            data.map((item,index)=>
         {
return(
 <tr key={index}>
          <td>{item.id}</td>
          <td>{item.empname}</td>
          <td>{item.salary}</td>
          <td>{item.dob}</td>
          <td>{item.department}</td>
          <td>{item.gender}</td>
          <td colSpan={2}>
            <div style={{ display: "flex", gap: "10px",justifyContent:'center'}}>
            <button id="editbtn" className='btn btn-primary' onClick={()=>Medit_handleShow(item.id)}>Edit</button>
            <button id="editbtn" className='btn btn-danger' onClick={()=>Mdelete_handleShow(item.id)}>Delete</button>
            </div>
          </td>
 </tr>
 )
        })
        : 'Loading.....' 
        }
          
       
      </tbody>
    </Table>
    </Fragment>

     <Modal show={delshow} onHide={Mdelete_handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>Delete Confirmation!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to remove the Employee details?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={Mdelete_handleremove}>
            Ok
          </Button>
          <Button variant="danger" onClick={Mdelete_handleClose}>
           Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={Medit_handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>Modify Employee Details!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className='row'>
               <input type="text" hidden value={empid}></input>
               <input type="text" value={empname} onChange={(e)=>setEmpname(e.target.value.replace(/[^a-zA-Z ]/g, ""))} maxLength="25" placeholder="Employee Name"></input>
               <input type="text" value={salary} onChange={(e)=>setSalary(e.target.value.replace(/[^0-9]/g, ""))} maxLength="10" placeholder="Salary"></input>
               <input type="date" value={dob} onChange={(e)=>setDob(e.target.value)}></input>
               <input type="text" value={dept} onChange={(e)=>setDept(e.target.value.replace(/[^a-zA-Z ]/g, ""))} placeholder="Department" maxlength="15"></input>
               <div style={{display:'inline'}}> 
               <label >Gender : </label>
               <label> <input checked={gender==="Male"} value="Male" onChange={(e)=>setGender(e.target.value)} type="radio" id="reg_male" name="nGender" />Male</label>
               <label> <input checked={gender==="Female"} value="Female" onChange={(e)=>setGender(e.target.value)} type="radio" id="reg_female" name="nGender" />Female</label>
               </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={Medit_handlesave}>
            Save Changes
          </Button>
           <Button variant="info" onClick={Medit_handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    
      <Modal show={adshow} onHide={MAdd_handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>Adding Employee Details!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className='row'>               
               <input type="text" value={adempname} onChange={(e)=>setAdEmpname(e.target.value.replace(/[^a-zA-Z ]/g, ""))} maxlength="25" placeholder="Employee Name"></input>
               <input type="text" value={adsalary} onChange={(e)=>setAdSalary(e.target.value.replace(/[^0-9]/g, ""))} maxlength="10" placeholder="Salary" ></input>
               <input type="date" value={addob} onChange={(e)=>setAdDob(e.target.value)}></input>
               <input type="text" value={addept} onChange={(e)=>setAdDept(e.target.value.replace(/[^a-zA-Z ]/g, ""))} placeholder="Department" maxlength="15" ></input>
               <div style={{display:'inline'}}> 
               <label >Gender : </label>
               <label> <input value='Male' onChange={(e)=>setAdGender(e.target.value)} type="radio" name="nGender" />Male</label>
               <label> <input value='Female' onChange={(e)=>setAdGender(e.target.value)} type="radio" name="nGender" />Female</label>
               </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={MAdd_handlesave}>
            Add Employee Details
          </Button>
           <Button variant="info" onClick={MAdd_handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
       
    </>
  )
}

export default Crud
