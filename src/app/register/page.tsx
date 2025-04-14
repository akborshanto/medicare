"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Eye, EyeOff, Mail, Lock, User, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import { registerUser } from "@/utils/actions/register.user"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type FormValues = {
  firstName: string
  email: string
  password: string

  profileImage: FileList
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [uploading, setUploading] = useState(false)
const router=useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
     
    },
  })

  const password = watch("password")

  const onSubmit = async (data: FormValues) => {
    try {
      setUploading(true)

      const imageFile = data.profileImage[0]
      const formData = new FormData()
      formData.append("image", imageFile)

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=3025280f648bb518af1a392af0692706`, 
        formData
      )

      const imageUrl = res.data.data.url
      //console.log("Uploaded Image URL:", imageUrl)

      const userData = {
        name: data.firstName,
        email: data.email,
        password: data.password,
        photo: imageUrl,
      }

      // console.log("Final Registration Data:", userData)
   const result=await registerUser(userData)

   if(result.statusCode===200){
    toast.success("Registration successful!")
    router.push('/login')
   }
  

    reset()
    } catch (error) {
      console.error("Error uploading image or submitting form:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md rounded-xl bg-white/60 backdrop-blur-lg p-6 md:p-8 shadow-lg border border-white/20">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-teal-700">Create an account</h1>
          <p className="text-sm text-gray-600">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">

            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="firstName"
                  placeholder="Your Name"
                  className={`pl-10 bg-white/70 border-gray-200 ${errors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("firstName", { required: "Name is required" })}
                />
              </div>
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className={`pl-10 bg-white/70 border-gray-200 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 bg-white/70 border-gray-200 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "At least 8 characters" },
                    pattern: {
                      
                      message: "Must include uppercase, lowercase, number, special character",
                    },
                  })}
                />
                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 py-2" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

    {/*         Confirm Password
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 bg-white/70 border-gray-200 ${errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("confirmPassword", {
                    required: "Please confirm password",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                />
                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 py-2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div> */}

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image</Label>
              <div className="relative">
                <Image className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="pl-10 bg-white/70 border-gray-200"
                  {...register("profileImage", { required: "Profile image is required" })}
                />
              </div>
              {errors.profileImage && <p className="text-sm text-red-500">{errors.profileImage.message}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isSubmitting || uploading}>
            {uploading || isSubmitting ? "Processing..." : "Create Account"}
          </Button>

          <div className="relative flex items-center justify-center">
            <Separator className="absolute w-full" />
            <span className="relative bg-white/60 px-2 text-xs text-gray-500">
              OR CONTINUE WITH <Link href="/login" className="text-teal-600 text-sm font-semibold">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
