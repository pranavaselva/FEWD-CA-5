import { useState } from 'react';
import {useForm} from 'react-hook-form'

function Form(){

    const [state, setState] = useState(false);
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm();

    const handlerSub = (e) => {
        setState(true);
        console.log(e)
    };

    const handleChange = () => {
        setState(false)
    }

    return(
        <div className='container2'>
            <div>
                <h1>CREATE ACCOUNT</h1>
            </div>
            <div className='form-box'>
            <form onSubmit={handleSubmit(handlerSub)} onChange={handleChange}>
            {state && <p className="success-message">Registration successful</p>}
             <div>
                <p className="name">Name</p>
                <input type="text"
                className='nameinput'
                placeholder="Your Name"
                { ...register('YourName',{
                    required: true,
                    minLength:{
                        value:4,
                        message: "Name must be more than 3 characters",
                    },
                    maxLength:{
                        value:30,
                        message: "Name cannot be more than 30 characters"
                    },
                    
                })
                }/>
                <div>
                   <p className='nameerror'>{errors.YourName ? errors.YourName.message :null}</p> 
                </div>
            </div>
            <div>
                <p className='email'>Email</p>
                <input type="email" 
                className='emailinput'
                placeholder="Your Email"
                {...register('email',{
                    required:true,
                    validate:(value) => {
                        if(value.includes('@')){
                            return true;
                        }
                        return 'invalid email';
                    },
                })}/>
            </div>
            <div>
                <p className='password'>Password</p>
                <input type="password" 
                className='passwordinput'
                placeholder="Password"
                {...register('password',{
                    required:true,
                    pattern: {
                        value: /^(?=.*[!@#$%^&*])[\w!@#$%^&*]{10,}$/,
                        message:'Password must be at least 10 characters with at least one special character',
                    },
                })}/>
                <div>
                    <p className='passerror'>{errors.password ? errors.password.message :null}</p>
                    </div>
            </div>

            <div>
                <p className='repeat'>Repeat your password</p>
                <input type="password"
                className='repeatpass'
                placeholder="Repeat your password" 
                {...register('repeatPassword',{
                    required:true,
                    validate:{
                        matchesPassword:(value) => value === state.password || {message: 'The passwords you entered do not match. Please try again'},
                    }
                })}/>
                <div>
                    <p className='repeaterror'>{errors.repeatPassword ? errors.repeatPassword.message.message : null}</p>
                    </div>
            </div>

            <div className='check'>
                <input type="checkbox"
                className='checkbox'
                id='agree'
                {
                    ...register('agree',{
                        required:true,
                        message:"agree the terms and condition"
                    })
                } />
                <label className='box' htmlFor="agree">I agree all statements in Terms of service</label>
                <div> 
                    <p className='checkerror'>{errors.agree ? errors.agree.message : null}</p>
                    </div>
            </div>

            <div>
                <button className='sign'>SIGN UP</button>
            </div>
            </form>
        </div>
    </div>
    )
}

export default Form;