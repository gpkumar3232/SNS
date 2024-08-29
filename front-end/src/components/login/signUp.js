import * as Yup from 'yup'
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import AuthService from "../../services/authServices";

import './signUp.css'

//functional component to render Login 
const SignUp = () => {
    // Variable to store navigation from useNavigate hook
    const navigate = useNavigate();
    // Variable to store role List
    const list = ['User','Admin','Guest']
    // Variable which is used to define validation schema using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email Id is Required')
            .email('Enter a valid email address'),
        password: Yup.string()
            .required('Password is Required'),
        fname: Yup.string()
            .required('First Name is Required'),
        lname: Yup.string()
            .required('Last Name is Required'),
        phoneNo: Yup.number()
            .typeError('Phone number must be a number')
            .required('Phone Number is Required')
            .test("IsCorrect", 'Phone number is Invalid', (val) => {
                return /^[1-9]{1}\d{9}$/.test(String(val));
            }),
        role: Yup.string()
            .required('Please select a role')
    })
    // Variable which is used to initialize formik with initial values, validation schema, and submit handler
    const formik = useFormik({
        initialValues: {
            fname:'',
            lname:'',
            phoneNo:'',
            email: '',
            password: '',
            role: '',
        },
        validationSchema: validationSchema,
        onSubmit: () => { setPassword() }
    })
    //Method to Call login service and signUp
    const setPassword = () => {
        const data = {
            firstName:formik.values.fname, 
            lastName:formik.values.lname,
            mobile:formik.values.phoneNo, 
            role:formik.values.role, 
            password:formik.values.password,
            email: formik.values.email,
        }
        AuthService.signUpUser(data).then(res => {
            if (res) {
                toast.success("Sing Up User SuccessFully")
                navigate('/')
            }
        }).catch(err => {
            if (err?.response?.data?.message)
                toast.error(err.response.data.message)
        })
    }

    return (
        <div className={'changepwdContainer'}>
            <div className="img-container">
                <img src={require('../../assets/changepassword.jpeg')} alt={require('../../assets/changepassword.jpeg')} className="loginImg" height={'100%'} width={'100%'} style={{ objectFit: 'cover' }} />
            </div>
            <div className="rootContainer">
                <div className="cardContainer">
                    <div className="headerTag">
                        <h2>SignUp</h2>
                    </div>
                    <div className='signUpForm'>
                        <input type="text"
                            name="fname"
                            id="fname"
                            value={formik.values.fname}
                            onBlur={formik.handleBlur('fname')}
                            onChange={formik.handleChange('fname')}
                            placeholder="Enter the First Name"
                            autoComplete="off"
                        />
                        {(formik.errors.fname && formik.touched.fname) && <span>{formik.errors.fname}</span>}
                        <input type="text"
                            placeholder="Enter the Last Name"
                            name="lname"
                            id="lname"
                            value={formik.values.lname}
                            onBlur={formik.handleBlur('lname')}
                            onChange={formik.handleChange('lname')}
                            autoComplete="off"
                        />
                        {(formik.errors.lname && formik.touched.lname) && <span>{formik.errors.lname}</span>}
                        <input type="email"
                            placeholder="Enter the Email"
                            name="email"
                            id="email" value={formik.values.email}
                            onBlur={formik.handleBlur('email')}
                            onChange={formik.handleChange('email')}
                            autoComplete="off"
                        />
                        {(formik.errors.email && formik.touched.email) && <span>{formik.errors.email}</span>}
                        <input type="number"
                            name="phoneNo"
                            id="phoneNo"
                            value={formik.values.phoneNo}
                            onBlur={formik.handleBlur('phoneNo')}
                            onChange={formik.handleChange('phoneNo')}
                            placeholder="Enter the Phone Number"
                            autoComplete="off"
                        />
                        {(formik.errors.phoneNo && formik.touched.phoneNo) && <span>{formik.errors.phoneNo}</span>}
                        <select id="dropdown" value={formik.values.role} onChange={formik.handleChange('role')}>
                            {list.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                            ))}
                        </select>
                        <input type="text"
                            placeholder="Enter the Password"
                            name="password"
                            id="password"
                            value={formik.values.password}
                            onBlur={formik.handleBlur('password')}
                            onChange={formik.handleChange('password')}
                            autoComplete="off"
                        />
                        {(formik.errors.password && formik.touched.password) && <span>{formik.errors.password}</span>}
                    </div>
                    <div className="button-container" style={{ marginTop: '10px' }}>
                        <button
                            disabled={!formik.dirty && !formik.isValid} onClick={formik.handleSubmit} type="submit" name="submit">SUBMIT</button>
                    </div>
                    <div className="backto" >
                        <p onClick={() => { navigate('/') }}>Back to Login</p>
                    </div>
                </div>
            </div>

        </div>
    )

}
export default SignUp;