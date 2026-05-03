    "use client";
    import  {useState} from "react";
    import {useRouter}from "next/navigation";
    import {signInWithEmailAndPassword} from "firebase/auth";
    import { auth } from "@/lib/firebase";

    import { LoaderOne } from "@/components/ui/loader"; 
    import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    } from "@/components/ui/card"; // Assuming standard Card components
    import {
    Field,
    FieldLabel,
    } from "@/components/ui/field";
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";
import { Sign } from "crypto";

    export default function LoginForm() {
        const router=useRouter();
        const [email,setemail]=useState<string>("ragaai@gmail.com");
        const [loading, setLoading] = useState<boolean>(false);
        const [password,setpassword]=useState<string>("123456");
        const handleEmailChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            setemail(e.target.value);
        }
        const handlePasswordChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            setpassword(e.target.value);
        }
        const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};

        // 1. Trim and Check Empty
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail) {
        newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
        // 2. Check for one "." and general email format
        newErrors.email = "Please enter a valid email address";
        }

        if (!trimmedPassword) {
        newErrors.password = "Password cannot be empty";
        } else if (trimmedPassword.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
        const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            console.log("Email:", email);
            console.log("Password:", password);
         
            if(validate()){
                // Proceed with form submission (e.g., API call)
                setLoading(true);
                signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
                    const user=userCredential.user;
                    console.log("User signed in:", user);
                    router.push("/dashboard");

                }).catch((error)=>{
                    console.error("Error signing in user:", error);
                       setLoading(false);
                });
                console.log("Form is valid. Submitting...");
            }else{
                console.log("Form has errors. Fix them before submitting.");
            }

        }
    return (
        <Card className="w-full max-w-md bg-white/1 backdrop-blur-md border-white/50 shadow-2xl rounded-3xl">
            <form onSubmit={handleSubmit} noValidate>
        <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-800">
            Welcome back
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1 mb-1">
            Enter your credentials to access your medical dashboard.
            </CardDescription>
        </CardHeader>
        
        <CardContent className="grid gap-6">
            {/* Email Field */}
            <Field className="grid gap-2">
            <FieldLabel className="text-sm font-semibold text-slate-700">Email Address</FieldLabel>
            <div className="bg-zinc-100 rounded-xl">

            <Input 
                id="email" 
                type="email" 
                placeholder="dr.shivam@example.com" 
                value={email}
                onChange={handleEmailChange}
                className="border-slate-200  text-black focus:ring-amber-500 focus:border-amber-500 rounded-xl py-6"
            />
            </div>
            <span className="text-xs text-red-500 mt-1">
                {errors.email}
            </span>
            </Field>

            {/* Password Field */}
            <Field className="grid gap-2">
            <div className="flex items-center justify-between">
                <FieldLabel className="text-sm font-semibold text-slate-700">Password</FieldLabel>
                <a href="#" className="text-xs font-medium text-amber-700 hover:underline">
                Forgot password?
                </a>
            </div>
            <div className="bg-zinc-100 rounded-xl" >


            <Input 
                id="password" 
                type="password" 
                placeholder="password should be at least 6 digits" 
                value={password}
                onChange={handlePasswordChange}
                className="bg-white/59 border-slate-200 text-black focus:ring-amber-500 focus:border-amber-500 rounded-xl py-6"
            />
            </div>
            <span className="text-xs text-red-500 mt-1">
                {errors.password}
            </span>
            </Field>

            <Button type="submit" className="w-full relative z-100  cursor-pointer bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-xl text-lg font-semibold transition-all shadow-lg active:scale-[0.98]">
            {loading ? <LoaderOne /> : "Sign In"}   
            </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t border-slate-100 bg-white/50 pt-6">
            <div className="text-sm text-center text-slate-500">
            Don't have an account?{" "}
            <a href="#" className="font-semibold text-amber-700 hover:underline">
                Contact Administration
            </a>
            </div>
        </CardFooter>
        </form>
        </Card>
    );
    }