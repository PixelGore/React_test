import {
    Formik,
    Form,
    Field,
    ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../Redux/Reducers/authReducer';
import { useEffect } from 'react';
import PreLoader from "../../common/Preloader/Preloader";
import { getisFetching, getRegError, getRegMsg } from '../../../Redux/Selectors/authSelector';



// Registration Component
export const Registration = ({ setIsActive }: propsType) => {

    const dispatch = useDispatch()

    // Local variables
    const initialValues: RegisterFormType = { email: '', password: '', password2: '', first_name: '', last_name: '' };
    const RegError = useSelector(getRegError)
    const RegMsg = useSelector(getRegMsg)
    const isFetching = useSelector(getisFetching)

    // Switch to login if registration is successful
    useEffect(() => {
        if (RegMsg.length > 1) {
            setIsActive(true)
        }
    }, [RegMsg, setIsActive]);


    return (
        <div className="form-container">
            {isFetching? <PreLoader/> : ''}
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    dispatch(register(values.email, values.password, values.password2, values.first_name, values.last_name))
                    actions.resetForm()
                    actions.setSubmitting(false)
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required('Email is required'),
                    password: Yup.string()
                        .required('Password is required')
                        .min(4, 'Provided password is too short!')
                        .max(20, 'Provided password is too long!'),
                    password2: Yup.string()
                        .when("password", {
                            //  @ts-ignore
                            is: val => (val && val.length > 0 ? true : false),
                            then: Yup.string().oneOf(
                                [Yup.ref("password")],
                                "Both password need to be the same!"
                            )
                        })
                        .required('Repeating password is required'),
                    first_name: Yup.string()
                        .required('This field is required')
                        .min(3, 'Provided first name is too short!')
                        .max(25, 'Provided first name is too long!'),
                    last_name: Yup.string()
                        .required('This field is required')
                        .min(3, 'Provided last name is too short!')
                        .max(25, 'Provided last name is too long!')
                })}
            >
                {({ errors, touched }) => (
                    < Form className="signup-form">
                        <h2 className="title">Sign up</h2>

                        {/* Email Field */}
                        <div className={errors.email && touched.email ? "input-field error" : "input-field"}>
                            <i className="fa fa-envelope "></i>
                            <Field name="email" placeholder="Email" />
                        </div>
                        <ErrorMessage name="email" render={error => <div className="error">{error}</div>} />

                        {/* Password Field */}
                        <div className={errors.password && touched.password ? "input-field error" : "input-field"}>
                            <i className="fa fa-lock"></i>
                            <Field name="password" type="password" placeholder="Password" />
                        </div>
                        <ErrorMessage name="password" render={error => <div className="error">{error}</div>} />

                        {/* Repeat Password */}
                        <div className={errors.password2 && touched.password2 ? "input-field error" : "input-field"}>
                            <i className="fa fa-lock"></i>
                            <Field name="password2" type="password" placeholder="Repeat your password" />
                        </div>
                        <ErrorMessage name="password2" render={error => <div className="error">{error}</div>} />

                        {/* First name */}
                        <div className={errors.first_name && touched.first_name ? "input-field error" : "input-field"}>
                            <i className="fa fa-user"></i>
                            <Field name="first_name" placeholder="First name" />
                        </div>
                        <ErrorMessage name="first_name" render={error => <div className="error">{error}</div>} />

                        {/* Last name */}
                        <div className={errors.last_name && touched.last_name ? "input-field error" : "input-field"}>
                            <i className="fa fa-user"></i>
                            <Field name="last_name" placeholder="Last name" />
                        </div>
                        <ErrorMessage name="last_name" render={error => <div className="error">{error}</div>} />

                        <button type="submit" className="btn solid" >Register</button>

                        {RegError ? <div className="error">{RegError}</div> : null}

                        <p className="social-text">Or sign up with social platforms</p>
                        <div className="social-media">
                            <a href="/" className="social-icon">
                                <i className="fa fa-facebook"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fa fa-twitter"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fa fa-google"></i>
                            </a>
                            <a href="/" className="social-icon">
                                <i className="fa fa-linkedin"></i>
                            </a>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    )
}
// Types
interface RegisterFormType {
    email: string,
    password: string,
    password2: string,
    first_name: string,
    last_name: string
}
type propsType = {
    setIsActive: (isActive: boolean) => void,
}