import React from 'react'
import {getUsers} from '../redux/userSlice'
import {useState,useEffect} from 'react';
import { useDispatch ,useSelector} from "react-redux";
import { afficheTask, postNewTask, updateTask } from "../redux/taskSlice";
import { Link } from "react-router-dom";
import '../styleCss/project.css'
import BarreNavigationHome from './BarreNavigationHome';


const UpdateTask = ({match,history}) => {
    const [step, setStep] = useState(1);

    const nextStep = () => {
      setStep(Number(step + 1));
    };
  
    const prevStep = () => {
      setStep(Number(step - 1));
    };
  
      const dispatch = useDispatch();
   
  
    
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getUsers())
  
        if(user.isAuth){
            
            dispatch(afficheTask())
            
            
        }else{
            history.push('/login')
        }
    }, [user.isAuth])
  const task = useSelector(state => state.task)
  const [updatedInfo, setUpdatedInfo] = useState({});
    const handleUpdate = (e) => {
        setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
      };
      const handleUpdateSubmit = (e, taskId) => {
        e.preventDefault();
        dispatch(updateTask({ id: taskId, data: updatedInfo }));

    };
   


    return (
      <body>

      <div class="main-container">
        <BarreNavigationHome/>
        <div class="middle-container container">
         { task.tasks && task.tasks.filter(task=>task._id===match.params.id).map((el)=> (
   <div class="task block"> 
	<form class="registration-form">
  <h2 class="titular"> UPDATE TASK</h2>
    {step ===1 ? (  <div>
      <div class="input-container">
			<label>Title</label> <br/>
			<input type="text" name="name" placeholder={el.name} onChange= {handleUpdate} />
		</div>
		<div class="input-container">
			<label > Description</label><br/>
			<input type="text"  name="description" placeholder={el.description} onChange= {handleUpdate} />
		</div>
    <div class="input-container">
			<label> Start Date</label><br/>
	
    <input type="date"  name="startDate" min="2021-01-01" max="2021-12-31" placeholder={el.startDate} onChange= {handleUpdate} />
       </div> 
       <div class="input-container">
			<label > Deadline</label><br/>
	
    <input type="date"  name="deadLine" min="2021-01-01" max="2021-12-31" placeholder={el.deadLine} onChange= {handleUpdate} />
       </div> 
       
       <div class="input-container">
			<label > State</label> <br/>   
       <select id="options" name="state" placeholder={el.state} onChange={handleUpdate}>
                      <option value='In progress'>In progress</option>
                      <option value='ended'>ended </option>
                      <option value='valid'>valid</option>
                   
                    </select>
                    </div> 
       <div class="text-center">
       <a class="sign-in button" onClick= {nextStep}>Next</a>
		</div>
    </div>):
    
    ( <div>          
      <div className="employee"> 

      {user.users && user.users.map((el) => (
                   
      <div>
        <img className='task-img' src={el.image}/>
      <input type="radio" value={el._id} placeholder={el._id} name="employee"  onChange={handleUpdate}/>    {el.firstName} {el.lastName}
      </div>
))} 
        </div>           




       <br/>

		<div class="text-center">
    <a class="sign-in button" onClick= {prevStep}> Previous</a>
		<Link to={`/singleProject/${match.params.id}`}>	<a class="sign-in button"  onClick={(e) => handleUpdateSubmit(e,match.params.id )}>Update Task</a> </Link>
		
    
    
	
    
    </div>
    </div> )}
  
     
	</form> </div>))} 

  <h1 style={{color:'white'}}>{task.taskErrors && task.taskErrors._message }</h1>
  <a href=''>back</a>

</div>
</div>

</body>
  
    )
}

export default UpdateTask
