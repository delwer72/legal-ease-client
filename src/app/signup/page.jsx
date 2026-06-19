
// 'use client';

// import { useState } from 'react';

// import { Card, Separator } from '@heroui/react';

// import { Button, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';

// import { authClient } from '@/lib/auth-client';

// import { useRouter } from 'next/navigation';

// import { FcGoogle } from 'react-icons/fc';

// import { FiEye, FiEyeOff } from 'react-icons/fi';

// import { toast } from 'react-toastify';

// const LoginPage = () => {
//   const router = useRouter();

//   // =========================
//   // PASSWORD SHOW / HIDE
//   // =========================

//   const [showPassword, setShowPassword] = useState(false);

//   // =========================
//   // LOGIN SUBMIT
//   // =========================

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);

//     const user = Object.fromEntries(formData.entries());

//     try {
//       const { data, error } = await authClient.signIn.email({
//         email: user.email,
//         password: user.password,
//       });

//       if (data) {
//         toast.success(`Welcome Back ${data?.user?.name || ''} 🎉`);

      

//         router.push('/');
//         return;
//       }

//       // =========================
//       // ERROR HANDLING
//       // =========================

//       if (error) {
//         // WRONG PASSWORD

//         if (error.message?.toLowerCase().includes('password')) {
//           toast.error('Incorrect password. Please try again.');
//         }

//         // USER NOT FOUND
//         else if (error.message?.toLowerCase().includes('user')) {
//           toast.error('No account found with this email.');
//         }

//         // INVALID EMAIL
//         else if (error.message?.toLowerCase().includes('email')) {
//           toast.error('Please enter a valid email address.');
//         }

//         // DEFAULT ERROR
//         else {
//           toast.error(error.message || 'Login failed');
//         }
//       }
//     } catch (err) {
//       console.log(err);

//       toast.error('Something went wrong. Please try again.');
//     }
//   };

//   const handleGoogleSignin = async () => {
//     try {
//       const { data } = await authClient.signIn.social({
//         provider: 'google',
//       });

//       if (data?.user?.email) {
        
//       }

//       toast.success('Google Login Successful 🎉');

//       router.push('/');
//     } catch (error) {
//       console.log(error);
//       toast.error('Google Login Failed');
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
//       <Card className="w-full max-w-md p-8 shadow-xl border rounded-2xl">
//         {/* HEADER */}

//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-cyan-600">Welcome Back</h1>

//           <p className="text-gray-500 mt-2">Login to your account</p>
//         </div>

//         {/* FORM */}

//         <Form onSubmit={onSubmit} className="flex flex-col gap-5">
//           {/* EMAIL */}

//           <TextField
//             isRequired
//             name="email"
//             type="email"
//             validate={(value) => {
//               if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//                 return 'Please enter a valid email address';
//               }

//               return null;
//             }}
//           >
//             <Label>Email</Label>

//             <Input placeholder="john@example.com" className="rounded-xl" />

//             <FieldError />
//           </TextField>

//           {/* PASSWORD */}

//           <TextField
//             isRequired
//             minLength={8}
//             name="password"
//             validate={(value) => {
//               if (value.length < 8) {
//                 return 'Password must be at least 8 characters';
//               }

//               if (!/[A-Z]/.test(value)) {
//                 return 'Password must contain at least one uppercase letter';
//               }

//               if (!/[0-9]/.test(value)) {
//                 return 'Password must contain at least one number';
//               }

//               return null;
//             }}
//           >
//             <Label>Password</Label>

//             <div className="relative w-full">
//               <Input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Enter your password"
//                 className="rounded-xl pr-12"
//               />

//               {/* SHOW / HIDE BUTTON */}

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl"
//               >
//                 {showPassword ? <FiEyeOff /> : <FiEye />}
//               </button>
//             </div>

//             <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>

//             <FieldError />
//           </TextField>

//           {/* FORGOT PASSWORD */}

//           <div className="text-center -mt-2">
//             <span className="text-sm font-medium text-cyan-600 hover:underline">
//               Forgot Password?
//             </span>
//           </div>

//           {/* LOGIN BUTTON */}

//           <Button
//             className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl py-6 text-lg font-semibold"
//             type="submit"
//           >
//             Login
//           </Button>
//         </Form>

//         {/* DIVIDER */}

//         <div className="flex justify-center items-center gap-3 my-6">
//           <Separator />

//           <div className="whitespace-nowrap text-gray-500 text-sm">OR</div>

//           <Separator />
//         </div>

//         {/* GOOGLE LOGIN */}

//         <Button
//           onClick={handleGoogleSignin}
//           variant="bordered"
//           className="w-full rounded-xl py-6 text-base font-medium"
//         >
//           <FcGoogle className="text-2xl" />
//           Sign in with Google
//         </Button>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;
'use client';

import { FcGoogle } from 'react-icons/fc';
import { Card, Separator } from '@heroui/react';
import { Button, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image || '',
      });

      if (error) {
        alert(error.message || 'Signup failed');
        return;
      }

      if (data) {
        // optional: small delay for better UX
        setTimeout(() => {
          router.push('/login');
        }, 300);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
      });
    } catch (err) {
      console.error(err);
      alert('Google sign in failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center my-3">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p>Find the right tutor, start learning smarter with Tutor Finder</p>
        </div>

        <Card className="border rounded-none p-4 max-w-7xl mx-auto">
          <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
            {/* Name */}
            <TextField isRequired name="name" type="text">
              <Label>Name</Label>
              <Input placeholder="Enter your name" />
              <FieldError />
            </TextField>

            {/* Photo URL */}
            <TextField name="image" type="url">
              <Label>Photo URL</Label>
              <Input placeholder="Photo URL (optional)" />
              <FieldError />
            </TextField>

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return 'Please enter a valid email address';
                }
                return null;
              }}
            >
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 6) {
                  return 'Minimum 6 characters required';
                }
                if (!/[A-Z]/.test(value)) {
                  return 'Must contain 1 uppercase letter';
                }
                if (!/[a-z]/.test(value)) {
                  return 'Must contain 1 lowercase letter';
                }
                return null;
              }}
            >
              <Label>Password</Label>
              <Input placeholder="Enter password" />

              <Description>6+ chars, 1 uppercase, 1 lowercase</Description>
              <FieldError />
            </TextField>

            <Button className="rounded-none w-full bg-cyan-500" type="submit">
              Create Account
            </Button>
          </Form>

          {/* Divider */}
          {/* <div className="flex items-center gap-3 my-4">
            <Separator />
            <div className="whitespace-nowrap">Or sign up with</div>
            <Separator />
          </div> */}
          <div className="flex items-center gap-3 my-4">
  <div className="h-px flex-1 bg-gray-300" />
  
  <div className="whitespace-nowrap text-sm text-gray-500">
    Or sign up with
  </div>

  <div className="h-px flex-1 bg-gray-300" />
</div>

          {/* Google */}
          <Button onClick={handleGoogleSignin} variant="outline" className="w-full rounded-none">
            <FcGoogle /> Sign up with Google
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;

