import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginPic from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import SocialLogin from '../../shared/SocialLogin';


const Login = () => {
    const { singIn } = useContext(AuthContext)

    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const navigate = useNavigate()

    const handeleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password)
        singIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                
               
                navigate(from, { replace: true })
              

            })
            .catch(error => console.log(error))
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content gap-16 flex-col lg:flex-row">
                <div className=" w-1/2">
                    <img src={loginPic} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-3xl text-center font-bold">Login now!</h1>
                    <form onSubmit={handeleLogin} >
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" name='email' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" name='password' className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">

                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </div>
                    </form>
                    <p className=' text-center my-4'>New To Car Doctor? <Link to={'/signUp'} className='text-orange-600 font-bold'>Sign Up</Link> </p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;