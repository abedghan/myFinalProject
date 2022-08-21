import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import{errorHelper} from '../../utilis/tools'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Auth = () => {
    //comp
    const [register, setRegister] = useState(false);

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('sorry email is required')
                .email('sorry the email is invalid'),
            password: Yup.string()
                .required('sorry password is required')
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        }
    })
    const handleSubmit = (values) => {
        if (register) {
            console.log(values, 'register')
        } else {
            console.log(values, 'signin')
        }
    }
    return (

        <div className='auth_container'>
            <h1>Authenticate</h1>
            <Box
                sx={{
                    '& .MuiTextField-root': { width: '100%', marginTop: '20px' },
                }}
                component='form'
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    name='email'
                    label='Enter your email address'
                    variant='outlined'
                    {...formik.getFieldProps('email')}
                    {...errorHelper(formik,'email')}
                />
                <TextField
                    name='password'
                    label='Enter your password'
                    type='password'
                    variant='outlined'
                    {...formik.getFieldProps('password')}
                    {...errorHelper(formik,'password')}
                />
                <div className='mt-2'>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        size='large'>
                        {register ? 'Register' : 'login'}
                    </Button>
                    <Button
                        className='mt-3'
                        variant='outlined'
                        color='secondary'
                        type='button'
                        size='small'
                        onClick ={()=>setRegister(!register)}
                        >
                            
                        {!register ? 'Register' : 'login'}
                    </Button>
                </div>
            </Box>
        </div>
    )


}
export default Auth;