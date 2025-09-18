"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, AlertCircle } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>
      <hr />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="login">Login Details</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* My Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <p className="text-sm text-gray-600">This is your personal information that you can update anytime.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div>
                <Label className="text-sm font-medium">Profile Photo</Label>
                <div className="mt-2 flex items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/professional-headshot.png" alt="Profile" />
                    <AvatarFallback>JG</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to replace or drag and drop</p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 400x400px)</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Jake Gyil" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jake@gmail.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+44 1234 567 890" className="mt-1" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-teal-600 hover:bg-teal-700">Save Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Login Details Tab */}
        <TabsContent value="login" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <p className="text-sm text-gray-600">This is login information that you can update anytime.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <hr />

              {/* Change Password */}
              <div>
                <Label className="text-sm font-medium">New Password</Label>
                <p className="text-xs text-gray-500 mt-1">Manage your password to make sure it is safe</p>
                <div className="mt-3 space-y-3">
                  <div>
                    <Label htmlFor="oldPassword" className="text-sm">
                      Old Password
                    </Label>
                    <Input id="oldPassword" type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword" className="text-sm">
                      New Password
                    </Label>
                    <Input id="newPassword" type="password" className="mt-1" />
                    <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm">
                      Confirm New Password
                    </Label>
                    <Input id="confirmPassword" type="password" className="mt-1" />
                    <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                  </div>
                  <Button className="bg-teal-600 hover:bg-teal-700">Change Password</Button>
                </div>
              </div>

              <hr />
              
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <p className="text-sm text-gray-600">This is notification preferences that you can update anytime.</p>
            </CardHeader>
            <hr />
            <CardContent className="space-y-6">
              {/* Notifications */}
              <div>
                <Label className="text-sm font-bold">Notifications</Label>
                <p className="text-xs text-gray-500 my-2">Customize your preference notification settings</p>
                <hr />
                <div className="mt-4 space-y-4 ml-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Applications</p>
                      <p className="text-xs text-gray-500">These are notifications for jobs that you have applied to</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Job openings</p>
                      <p className="text-xs text-gray-500">
                        These are notifications for job openings that suit your profile
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Recommendations</p>
                      <p className="text-xs text-gray-500">These are notifications for personalized recommendations</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-teal-600 hover:bg-teal-700">Update Email</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
