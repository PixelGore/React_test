import {
    Formik,
    Form,
    Field,
    ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import { login } from '../../../Redux/Reducers/authReducer';
import { getLogError, getAuthMe } from '../../../Redux/Selectors/authSelector';



// Login Component
export const Login = () => {

    const dispatch = useDispatch()

    // Local variables
    const initialValues: LoginFormType = { email: '', password: '' };
    const LogError = useSelector(getLogError)
    const Me = useSelector(getAuthMe)

    // If logged redirect to home
    if (Me.length > 0) {
        return <Redirect to={"/home"} />
    }

    return (
        <div className="form-container">
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .required('Username is Required')
                        .matches(/^(?!admin\b)/i, 'Nice try !'),
                    password: Yup.string()
                        .required('Password is Required')
                })}
                onSubmit={(values, actions) => {
                    dispatch(login(values.email, values.password))
                    actions.setSubmitting(false)
                }}
            >
                {({ errors, touched }) => (
                    <Form className="signin-form">
                        <h2 className="title">Sign in</h2>
                        <div className={errors.email && touched.email ? "input-field error" : "input-field"}>
                            <i className="fa fa-envelope"></i>
                            <Field name="email" placeholder="Email" />
                        </div>
                        <ErrorMessage name="email" render={error => <div className="error">{error}</div>} />

                        <div className={errors.password && touched.password ? "input-field error" : "input-field"}>
                            <i className="fa fa-lock"></i>
                            <Field name="password" type="password" placeholder="Password" />
                        </div>
                        <ErrorMessage name="password" render={error => <div className="error">{error}</div>} />

                        <button type="submit" className="btn solid" >Login</button>

                        {LogError ? <div className="error">{LogError}</div> : null}

                    </Form>
                )}
            </Formik>

        </div>
    )
}
// Types
interface LoginFormType {
    email: string,
    password: string,
}