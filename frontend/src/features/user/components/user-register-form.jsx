
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useContext, useState } from "react"
import { UserRound, Mail, Lock, Eye, EyeOff, User } from "lucide-react"
import axios from "axios";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {NavLink, useNavigate} from "react-router-dom"
import { toast } from "sonner"
import { UserDataContext } from "../context/UserContext"

const riderFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
})



export function UserRegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {user , setUser} = useContext(UserDataContext)
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(riderFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

async  function onSubmit(data) {
   try {
    setIsLoading(true);
    const formattedUser = {
      fullname:{
        firstname:data.firstName,
        lastname:data.lastName
      },
      email:data.email,
      password:data.password
    }
    const response = await axios.post(`http://localhost:5001/api/v1/users/register` , formattedUser)
    console.log(response.data);
    const Resdata = response.data;
    setUser(Resdata.user)
    localStorage.setItem("token" , Resdata.token)
    toast("Successfully User Registered")
    form.reset()
    navigate("/")
   } catch (error) {
      console.log(error);
      toast("Something went wrong ")
   }
   finally{
    setIsLoading(false)
   }
  }

  return (
    <Card className="w-full max-w-md border-2">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <UserRound className="h-5 w-5" />
          <CardTitle>Rider Registration</CardTitle>
        </div>
        <CardDescription>Create your rider account to start booking rides</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="John" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name <span className="text-gray-400 text-sm">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="Doe" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="john.doe@example.com" type="email" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="••••••••"
                        type={isPasswordVisible ? "text" : "password"}
                        className="pl-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{isPasswordVisible ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Must be at least 8 characters with uppercase, lowercase, and number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Already have an account?</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <NavLink to="/user-login">Login</NavLink>
        </Button>
      </CardFooter>
    </Card>
  )
}

