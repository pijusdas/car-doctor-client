import { Link } from 'react-router-dom';
import loginPic from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';


const SignUp = () => {

    const {createUser} = useContext(AuthContext)

    const handeleSignUp = event =>{
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name,email,password)

        createUser(email,password)
        .then(result => {
            const user = result.user;
            console.log(user)
        })
        .catch(error =>{
            console.log(error)
        })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content gap-16 flex-col lg:flex-row">
                <div className=" w-1/2">
                    <img src={loginPic} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-3xl text-center font-bold">Sign Up</h1>
                    <form onSubmit={handeleSignUp} >
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" name='name' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" />
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
                                 
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </div>
                    </form>
                    <p className=' text-center my-4'>Already Have an Account ? <Link to={'/login'} className='text-orange-600 font-bold'>Login</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;