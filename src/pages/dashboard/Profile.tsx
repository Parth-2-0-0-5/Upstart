
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Check, Pencil, Camera, User, Link as LinkIcon, Mail, Phone, Briefcase, MapPin, Upload } from 'lucide-react';

// Mock user data
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  roles: ['Entrepreneur', 'Mentor'],
  industry: 'SaaS',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/johndoe',
  bio: 'Passionate entrepreneur with 10+ years of experience in building and scaling SaaS products. I specialize in product development, team leadership, and go-to-market strategies.',
  expertise: ['Product Development', 'Team Leadership', 'Go-to-Market Strategy'],
  interests: ['AI & Machine Learning', 'Remote Team Management', 'Sustainable Growth'],
  profilePicture: 'https://randomuser.me/api/portraits/men/44.jpg',
};

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  linkedin: string;
  bio: string;
}

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<ProfileFormValues | null>(null);
  
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: mockUser.name,
      email: mockUser.email,
      phone: mockUser.phone,
      industry: mockUser.industry,
      location: mockUser.location,
      linkedin: mockUser.linkedin,
      bio: mockUser.bio,
    },
  });
  
  const onSubmit = (data: ProfileFormValues) => {
    setPendingChanges(data);
    setConfirmDialogOpen(true);
  };
  
  const confirmChanges = () => {
    // In a real app, you would send the changes to your backend
    toast({
      title: 'Profile Updated',
      description: 'Your profile changes have been saved successfully.',
    });
    
    setConfirmDialogOpen(false);
    setIsEditing(false);
  };
  
  const cancelChanges = () => {
    form.reset();
    setIsEditing(false);
  };
  
  const uploadProfilePicture = () => {
    // In a real app, you would implement file upload functionality
    toast({
      title: 'Profile Picture Updated',
      description: 'Your profile picture has been updated successfully.',
    });
  };

  return (
    <div className="container py-6 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={cancelChanges}>
              Cancel
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>
              <Check className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
            {/* Profile Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={mockUser.profilePicture} />
                      <AvatarFallback>
                        <User className="h-16 w-16" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <button 
                      className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
                      onClick={uploadProfilePicture}
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <h2 className="text-xl font-semibold">{mockUser.name}</h2>
                  <div className="flex flex-wrap gap-1 mt-1 justify-center">
                    {mockUser.roles.map(role => (
                      <Badge key={role} variant="outline">{role}</Badge>
                    ))}
                  </div>
                  
                  <div className="w-full mt-6 grid grid-cols-[16px_1fr] gap-x-3 gap-y-2 text-sm items-center">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{mockUser.email}</span>
                    
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{mockUser.phone}</span>
                    
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{mockUser.industry}</span>
                    
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{mockUser.location}</span>
                    
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={`https://${mockUser.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate"
                    >
                      {mockUser.linkedin}
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {mockUser.expertise.map(item => (
                      <Badge key={item} variant="secondary">{item}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {mockUser.interests.map(item => (
                      <Badge key={item} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Profile Form */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  {isEditing 
                    ? 'Update your profile information below'
                    : 'View and manage your profile information'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={!isEditing} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="email" 
                                disabled={!isEditing} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={!isEditing} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <FormControl>
                              {isEditing ? (
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  disabled={!isEditing}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select industry" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="SaaS">SaaS</SelectItem>
                                    <SelectItem value="FinTech">FinTech</SelectItem>
                                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                                    <SelectItem value="CleanTech">CleanTech</SelectItem>
                                    <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input {...field} disabled={!isEditing} />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={!isEditing} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn Profile</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="linkedin.com/in/username" 
                                disabled={!isEditing} 
                              />
                            </FormControl>
                            <FormDescription>
                              Enter your LinkedIn username or full URL
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              disabled={!isEditing}
                              className="min-h-[120px]" 
                            />
                          </FormControl>
                          <FormDescription>
                            Tell others about yourself, your background, and your interests
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Account settings will be implemented in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Profile Changes</DialogTitle>
            <DialogDescription>
              Are you sure you want to update your profile with these changes?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {pendingChanges && Object.entries(pendingChanges)
              .filter(([key, value]) => value !== form.getValues()[key as keyof ProfileFormValues])
              .map(([key, value]) => (
                <div key={key} className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                  <div className="text-sm text-muted-foreground truncate">
                    {form.getValues()[key as keyof ProfileFormValues]}
                  </div>
                  <div className="text-muted-foreground">→</div>
                  <div className="text-sm font-medium truncate">{value}</div>
                </div>
              ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmChanges}>
              Confirm Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
