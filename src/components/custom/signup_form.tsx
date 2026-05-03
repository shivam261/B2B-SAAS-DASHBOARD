"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderOne } from "@/components/ui/loader"; 
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
export default function SignupForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
const router=useRouter();
  const validate = () => {
    const newErrors: typeof errors = {};

    // Email Validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password Validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm Password Match
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Creating Account with:", { email, password });
      // Proceed with your API call for registration
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User created:", user);
          setLoading(false);
          router.push("/dashboard");
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          setLoading(false);
        });
    }
  };

  return (
    <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/50 shadow-2xl rounded-3xl">
      <form onSubmit={handleSubmit} noValidate>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-800">
            Join Us
          </CardTitle>
          <CardDescription className="text-slate-500 mt-1 mb-1">
            Create an account to start managing your medical data.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          {/* Email Field */}
          <Field className="grid gap-2">
            <FieldLabel className="text-sm font-semibold text-slate-700">Email Address</FieldLabel>
            <div className="bg-zinc-100 rounded-xl">
              <Input
                type="email"
                placeholder="dr.shivam@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-slate-200 text-black focus:ring-amber-500 rounded-xl py-6"
              />
            </div>
            {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
          </Field>

          {/* Password Field */}
          <Field className="grid gap-2">
            <FieldLabel className="text-sm font-semibold text-slate-700">Create Password</FieldLabel>
            <div className="bg-zinc-100 rounded-xl">
              <Input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-slate-200 text-black focus:ring-amber-500 rounded-xl py-6"
              />
            </div>
            {errors.password && <span className="text-xs text-red-500 mt-1">{errors.password}</span>}
          </Field>

          {/* Confirm Password Field */}
          <Field className="grid gap-2">
            <FieldLabel className="text-sm font-semibold text-slate-700">Confirm Password</FieldLabel>
            <div className="bg-zinc-100 rounded-xl">
              <Input
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-slate-200 text-black focus:ring-amber-500 rounded-xl py-6"
              />
            </div>
            {errors.confirmPassword && <span className="text-xs text-red-500 mt-1">{errors.confirmPassword}</span>}
          </Field>

          <Button type="submit" className="w-full bg-slate-900 cursor-pointer hover:bg-slate-800 text-white py-6 rounded-xl text-lg font-semibold transition-all shadow-lg active:scale-[0.98]">
            {loading ? <LoaderOne /> : "Create Account"}
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t border-slate-100 bg-white/50 pt-6">
          <div className="text-sm text-center text-slate-500">
            Already have an account?{" "}
            <a href="#" className="font-semibold text-amber-700 hover:underline">
              Sign In
            </a>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}