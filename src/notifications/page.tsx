"use client"

import { getNotifications,markNotificationsAsRead } from "@/actions/notification.action"
import { NotificationsSkeleton } from "@/components/NotificationSkeleton"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


type Notifications = NonNullable<Awaited<ReturnType<typeof getNotifications>>>

type Notification = Notifications[number]

function NotificationsPage(){
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [isLoading,setIsLoading] = useState(true)
    
    setIsLoading(true)
    useEffect(()=>{
        const fetchNotifications = async () => {
            try{
                const data = await getNotifications();
                if(!data){
                    return
                }
                setNotifications(data);

                const unreadIds = data.filter(n => !n.read).map(n => n.id)

                if(unreadIds.length > 0){
                    await markNotificationsAsRead(unreadIds)
                }
               
            }
            catch(error){
                toast.error("Failed to fetch Noti")
            }
            finally{
                setIsLoading(false)
            }

        }   

        fetchNotifications()
    },[])

    if(isLoading) return <NotificationsSkeleton /> 

}