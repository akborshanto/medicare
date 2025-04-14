"use server"
export const registerUser=async(data)=>{
    const res=await fetch(`${process.env.BACKHAND_URL}/api/auth/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data),
        cache:"no-store"
    });
    const userInfo=await res.json()
    return userInfo
}